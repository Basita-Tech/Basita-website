import axios from "./http";
import toast from "react-hot-toast";
import { cachedFetch, dataCache } from "../utils/cache";
import { dedupeRequest } from "../utils/optimize";
import { getCSRFToken } from "../utils/csrfProtection";
import { trackEvent } from "@/components/analytics/ga4";
const API = import.meta.env.VITE_API_URL;
// Some envs point to /api/v1; normalize to base and derive v2
const API_ROOT = API?.replace(/\/v1\/?$/i, "").replace(/\/$/, "");
const API_V2 = `${API_ROOT || ""}/v2`;
const getAuthHeaders = () => {
  const headers = {};
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    headers["X-CSRF-Token"] = csrfToken;
  }
  return headers;
};

// Get current user ID from /auth/me endpoint
export const getUserId = async () => {
  try {
    const response = await axios.get(`${API}/auth/me`, {
      headers: getAuthHeaders(),
    });
    return response.data?.user?.id || null;
  } catch (error) {
    console.warn("Could not fetch user ID:", error.message);
    return null;
  }
};

export const getMembershipPlans = async () => {
  try {
    const response = await axios.get(`${API}/pricing`);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Membership Plans Error:",
      error.response?.data || error.message,
    );
    return (
      error.response?.data || {
        success: false,
        message: "Unable to fetch membership plans",
      }
    );
  }
};
export const signupUser = async (formData) => {
  try {
    const response = await axios.post(`${API}/auth/signup`, formData);
    return response.data;
  } catch (error) {
    console.error("❌ Signup Error:", error.response?.data || error.message);
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong. Please try again.",
      }
    );
  }
};
export const forgotUsername = async (formData) => {
  try {
    const response = await axios.post(`${API}/auth/forgot-username`, formData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    const status = error?.response?.status;
    const data = error?.response?.data || {};
    if (status === 404 || status === 400) {
      return {
        success: false,
        message:
          "If an account exists with the provided details, the username will be displayed.",
      };
    }
    if (status === 429) {
      return {
        success: false,
        message: "Too many attempts. Please try again later.",
      };
    }
    return {
      success: false,
      message: data.message || "Unable to retrieve username. Please try again.",
    };
  }
};
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API}/auth/login`, formData);
    const data = response?.data || {};
    const status = response?.status;

    const messageText = (data?.message || "").toLowerCase();
    const otpPending =
      status === 202 ||
      data?.reason === "OTP_VERIFICATION_PENDING" ||
      data?.requiresOtpVerification ||
      messageText.includes("verify your email") ||
      messageText.includes("verification pending");

    if (otpPending) {
      const pendingPhone =
        data?.phoneNumber || data?.user?.phoneNumber || formData.phoneNumber;
      const pendingEmail = data?.email || data?.user?.email || formData.email;
      return {
        success: false,
        message: data?.message || "Please verify your email before logging in.",
        requiresOtpVerification: true,
        email: pendingEmail,
        phoneNumber: pendingPhone,
      };
    }
    trackEvent("login_success");
    return data;
  } catch (error) {
    const status = error?.response?.status;
    const data = error?.response?.data || {};
    const messageText = (data?.message || "").toLowerCase();
    const otpPending =
      status === 202 ||
      data?.reason === "OTP_VERIFICATION_PENDING" ||
      data?.requiresOtpVerification ||
      messageText.includes("verify your email") ||
      messageText.includes("verification pending");

    if (otpPending) {
      const pendingPhone =
        data?.phoneNumber || data?.user?.phoneNumber || formData.phoneNumber;
      const pendingEmail = data?.email || data?.user?.email || formData.email;
      return {
        success: false,
        message: data?.message || "Please verify your email before logging in.",
        requiresOtpVerification: true,
        email: pendingEmail,
        phoneNumber: pendingPhone,
      };
    }

    if (status === 401) {
      toast.error("Invalid credentials. Please try again.");
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    if (status === 403) {
      // Check if it's OTP verification pending
      if (data.message && data.message.includes("verify your email")) {
        const pendingPhone =
          data?.phoneNumber || data?.user?.phoneNumber || formData.phoneNumber;
        const pendingEmail = data?.email || data?.user?.email || formData.email;
        return {
          success: false,
          message: data.message || "Verification required",
          requiresOtpVerification: true,
          email: pendingEmail,
          phoneNumber: pendingPhone,
        };
      }
      toast.error(data.message || "Verification required.");
      return {
        success: false,
        message: data.message || "Verification required",
      };
    }

    // Check for 202 status (Accepted but pending verification)
    if (status === 202) {
      const pendingPhone =
        data?.phoneNumber || data?.user?.phoneNumber || formData.phoneNumber;
      const pendingEmail = data?.email || data?.user?.email || formData.email;
      return {
        success: false,
        message: data.message || "Please verify your email before logging in.",
        requiresOtpVerification: true,
        email: pendingEmail,
        phoneNumber: pendingPhone,
      };
    }

    // Check for 200 status with deactivation or plan upgrade codes
    if (status === 200 && data?.code) {
      return {
        success: false,
        code: data.code,
        message: data.message || "Account status issue",
      };
    }

    // Check for 402 status (Payment required / Plan upgrade)
    if (status === 402) {
      return {
        success: false,
        code: data?.code || "PLAN_UPGRADE",
        message: data.message || "Plan upgrade required",
      };
    }

    // Always return code if present in error response
    if (data?.code) {
      return {
        success: false,
        code: data.code,
        message: data.message || "Login failed",
      };
    }

    toast.error(data.message || "Login failed. Please retry.");
    return {
      success: false,
      message: data.message || "Login failed",
    };
  }
};
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API}/auth/logout`);
    return response.data;
  } catch (error) {
    console.error("❌ Logout Error:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Logout failed",
    };
  }
};
export const sendEmailOtp = async (data) => {
  try {
    const response = await axios.post(`${API}/auth/send-email-otp`, data);
    if (!response.data) {
      throw new Error("Empty response from server");
    }
    return response.data;
  } catch (error) {
    console.error("❌ Send Email OTP Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};
export const sendSmsOtp = async (data) => {
  try {
    const response = await axios.post(`${API}/auth/send-sms-otp`, data);
    if (!response.data) {
      throw new Error("Empty response from server");
    }
    return response.data;
  } catch (error) {
    console.error("❌ Send SMS OTP Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};
export const verifyEmailOtp = async (data) => {
  try {
    const response = await axios.post(`${API}/auth/verify-email-otp`, data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Verify Email OTP Error:",
      error.response?.data || error.message,
    );
    return (
      error.response?.data || {
        success: false,
        message: "Server error",
      }
    );
  }
};
export const verifySmsOtp = async (data) => {
  try {
    const response = await axios.post(`${API}/auth/verify-sms-otp`, data);
    return response.data;
  } catch (error) {
    console.error("❌ Verify SMS OTP Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return (
      error.response?.data || {
        success: false,
        message: "Server error",
      }
    );
  }
};
export const resendOtp = async (data) => {
  try {
    const response = await axios.post(`${API}/auth/resend-otp`, data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Resend OTP Error:",
      error.response?.data || error.message,
    );
  }
};
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API}/auth/forgot-password`, {
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Forgot Password Error:",
      error.response?.data || error.message,
    );
    return (
      error.response?.data || {
        success: false,
        message: "Server error",
      }
    );
  }
};

export const resetPasswordWithToken = async (
  token,
  newPassword,
  confirmPassword,
) => {
  try {
    const response = await axios.post(`${API}/auth/reset-password/${token}`, {
      newPassword,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Reset Password Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const saveUserPersonal = async (payload) => {
  try {
    const response = await axios.post(`${API}/user-personal/`, payload, {
      headers: getAuthHeaders(),
    });
    // Clear cache after save
    dataCache.clear("user-personal-details");
    return response;
  } catch (error) {
    console.error(
      "❌ Save Personal Details Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const getUserPersonal = async (skipCache = false) => {
  const cacheKey = "user-personal-details";

  if (!skipCache && dataCache.has(cacheKey)) {
    return dataCache.get(cacheKey);
  }

  try {
    const response = await axios.get(`${API}/user-personal/`, {
      headers: getAuthHeaders(),
    });
    // Cache for 2 minutes
    dataCache.set(cacheKey, response, 120000);
    return response;
  } catch (error) {
    console.error(
      "❌ Get Personal Details Error:",
      error.response?.data || error.message,
    );
  }
};
export const updateUserPersonal = async (payload) => {
  try {
    const response = await axios.put(`${API}/user-personal/`, payload, {
      headers: getAuthHeaders(),
    });
    // Clear cache after update
    dataCache.clear("user-personal-details");
    return response.data;
  } catch (error) {
    console.error(
      "❌ Update Personal Details Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const saveUserExpectations = async (payload) => {
  try {
    const response = await axios.post(
      `${API}/user-personal/expectations`,
      payload,
      {
        headers: getAuthHeaders(),
      },
    );
    return response;
  } catch (error) {
    console.error(
      "❌ Save Expectations Error:",
      error.response?.data || error.message,
    );
  }
};
export const getUserExpectations = async () => {
  try {
    const response = await axios.get(`${API}/user-personal/expectations`, {
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    console.error(
      "❌ Get User Expectations Error:",
      error.response?.data || error.message,
    );
  }
};
export const updateUserExpectations = async (payload) => {
  try {
    const response = await axios.put(
      `${API}/user-personal/expectations`,
      payload,
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Update Expectations Error:",
      error.response?.data || error.message,
    );
  }
};
export const getUserHealth = async () => {
  try {
    const response = await axios.get(`${API}/user-personal/health`, {
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    console.error(
      "❌ Get User Health Error:",
      error.response?.data || error.message,
    );
  }
};
export const saveUserHealth = async (payload) => {
  try {
    const response = await axios.post(`${API}/user-personal/health`, payload, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Save User Health Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const updateUserHealth = async (payload) => {
  try {
    const response = await axios.put(`${API}/user-personal/health`, payload, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Update User Health Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const getUserProfession = async () => {
  try {
    const response = await axios.get(`${API}/user-personal/profession`, {
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    console.error(
      "❌ Get Profession Error:",
      error.response?.data || error.message,
    );
  }
};
export const saveUserProfession = async (payload) => {
  try {
    const response = await axios.post(
      `${API}/user-personal/profession`,
      payload,
      {
        headers: getAuthHeaders(),
      },
    );
    return response;
  } catch (error) {
    console.error(
      "❌ Save Profession Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const updateUserProfession = async (payload) => {
  try {
    const response = await axios.put(
      `${API}/user-personal/profession`,
      payload,
      {
        headers: getAuthHeaders(),
      },
    );
    return response;
  } catch (error) {
    console.error(
      "❌ Update Profession Error:",
      error.response?.data || error.message,
    );
  }
};
export const getUserFamilyDetails = async () => {
  try {
    const response = await axios.get(`${API}/user-personal/family/`, {
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    console.error(
      "❌ Get Family Details Error:",
      error.response?.data || error.message,
    );
  }
};
export const saveUserFamilyDetails = async (payload) => {
  try {
    const response = await axios.post(`${API}/user-personal/family/`, payload, {
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    console.error(
      "❌ Save Family Details Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const updateUserFamilyDetails = async (payload) => {
  try {
    const response = await axios.put(`${API}/user-personal/family/`, payload, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Update Family Details Error:",
      error.response?.data || error.message,
    );
  }
};
export const getEducationalDetails = async () => {
  try {
    const response = await axios.get(`${API}/user-personal/education/`, {
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    console.error(
      "❌ Get Educational Details Error:",
      error.response?.data || error.message,
    );
  }
};
export const saveEducationalDetails = async (payload) => {
  try {
    const response = await axios.post(
      `${API}/user-personal/education/`,
      payload,
      {
        headers: getAuthHeaders(),
      },
    );
    return response;
  } catch (error) {
    console.error(
      "❌ Save Educational Details Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const updateEducationalDetails = async (payload) => {
  try {
    const response = await axios.put(
      `${API}/user-personal/education/`,
      payload,
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Update Educational Details Error:",
      error.response?.data || error.message,
    );
  }
};
export const getOnboardingStatus = async () => {
  try {
    const response = await axios.get(
      `${API}/user-personal/onboarding-status/`,
      {
        headers: getAuthHeaders(),
      },
    );
    return response;
  } catch (error) {
    console.error(
      "❌ Get Onboarding Status Error:",
      error.response?.data || error.message,
    );
  }
};
export const updateOnboardingStatus = async (payload) => {
  try {
    const response = await axios.put(
      `${API}/user-personal/onboarding-status/`,
      payload,
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Update Onboarding Status Error:",
      error.response?.data || error.message,
    );
  }
};
export const uploadUserPhoto = async (formData) => {
  try {
    const response = await axios.post(
      `${API}/user-personal/upload/photos`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Upload User Photo Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const getPreSignedUrl = async (userId, photoType) => {
  try {
    const response = await axios.get(`${API_V2}/pre-signed-url`, {
      params: {
        filename: `${userId}-${String(photoType || "personal")
          .replace(/[^A-Za-z0-9_-]/g, "-")
          .toLowerCase()}`,
      },
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Pre-Signed URL Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Pre-sign using file metadata; safer than raw filename
export const getPreSignedUrlForFile = async (userId, photoType) => {
  try {
    const response = await axios.get(`${API_V2}/pre-signed-url`, {
      params: {
        userId,
        photoType,
      },
      headers: getAuthHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Pre-Signed URL Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const uploadToS3 = async (presignedUrl, file, onProgress) => {
  try {
    const response = await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
      withCredentials: false,
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          onProgress(percentCompleted);
        }
      },
    });
    return response;
  } catch (error) {
    console.error(
      "❌ Upload to S3 Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Persist photo metadata after S3 upload
export const savePhotoMetadata = async (userId, photoType, key) => {
  try {
    const safeType = String(photoType || "personal")
      .replace(/[^A-Za-z0-9_-]/g, "-")
      .toLowerCase();

    const response = await axios.put(
      `${API_V2}/upload/photos`,
      {
        photoType: safeType,
        key,
        userId,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Save Photo Metadata Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const uploadPhotoViaS3 = async (file, userId, photoType, onProgress) => {
  if (!file) {
    throw new Error("File is required");
  }

  try {
    // 1. Get presigned URL
    const presign = await getPreSignedUrlForFile(userId, photoType);

    if (!presign?.success) {
      throw new Error(presign?.message || "Failed to get pre-signed URL");
    }

    const { url, key } = presign.data;

    // 2. Upload file directly to S3
    await uploadToS3(url, file, onProgress);

    // 3. Save metadata (this triggers updatePhotoController)
    await savePhotoMetadata(userId, photoType, key);

    // 4. Return canonical CDN URL (same as backend)
    return {
      success: true,
      key,
      url: `https://cdn.satfera.com/${key}`,
    };
  } catch (error) {
    console.error(
      "❌ uploadPhotoViaS3 Error:",
      error.response?.data || error.message,
    );

    return {
      success: false,
      message: error.message,
    };
  }
};

export const uploadGovernmentId = async (formData) => {
  try {
    const response = await axios.post(
      `${API}/user-personal/upload/government-id`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Upload Government ID Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const getUserPhotos = async () => {
  try {
    const response = await axios.get(`${API}/user-personal/upload/photos`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get User Photos Error:",
      error.response?.data || error.message,
    );
  }
};
export const getGovernmentId = async () => {
  try {
    const response = await axios.get(
      `${API}/user-personal/upload/government-id`,
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Government ID Error:",
      error.response?.data || error.message,
    );
  }
};
export const getProfileReviewStatus = async () => {
  try {
    const response = await axios.get(`${API}/user-personal/review/status`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Profile Review Status Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const submitProfileForReview = async () => {
  try {
    const response = await axios.post(
      `${API}/user-personal/review/submit`,
      {},
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Submit Profile for Review Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const approveProfile = async (userId) => {
  try {
    const response = await axios.post(
      `${API}/user-personal/review/approve`,
      {
        userId,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Approve Profile Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const rejectProfile = async (userId, reason) => {
  try {
    const response = await axios.post(
      `${API}/user-personal/review/reject`,
      {
        userId,
        reason,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Reject Profile Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const getUserProfileDetails = async (useCache = true) => {
  const cacheKey = "user_profile";
  if (useCache) {
    return cachedFetch(
      cacheKey,
      async () => {
        try {
          const response = await axios.get(`${API}/user/profile`, {
            headers: getAuthHeaders(),
          });
          return response.data;
        } catch (error) {
          console.error(
            "❌ Get User Profile Error:",
            error.response?.data || error.message,
          );
          return null;
        }
      },
      60000,
    );
  }
  try {
    const response = await axios.get(`${API}/user/profile`, {
      headers: getAuthHeaders(),
    });
    dataCache.set(cacheKey, response.data, 60000);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get User Profile Error:",
      error.response?.data || error.message,
    );
    return null;
  }
};
export const getUserContactInfo = async () => {
  try {
    const response = await axios.get(`${API}/user/contact-info`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Contact Info Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      data: null,
      message:
        error.response?.data?.message || "Failed to fetch contact information",
    };
  }
};
export const requestEmailChange = async (newEmail) => {
  try {
    const response = await axios.post(
      `${API}/user/email/request-change`,
      {
        newEmail,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Request Email Change Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to send OTP. Please try again.",
    };
  }
};
export const verifyEmailChange = async (newEmail, otp) => {
  try {
    const response = await axios.post(
      `${API}/user/email/verify-change`,
      {
        newEmail,
        otp,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Verify Email Change Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to verify OTP. Please try again.",
    };
  }
};
export const requestPhoneChange = async (newPhoneNumber) => {
  try {
    const response = await axios.post(
      `${API}/user/phone/request-change`,
      {
        newPhoneNumber,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Request Phone Change Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to initiate phone change. Please try again.",
    };
  }
};
export const verifyPhoneChange = async (newPhoneNumber) => {
  try {
    const response = await axios.post(
      `${API}/user/phone/verify-change`,
      {
        newPhoneNumber,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Verify Phone Change Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to complete phone change. Please try again.",
    };
  }
};
export const searchProfiles = async (filters = {}) => {
  try {
    const params = {};
    if (filters.name) params.name = filters.name;
    if (filters.customId) params.customId = filters.customId;
    if (filters.religion) params.religion = filters.religion;
    if (filters.caste) params.caste = filters.caste;
    if (filters.state) params.state = filters.state;
    if (filters.country) params.country = filters.country;
    if (filters.city) params.city = filters.city;
    if (filters.profession) params.profession = filters.profession;
    if (filters.education) params.education = filters.education;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.newProfile) params.newProfile = filters.newProfile;
    if (filters.ageFrom !== undefined && filters.ageFrom !== null)
      params.ageFrom = filters.ageFrom;
    if (filters.ageTo !== undefined && filters.ageTo !== null)
      params.ageTo = filters.ageTo;
    if (filters.heightFrom !== undefined && filters.heightFrom !== null)
      params.heightFrom = filters.heightFrom;
    if (filters.heightTo !== undefined && filters.heightTo !== null)
      params.heightTo = filters.heightTo;
    if (filters.weightFrom !== undefined && filters.weightFrom !== null)
      params.weightFrom = filters.weightFrom;
    if (filters.weightTo !== undefined && filters.weightTo !== null)
      params.weightTo = filters.weightTo;
    params.page = filters.page || 1;
    params.limit = filters.limit || 10;
    const response = await axios.get(`${API}/user/search`, {
      headers: getAuthHeaders(),
      params,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Search Profiles Error:", error);
    console.error("❌ Error Response:", error.response?.data);
    console.error("❌ Error Status:", error.response?.status);
    return {
      success: false,
      data: {
        listings: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          hasMore: false,
        },
      },
      message: error.response?.data?.message || "Failed to search profiles",
    };
  }
};
export const getMatches = async ({
  useCache = true,
  page = 1,
  limit = 20,
} = {}) => {
  const cacheKey = `user_matches_${page}_${limit}`;
  if (useCache) {
    return cachedFetch(
      cacheKey,
      async () => {
        try {
          const response = await axios.get(`${API}/matches`, {
            headers: getAuthHeaders(),
            params: {
              page,
              limit,
            },
          });
          return response.data;
        } catch (error) {
          console.error(
            "❌ Get User Matches Error:",
            error.response?.data || error.message,
          );
          return {
            success: false,
            data: [],
            message: error.response?.data?.message || "Failed to fetch matches",
          };
        }
      },
      45000,
    );
  }
  try {
    const response = await axios.get(`${API}/matches`, {
      headers: getAuthHeaders(),
      params: {
        page,
        limit,
      },
    });
    dataCache.set(cacheKey, response.data, 45000);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get User Matches Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to fetch matches",
    };
  }
};
export const getViewProfiles = async (id, options = {}) => {
  const cacheKey = `profile_${id}`;
  const requestKey = `profile_request_${id}`;
  const useCache = options?.useCache !== false;
  if (useCache) {
    const cached = dataCache.get(cacheKey);
    if (cached) {
      return cached;
    }
  }
  return dedupeRequest(requestKey, async () => {
    try {
      const config = {
        headers: getAuthHeaders(),
      };
      if (options?.signal) {
        config.signal = options.signal;
      }
      const response = await axios.get(`${API}/profile/${id}`, config);
      if (response.data?.success) {
        dataCache.set(cacheKey, response.data, 120000);
      }
      return response.data;
    } catch (error) {
      if (error?.name === "CanceledError" || error?.code === "ERR_CANCELED") {
        console.info("ℹ️ [getViewProfiles] Request canceled by caller");
        return {
          success: false,
          data: null,
          message: "Request canceled",
        };
      }
      const errorStatus = error.response?.status;
      const errorMsg = error.response?.data?.message || error.message;
      if (errorStatus === 404) {
        console.warn(`⚠️ Profile not found (404): ${id}`, errorMsg);
      } else {
        console.error(
          "❌ Get User view  profile details Error:",
          `ID: ${id}, Status: ${errorStatus},`,
          error.response?.data || error.message,
        );
      }
      return {
        success: false,
        data: [],
        message: errorMsg || "Failed to fetch user view profile details",
      };
    }
  });
};
export const getNotifications = async (
  page = 1,
  limit = 20,
  useCache = true,
) => {
  const cacheKey = `notifications_${page}_${limit}`;
  if (useCache) {
    return cachedFetch(
      cacheKey,
      async () => {
        try {
          const response = await axios.get(`${API}/user/notifications`, {
            headers: getAuthHeaders(),
            params: {
              page,
              limit,
            },
          });
          return response.data;
        } catch (error) {
          console.error(
            "❌ Get Notifications Error:",
            error.response?.data || error.message,
          );
          return {
            success: false,
            data: [],
            pagination: {
              page: 1,
              limit: 20,
              total: 0,
              hasMore: false,
            },
            message:
              error.response?.data?.message || "Failed to fetch notifications",
          };
        }
      },
      20000,
    );
  }
  try {
    const response = await axios.get(`${API}/user/notifications`, {
      headers: getAuthHeaders(),
      params: {
        page,
        limit,
      },
    });
    dataCache.set(cacheKey, response.data, 20000);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Notifications Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      data: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        hasMore: false,
      },
      message: error.response?.data?.message || "Failed to fetch notifications",
    };
  }
};
export const getUnreadNotificationsCount = async () => {
  try {
    const response = await axios.get(`${API}/user/notifications/count`, {
      headers: getAuthHeaders(),
    });
    return {
      success: response.data.success,
      count: response.data.data?.unreadCount || 0,
    };
  } catch (error) {
    console.error(
      "❌ Get Unread Count Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      count: 0,
      message: error.response?.data?.message || "Failed to fetch unread count",
    };
  }
};
export const getSessions = async () => {
  try {
    const response = await axios.get(`${API}/sessions`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Sessions Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      data: {
        sessions: [],
        total: 0,
      },
      message: error.response?.data?.message || "Failed to fetch sessions",
    };
  }
};
export const logoutSession = async (sessionId) => {
  try {
    if (!sessionId) {
      return {
        success: false,
        message: "Session ID is required",
      };
    }
    const response = await axios.delete(`${API}/sessions/${sessionId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Logout Session Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to logout session",
    };
  }
};
export const logoutAllSessions = async () => {
  try {
    const response = await axios.post(
      `${API}/sessions/logout-all`,
      {},
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Logout All Sessions Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to logout all sessions",
    };
  }
};
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await axios.patch(
      `${API}/user/notifications/${notificationId}/read`,
      {},
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Mark as Read Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to mark as read",
    };
  }
};
export const markAllNotificationsAsRead = async () => {
  try {
    const response = await axios.patch(
      `${API}/user/notifications/mark-all-read`,
      {},
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Mark All as Read Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to mark all as read",
    };
  }
};
export const getNotificationSettings = async () => {
  try {
    const response = await axios.get(`${API}/user/notification-settings`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Notification Settings Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      data: null,
      message:
        error.response?.data?.message ||
        "Failed to fetch notification settings",
    };
  }
};
export const updateNotificationSettings = async (settings) => {
  try {
    const response = await axios.patch(
      `${API}/user/notification-settings`,
      settings,
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Update Notification Settings Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to update notification settings",
    };
  }
};
export const addToFavorites = async (profileId) => {
  try {
    const idStr = String(profileId);
    const response = await axios.post(
      `${API}/requests/favorites/add`,
      {
        profileId: idStr,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Add to Favorites Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to add to favorites",
    };
  }
};
export const removeFromFavorites = async (profileId) => {
  try {
    const idStr = String(profileId);
    const response = await axios.post(
      `${API}/requests/favorites/remove`,
      {
        profileId: idStr,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Remove from Favorites Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to remove from favorites",
    };
  }
};
export const getFavorites = async () => {
  try {
    const response = await axios.get(`${API}/requests/favorites`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Favorites Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to fetch favorites",
    };
  }
};
export const getAllProfiles = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${API}/profiles?page=${page}&limit=${limit}`,
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get All Profiles Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      data: [],
      pagination: {
        page,
        limit,
        total: 0,
        hasMore: false,
      },
      message: error.response?.data?.message || "Failed to fetch profiles",
    };
  }
};
export const sendConnectionRequest = async (receiverId) => {
  try {
    const idStr = String(receiverId);
    const response = await axios.post(
      `${API}/requests/send`,
      {
        receiverId: idStr,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Send Request Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to send connection request",
    };
  }
};
export const getSentRequests = async () => {
  try {
    const response = await axios.get(`${API}/requests/all`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Sent Requests Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to fetch sent requests",
    };
  }
};
export const getReceivedRequests = async () => {
  try {
    const response = await axios.get(`${API}/requests/all/received`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Received Requests Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      data: [],
      message:
        error.response?.data?.message || "Failed to fetch received requests",
    };
  }
};
export const acceptConnectionRequest = async (requestId) => {
  try {
    const idStr = String(requestId);
    const response = await axios.post(
      `${API}/requests/accept`,
      {
        requestId: idStr,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Accept Request Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to accept connection request",
    };
  }
};
export const rejectConnectionRequest = async (requestId) => {
  try {
    const idStr = String(requestId);
    const response = await axios.post(
      `${API}/requests/reject`,
      {
        requestId: idStr,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Reject Request Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to reject connection request",
    };
  }
};
export const rejectAcceptedConnection = async (requestId) => {
  try {
    const idStr = String(requestId);
    const response = await axios.post(
      `${API}/requests/accepted/reject`,
      {
        requestId: idStr,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Reject Accepted Connection Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to change connection status to rejected",
    };
  }
};
export const acceptRejectedConnection = async (requestId) => {
  try {
    const idStr = String(requestId);
    const response = await axios.post(
      `${API}/requests/rejected/accept`,
      {
        requestId: idStr,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Accept Rejected Connection Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to change connection status to accepted",
    };
  }
};
export const withdrawConnectionRequest = async (connectionId) => {
  try {
    const idStr = String(connectionId);
    const response = await axios.post(
      `${API}/requests/withdraw`,
      {
        connectionId: idStr,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Withdraw Request Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to withdraw connection request",
    };
  }
};
export const getApprovedConnections = async (page = 1, limit = 20) => {
  try {
    const response = await axios.get(
      `${API}/requests/approve?page=${page}&limit=${limit}`,
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Approved Connections Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      data: [],
      message:
        error.response?.data?.message || "Failed to fetch approved connections",
    };
  }
};
export const getCompare = async () => {
  try {
    const response = await axios.get(`${API}/user/compare`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ getCompare error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to fetch compare list",
    };
  }
};
export const addToCompare = async (profileIdOrIds) => {
  try {
    const ids = Array.isArray(profileIdOrIds)
      ? profileIdOrIds.map(String)
      : [String(profileIdOrIds)];
    const response = await axios.post(
      `${API}/user/compare`,
      {
        profilesIds: ids,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ addToCompare error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to add to compare",
    };
  }
};
export const removeFromCompare = async (profileIdOrIds) => {
  try {
    const ids = Array.isArray(profileIdOrIds)
      ? profileIdOrIds.map(String)
      : [String(profileIdOrIds)];
    const response = await axios.delete(`${API}/user/compare`, {
      headers: getAuthHeaders(),
      data: {
        profilesIds: ids,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ removeFromCompare error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to remove from compare",
    };
  }
};
export const changePassword = async (
  oldPassword,
  newPassword,
  confirmPassword,
) => {
  try {
    const response = await axios.post(
      `${API}/user/change-password`,
      {
        oldPassword,
        newPassword,
        confirmPassword,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ changePassword error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const blockUserProfile = async (customId) => {
  try {
    if (!customId || typeof customId !== "string") {
      return {
        success: false,
        message: "Invalid customId provided",
      };
    }
    const response = await axios.post(
      `${API}/user/block`,
      {
        customId,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    const status = error?.response?.status;
    const rawMsg = error?.response?.data?.message || error.message;
    let message = rawMsg;
    if (status === 429 || /24 hours/i.test(rawMsg)) {
      message = "You can change block status for this profile after 24 hours";
    } else if (/already/i.test(rawMsg)) {
      message = "User is already in your blocked list";
    } else if (/cannot block yourself/i.test(rawMsg)) {
      message = "You cannot block your own profile";
    }
    console.error("❌ blockUserProfile error:", rawMsg);
    return {
      success: false,
      message,
    };
  }
};
export const unblockUserProfile = async (customId) => {
  try {
    if (!customId || typeof customId !== "string") {
      return {
        success: false,
        message: "Invalid customId provided",
      };
    }
    const response = await axios.post(
      `${API}/user/unblock`,
      {
        customId,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    const status = error?.response?.status;
    const rawMsg = error?.response?.data?.message || error.message;
    let message = rawMsg;
    if (status === 429 || /24 hours/i.test(rawMsg)) {
      message = "You can change block status for this profile after 24 hours";
    } else if (
      /not in your blocked list/i.test(rawMsg) ||
      /NotBlocked/i.test(rawMsg)
    ) {
      message = "User is not in your blocked list";
    }
    console.error("❌ unblockUserProfile error:", rawMsg);
    return {
      success: false,
      message,
    };
  }
};
export const getBlockedUsers = async (useCache = true) => {
  const cacheKey = "blocked_users";
  if (useCache) {
    return cachedFetch(
      cacheKey,
      async () => {
        try {
          const response = await axios.get(`${API}/user/blocked`, {
            headers: getAuthHeaders(),
          });
          return response.data;
        } catch (error) {
          console.error(
            "❌ getBlockedUsers error:",
            error.response?.data || error.message,
          );
          return {
            success: false,
            data: [],
            message:
              error.response?.data?.message || "Failed to fetch blocked users",
          };
        }
      },
      30000,
    );
  }
  try {
    const response = await axios.get(`${API}/user/blocked`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ getBlockedUsers error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to fetch blocked users",
    };
  }
};
export const getProfileViews = async (
  page = 1,
  limit = 10,
  useCache = false,
) => {
  const cacheKey = `profile_views_${page}_${limit}`;
  if (useCache) {
    return cachedFetch(
      cacheKey,
      async () => {
        try {
          const response = await axios.get(`${API}/user/profile-views`, {
            params: {
              page,
              limit,
            },
            headers: getAuthHeaders(),
          });
          return response.data;
        } catch (error) {
          console.error(
            "❌ getProfileViews error:",
            error.response?.data || error.message,
          );
          return {
            success: false,
            data: [],
            message:
              error.response?.data?.message || "Failed to fetch profile views",
            pagination: {
              page: 1,
              limit: 10,
              total: 0,
              totalPages: 0,
            },
          };
        }
      },
      15000,
    );
  }
  try {
    const response = await axios.get(`${API}/user/profile-views`, {
      params: {
        page,
        limit,
      },
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ getProfileViews error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to fetch profile views",
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
    };
  }
};
export const downloadUserPdf = async (userId = null) => {
  try {
    const currentUserId = userId || localStorage.getItem("userId");

    const queryParam = currentUserId ? `?userId=${currentUserId}` : "";
    const response = await axios.get(`${API}/user/download-pdf${queryParam}`, {
      headers: {
        ...getAuthHeaders(),
      },
    });

    if (response.status !== 200 || !response.data?.success) {
      throw new Error("Failed to get PDF URL");
    }

    const pdfUrl = response.data.data?.url;

    if (!pdfUrl) {
      throw new Error("PDF URL not found in response");
    }

    // Extract filename from URL or create a default one
    const urlParts = pdfUrl.split("/");
    const fileName =
      urlParts[urlParts.length - 1].split("?")[0] ||
      `biodata_${Date.now()}.pdf`;

    // Create a temporary link element to trigger download
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("PDF downloaded successfully!");
  } catch (error) {
    console.error("Download PDF error:", error);
    toast.error(error.response?.data?.message || "Failed to download PDF.");
  }
};
export const updateGovernmentId = async (formData) => {
  try {
    const response = await axios.put(
      `${API}/user-personal/upload/government-id`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Update Government ID Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const updateUserPhoto = async (formData) => {
  try {
    const response = await axios.put(
      `${API}/user-personal/upload/photos`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Update User Photo Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const activateAccount = async (token) => {
  try {
    // If token is not provided, just reactivate the authenticated user
    const response = await axios.post(
      `${API}/user/account/activate`,
      token ? { token } : {},
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Account Activation Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Account activation failed. Please try again.",
    };
  }
};

export const getAccountStatus = async () => {
  try {
    const response = await axios.get(`${API}/user/account/status`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Account Status Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      status: "active",
      message:
        error.response?.data?.message || "Failed to fetch account status",
    };
  }
};

export const deactivateAccount = async (reason) => {
  try {
    const response = await axios.post(
      `${API}/user/account/deactivate`,
      { reason },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Account Deactivation Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Account deactivation failed. Please try again.",
    };
  }
};

export const deleteUserAccount = async (reason) => {
  try {
    const response = await axios.delete(`${API}/user/account`, {
      headers: getAuthHeaders(),
      data: { reason },
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Delete User Account Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to delete account. Please try again.",
    };
  }
};

export const createSupportTicket = async (subject, message, category) => {
  try {
    const payload = { subject, message, description: message, category };
    console.log("Creating ticket with payload:", payload);

    const response = await axios.post(`${API}/support/tickets`, payload, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Create Support Ticket Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to create support ticket.",
    };
  }
};

export const getSupportTickets = async () => {
  try {
    const response = await axios.get(`${API}/support/tickets`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Support Tickets Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to fetch support tickets.",
    };
  }
};

export const getSupportTicketDetails = async (ticketId) => {
  try {
    const response = await axios.get(`${API}/support/tickets/${ticketId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Ticket Details Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to fetch ticket details.",
    };
  }
};

export const getFAQs = async () => {
  try {
    const response = await axios.get(`${API}/support/faqs`);
    return response.data;
  } catch (error) {
    console.error("❌ Get FAQs Error:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch FAQs.",
    };
  }
};

export const addTicketMessage = async (ticketId, text) => {
  try {
    const response = await axios.post(
      `${API}/support/tickets/${ticketId}/messages`,
      { text },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Add Ticket Message Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to add message to ticket.",
    };
  }
};

export const reportProfile = async (
  customId,
  reason,
  description,
  reportType,
) => {
  try {
    // Validate input
    if (!customId || !reason || !description || !reportType) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    if (description.length < 6 || description.length > 500) {
      return {
        success: false,
        message: "Description must be between 6 and 500 characters.",
      };
    }

    const validReportTypes = ["spam", "abuse", "hate", "other"];
    if (!validReportTypes.includes(reportType)) {
      return {
        success: false,
        message: "Invalid report type.",
      };
    }

    const response = await axios.post(
      `${API}/report`,
      {
        customId,
        reason,
        description,
        reportType,
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Report Profile Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to submit report.",
    };
  }
};
