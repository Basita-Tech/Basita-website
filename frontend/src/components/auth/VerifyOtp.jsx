import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { verifyEmailOtp, sendEmailOtp, sendSmsOtp, verifySmsOtp } from "../../api/auth";
import toast from "react-hot-toast";
const OTP_VALID_TIME = 180;
const RESEND_AFTER = 60;
const MAX_RESEND = 5;
const LOCK_DURATION = 24 * 60 * 60 * 1000;

const SMS_HASH = "satfera";
const OTP_COOKIE_TTL_MIN = 1 * 24 * 60; 

const buildOtpCookieKey = (email = "", countryCode = "", mobile = "") => {
  const normalizedEmail = email.toLowerCase();
  const normalizedPhone = `${countryCode}${mobile}`;
  return `otpStatus_${normalizedEmail}_${normalizedPhone}`;
};
const setOtpCookie = ({ email, countryCode, mobile, data }) => {
  if (!email) return;
  const key = buildOtpCookieKey(email, countryCode, mobile);
  const payload = {
    data,
    expiresAt: Date.now() + OTP_COOKIE_TTL_MIN * 60 * 1000
  };
  try {
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (e) {
    console.warn("Failed to persist OTP status to localStorage", e);
  }
};

const clearOtpCookie = (email, countryCode, mobile) => {
  if (!email) return;
  const key = buildOtpCookieKey(email, countryCode, mobile);
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn("Failed to clear OTP status from localStorage", e);
  }
};

const getOtpCookie = (email, countryCode, mobile) => {
  if (!email) return null;
  const key = buildOtpCookieKey(email, countryCode, mobile);
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.expiresAt || parsed.expiresAt < Date.now()) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.data;
  } catch (e) {
    console.warn("Failed to read OTP status from localStorage", e);
    return null;
  }
};

// Safe no-op to avoid reference errors when verification completes
const applyAuth = () => {};
const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    email,
    name,
    mobile,
    countryCode,
    fromLogin
  } = location.state || {};
  const [emailOtp, setEmailOtp] = useState(Array(6).fill(""));
  const [emailCountdown, setEmailCountdown] = useState(OTP_VALID_TIME);
  const [resendAttemptsEmail, setResendAttemptsEmail] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(RESEND_AFTER);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const otpRefs = useRef([]);
  const [mobileOtp, setMobileOtp] = useState(Array(6).fill(""));
  const [mobileCountdown, setMobileCountdown] = useState(OTP_VALID_TIME);
  const [resendAttemptsMobile, setResendAttemptsMobile] = useState(0);
  const [resendCooldownMobile, setResendCooldownMobile] = useState(RESEND_AFTER);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [isMobileLocked, setIsMobileLocked] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [mobileSuccessMessage, setMobileSuccessMessage] = useState("");
  const [isVerifyingMobile, setIsVerifyingMobile] = useState(false);
  const [initialEmailSent, setInitialEmailSent] = useState(false);
  const [initialMobileSent, setInitialMobileSent] = useState(false);
  const mobileOtpRefs = useRef([]);
  const initialEmailSentRef = useRef(false);
  const initialMobileSentRef = useRef(false);
  const nonIndianSmsSentRef = useRef(false);

  const normalizedCountryCode = (countryCode || "").trim();
  const resolvedCountryCode = normalizedCountryCode
    ? normalizedCountryCode.startsWith("+")
      ? normalizedCountryCode
      : `+${normalizedCountryCode}`
    : "";
  const resolvedMobile = (mobile || "").toString().trim();
  // Login (202) requires OTP for any phone; signup enforces OTP only for +91
  const requiresMobileOtp = fromLogin
    ? Boolean(resolvedCountryCode && resolvedMobile)
    : resolvedCountryCode.replace("+", "") === "91";

  // Only hide verified sections during 202/login flows; keep signup UI intact
  const hideVerifiedSections = fromLogin;
  const showEmailSection = !(hideVerifiedSections && isEmailVerified);
  const showMobileSection = requiresMobileOtp && !(hideVerifiedSections && isMobileVerified);

  const clearPersistedOtpStatus = () => {
    clearOtpCookie(email, countryCode, mobile);
    try {
      sessionStorage.removeItem("otpState");
    } catch (e) {
      console.warn("Failed to clear OTP session state", e);
    }
  };

  const persistOtpStatus = updates => {
    const current = getOtpCookie(email, countryCode, mobile) || {};
    const next = {
      emailVerified: updates.emailVerified ?? current.emailVerified ?? isEmailVerified,
      mobileVerified: updates.mobileVerified ?? current.mobileVerified ?? isMobileVerified
    };
    setOtpCookie({
      email,
      countryCode,
      mobile,
      data: next
    });
  };
  useEffect(() => {
    const lockData = JSON.parse(localStorage.getItem("otpLock")) || {};
    const now = Date.now();
    if (lockData[email] && now - lockData[email] < LOCK_DURATION) {
      setIsLocked(true);
    } else if (lockData[email]) {
      delete lockData[email];
      localStorage.setItem("otpLock", JSON.stringify(lockData));
    }
    
    // Check mobile lock
    const mobileKey = `${countryCode}${mobile}`;
    if (lockData[mobileKey] && now - lockData[mobileKey] < LOCK_DURATION) {
      setIsMobileLocked(true);
    } else if (lockData[mobileKey]) {
      delete lockData[mobileKey];
      localStorage.setItem("otpLock", JSON.stringify(lockData));
    }
  }, [email, mobile, countryCode]);

  
  useEffect(() => {
    const saved = getOtpCookie(email, countryCode, mobile);
    if (!saved) return;

    // For login (202) flows, reuse persisted verification so we don't re-ask verified channels
    if (fromLogin) {
      if (saved.emailVerified) {
        setIsEmailVerified(true);
        setEmailCountdown(0);
        setResendCooldown(0);
        setSuccessMessage("Email already verified");
      }
      if (saved.mobileVerified) {
        setIsMobileVerified(true);
        setMobileCountdown(0);
        setResendCooldownMobile(0);
        setMobileSuccessMessage("Mobile already verified");
      }
      return;
    }

    // Signup flow uses the same persisted state (mostly for refresh resilience)
    if (saved.emailVerified) {
      setIsEmailVerified(true);
      setEmailCountdown(0);
      setResendCooldown(0);
      setSuccessMessage("Email already verified");
    }
    if (saved.mobileVerified) {
      setIsMobileVerified(true);
      setMobileCountdown(0);
      setResendCooldownMobile(0);
      setMobileSuccessMessage("Mobile already verified");
    }
  }, [email, mobile, countryCode, fromLogin]);
  useEffect(() => {
    if (!email) {
     
      navigate(fromLogin ? "/login" : "/signup");
    }
  }, [email, navigate, fromLogin]);
  useEffect(() => {
    if (emailCountdown > 0 && !isEmailVerified && !isLocked) {
      const t = setInterval(() => setEmailCountdown(p => p - 1), 1000);
      return () => clearInterval(t);
    }
  }, [emailCountdown, isEmailVerified, isLocked]);
  useEffect(() => {
    if (resendCooldown > 0 && !isEmailVerified && !isLocked) {
      const t = setInterval(() => setResendCooldown(prev => Math.max(0, prev - 1)), 1000);
      return () => clearInterval(t);
    }
  }, [resendCooldown, isEmailVerified, isLocked]);

 
  useEffect(() => {
    if (mobileCountdown > 0 && !isMobileVerified && !isMobileLocked && requiresMobileOtp) {
      const t = setInterval(() => setMobileCountdown(p => p - 1), 1000);
      return () => clearInterval(t);
    }
  }, [mobileCountdown, isMobileVerified, isMobileLocked, requiresMobileOtp]);


  useEffect(() => {
    if (resendCooldownMobile > 0 && !isMobileVerified && !isMobileLocked && requiresMobileOtp) {
      const t = setInterval(() => setResendCooldownMobile(prev => Math.max(0, prev - 1)), 1000);
      return () => clearInterval(t);
    }
  }, [resendCooldownMobile, isMobileVerified, isMobileLocked, requiresMobileOtp]);


  // Auto-send email OTP on mount for pending verification (login) flows only
  useEffect(() => {
    const sendInitialEmailOtp = async () => {
      try {
        initialEmailSentRef.current = true;
        setIsVerifying(true);
        const res = await sendEmailOtp({
          email,
          type: "signup",
          resendAttempt: 0
        });
        const isSuccess = !!(res?.success || res?.data?.success || res?.data?.data?.success);
        if (isSuccess) {
          setEmailCountdown(OTP_VALID_TIME);
          setResendCooldown(RESEND_AFTER);
          setEmailOtp(Array(6).fill(""));
          setInitialEmailSent(true);
        } else {
          const message = res?.message || res?.data?.message || "Failed to send OTP. Please try again.";
          setError(message);
          initialEmailSentRef.current = false;
          setInitialEmailSent(false);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Unable to send OTP. Please try again.");
        initialEmailSentRef.current = false;
        setInitialEmailSent(false);
      } finally {
        setIsVerifying(false);
      }
    };

    if (fromLogin && email && !isEmailVerified && !isLocked && !initialEmailSentRef.current) {
      sendInitialEmailOtp();
    }
  }, [email, isEmailVerified, isLocked, initialEmailSent, fromLogin]);

  // Auto-send mobile OTP on mount for pending verification (login) flows (Indian numbers only)
  useEffect(() => {
    const sendInitialMobileOtp = async () => {
      try {
        initialMobileSentRef.current = true;
        setIsVerifyingMobile(true);
        const res = await sendSmsOtp({
          phoneNumber: resolvedMobile,
          countryCode: resolvedCountryCode,
          hash: SMS_HASH,
          type: "signup",
          resendAttempt: 0
        });
        const isSuccess = !!(res?.success || res?.data?.success || res?.data?.data?.success);
        if (isSuccess) {
          setMobileCountdown(OTP_VALID_TIME);
          setResendCooldownMobile(RESEND_AFTER);
          setMobileOtp(Array(6).fill(""));
          setInitialMobileSent(true);
        } else {
          const message = res?.message || res?.data?.message || "Failed to send mobile OTP. Please try again.";
          setMobileError(message);
          initialMobileSentRef.current = false;
          setInitialMobileSent(false);
        }
      } catch (err) {
        setMobileError(err.response?.data?.message || "Unable to send mobile OTP. Please try again.");
        initialMobileSentRef.current = false;
        setInitialMobileSent(false);
      } finally {
        setIsVerifyingMobile(false);
      }
    };

    if (
      fromLogin &&
      resolvedMobile &&
      requiresMobileOtp &&
      !isMobileVerified &&
      !isMobileLocked &&
      !initialMobileSentRef.current
    ) {
      sendInitialMobileOtp();
    }
  }, [resolvedMobile, resolvedCountryCode, requiresMobileOtp, isMobileVerified, isMobileLocked, initialMobileSent, fromLogin]);

  // Signup-only: auto-mark non-Indian numbers as verified (legacy behavior)
  useEffect(() => {
    if (fromLogin) return; // login flows must verify any number
    const isNonIndianWithPhone = resolvedMobile && resolvedCountryCode && resolvedCountryCode.replace("+", "") !== "91";
    if (!isNonIndianWithPhone || nonIndianSmsSentRef.current || isMobileVerified) return;

    const autoVerify = async () => {
      nonIndianSmsSentRef.current = true;
      try {
        await sendSmsOtp({
          phoneNumber: resolvedMobile,
          countryCode: resolvedCountryCode,
          hash: SMS_HASH,
          type: "signup"
        });
      } catch (err) {
        console.warn("Non-Indian SMS send failed; continuing with auto-verify", err?.message || err);
      }
      setIsMobileVerified(true);
      setMobileSuccessMessage("Mobile auto-verified for this country");
      persistOtpStatus({ mobileVerified: true });
    };

    autoVerify();
  }, [fromLogin, resolvedMobile, resolvedCountryCode, isMobileVerified]);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    if (isVerifying) return;
    const otpArray = [...emailOtp];
    otpArray[index] = value;
    setEmailOtp(otpArray);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (isVerifying) return;
    if (e.key === "Backspace") {
      e.preventDefault();
      const otpArray = [...emailOtp];
      if (otpArray[index]) {
        otpArray[index] = "";
        setEmailOtp(otpArray);
        return;
      }
      if (index > 0) {
        otpArray[index - 1] = ""; 
        setEmailOtp(otpArray);
        otpRefs.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = e => {
    e.preventDefault();
    if (isVerifying) return;
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (!paste.length) return;
    const filled = Array(6).fill("");
    paste.forEach((d, i) => {
      filled[i] = d;
    });
    setEmailOtp(filled);
    const nextIndex = Math.min(paste.length, 5);
    otpRefs.current[nextIndex]?.focus();
  };

  // Mobile OTP handlers
  const handleMobileOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    if (isVerifyingMobile) return;
    const otpArray = [...mobileOtp];
    otpArray[index] = value;
    setMobileOtp(otpArray);
    if (value && index < 5) {
      mobileOtpRefs.current[index + 1]?.focus();
    }
  };

  const handleMobileOtpKeyDown = (index, e) => {
    if (isVerifyingMobile) return;
    if (e.key === "Backspace") {
      e.preventDefault();
      const otpArray = [...mobileOtp];
      if (otpArray[index]) {
        otpArray[index] = "";
        setMobileOtp(otpArray);
        return;
      }
      if (index > 0) {
        otpArray[index - 1] = "";
        setMobileOtp(otpArray);
        mobileOtpRefs.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      mobileOtpRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      mobileOtpRefs.current[index + 1]?.focus();
    }
  };

  const handleMobileOtpPaste = e => {
    e.preventDefault();
    if (isVerifyingMobile) return;
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (!paste.length) return;
    const filled = Array(6).fill("");
    paste.forEach((d, i) => {
      filled[i] = d;
    });
    setMobileOtp(filled);
    const nextIndex = Math.min(paste.length, 5);
    mobileOtpRefs.current[nextIndex]?.focus();
  };
  const formatTime = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const handleResend = async () => {
    if (isEmailVerified) return; // no resend once verified
    try {
      if (resendAttemptsEmail >= MAX_RESEND) {
        setError(`Too many resend attempts. Email OTP locked for 24 hours. You've used all ${MAX_RESEND} attempts.`);
        toast.error(`Too many resend attempts. Email OTP locked for 24 hours.`);
        return;
      }
      if (resendCooldown > 0) return;
      if (isVerifying) {
        return;
      }
      setIsVerifying(true);
      setError("");
      setSuccessMessage("");
      const res = await sendEmailOtp({
        email,
        type: "signup",
        resendAttempt: resendAttemptsEmail + 1
      });
      const isSuccess = !!(res?.success || res?.data?.success || res?.data?.data?.success);
      if (isSuccess) {
        const newAttempts = resendAttemptsEmail + 1;
        setEmailCountdown(OTP_VALID_TIME);
        setResendCooldown(RESEND_AFTER);
        setResendAttemptsEmail(newAttempts);
        setEmailOtp(Array(6).fill(""));
        toast.success("OTP resent successfully!");
        if (newAttempts >= MAX_RESEND) {
          setError(`Warning: This was your ${newAttempts}/${MAX_RESEND} resend. You have no more resends available.`);
        }
      } else {
        const message = res?.message || res?.data?.message || "Failed to send OTP. Please try again.";
        console.error("Send OTP failed:", message);
        setError(message);
      }
    } catch (err) {
      console.error("Resend OTP Error:", {
        error: err,
        response: err.response?.data,
        status: err.response?.status
      });
      const errorMessage = err.response?.data?.message || "Unable to send OTP. Please check your internet connection and try again.";
      setError(errorMessage);
      if (err.response?.status >= 500) {
        setResendAttemptsEmail(prev => Math.max(0, prev - 1));
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendMobile = async () => {
    if (!mobile || !requiresMobileOtp) return;
    if (isMobileVerified) return; // no resend once verified
    try {
      if (resendAttemptsMobile >= MAX_RESEND) {
        setMobileError(`Too many resend attempts. Mobile OTP locked for 24 hours. You've used all ${MAX_RESEND} attempts.`);
        toast.error(`Too many resend attempts. Mobile OTP locked for 24 hours.`);
        return;
      }
      if (resendCooldownMobile > 0) return;
      if (isVerifyingMobile) return;

      setIsVerifyingMobile(true);
      setMobileError("");
      setMobileSuccessMessage("");

      const res = await sendSmsOtp({
        phoneNumber: resolvedMobile,
        countryCode: resolvedCountryCode,
        hash: SMS_HASH,
        type: "signup",
        resendAttempt: resendAttemptsMobile + 1
      });

      const isSuccess = !!(res?.success || res?.data?.success || res?.data?.data?.success);
      if (isSuccess) {
        const newAttempts = resendAttemptsMobile + 1;
        setMobileCountdown(OTP_VALID_TIME);
        setResendCooldownMobile(RESEND_AFTER);
        setResendAttemptsMobile(newAttempts);
        setMobileOtp(Array(6).fill(""));
        toast.success("Mobile OTP resent successfully!");
        if (newAttempts >= MAX_RESEND) {
          setMobileError(`Warning: This was your ${newAttempts}/${MAX_RESEND} resend. You have no more resends available.`);
        }
      } else {
        const message = res?.message || res?.data?.message || "Failed to send mobile OTP. Please try again.";
        setMobileError(message);
      }
    } catch (err) {
      console.error("Resend Mobile OTP Error:", err);
      const errorMessage = err.response?.data?.message || "Unable to send mobile OTP. Please try again.";
      setMobileError(errorMessage);
      if (err.response?.status >= 500) {
        setResendAttemptsMobile(prev => Math.max(0, prev - 1));
      }
    } finally {
      setIsVerifyingMobile(false);
    }
  };

  const handleVerifyMobileOtp = async () => {
    if (!requiresMobileOtp || !mobile) {
      setMobileSuccessMessage("Mobile verification not required for this number");
      setMobileError("");
      setIsMobileVerified(true);
      persistOtpStatus({ mobileVerified: true });
      return;
    }

    setMobileError("");
    setMobileSuccessMessage("");

    if (isMobileLocked) {
      setMobileError("Mobile OTP verification locked for 24 hours");
      return;
    }

    const mobileValue = mobileOtp.join("");
    if (mobileValue.length < 6) {
      setMobileError("Enter 6-digit Mobile OTP");
      return;
    }

    try {
      if (isVerifyingMobile) return;
      setIsVerifyingMobile(true);

      const res = await verifySmsOtp({
        phoneNumber: mobile,
        countryCode,
        hash: SMS_HASH,
        code: mobileValue,
        type: "signup"
      });

      const ok = !!(res?.success || res?.data?.success || res?.data?.data?.success);
      if (ok) {
        setIsMobileVerified(true);
        setMobileSuccessMessage("Mobile verified successfully!");
        setMobileError("");
        persistOtpStatus({ mobileVerified: true });
      } else {
        const message = res?.message || res?.data?.message || res?.data?.data?.message || "Incorrect Mobile OTP";
        setMobileError(message);
        setMobileSuccessMessage("");
      }

      const attempts = res?.failedAttempts || res?.data?.failedAttempts || res?.data?.data?.failedAttempts || 0;
      if (attempts >= MAX_RESEND) {
        setIsMobileLocked(true);
        const lockData = JSON.parse(localStorage.getItem("otpLock")) || {};
        const mobileKey = `${resolvedCountryCode}${mobile}`;
        lockData[mobileKey] = Date.now();
        localStorage.setItem("otpLock", JSON.stringify(lockData));
        toast.error("Mobile OTP verification locked for 24 hours");
      }
    } catch (err) {
      console.error("Mobile OTP Verification Error:", err);
      setMobileError(err.response?.data?.message || "Error verifying mobile OTP");
    } finally {
      setIsVerifyingMobile(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setMobileError("");
    setMobileSuccessMessage("");

    if (isLocked) {
      setError("Email OTP verification locked for 24 hours");
      return;
    }

    if (isMobileLocked && requiresMobileOtp) {
      setError("Mobile OTP verification locked for 24 hours");
      return;
    }

    // If everything already verified, just finish without extra API calls
    if (isEmailVerified && (!requiresMobileOtp || isMobileVerified)) {
      setSuccessMessage("Verification successful!");
      toast.success("Verification Complete!");
      clearPersistedOtpStatus();
      navigate("/success", {
        state: {
          name,
          email,
          mobile: resolvedCountryCode ? `${resolvedCountryCode}${resolvedMobile}`.replace(/\+/, "") : resolvedMobile
        }
      });
      return;
    }

    // Check if email needs verification
    if (!isEmailVerified) {
      const emailValue = emailOtp.join("");
      if (emailValue.length < 6) {
        setError("Enter 6-digit Email OTP");
        return;
      }
    }

    // Check mobile OTP for Indian numbers if not already verified
    if (requiresMobileOtp && resolvedMobile && !isMobileVerified) {
      const mobileValue = mobileOtp.join("");
      if (mobileValue.length < 6) {
        setError("Enter 6-digit Mobile OTP");
        return;
      }
    }

    try {
      if (isVerifying) return;
      setIsVerifying(true);

      let emailOk = isEmailVerified; // If already verified, skip verification
      let mobileOk = isMobileVerified || !requiresMobileOtp; // If already verified or not required, skip

      // Verify email OTP only if not already verified
      if (!isEmailVerified) {
        setIsVerifyingMobile(true);
        const emailValue = emailOtp.join("");
        const emailRes = await verifyEmailOtp({
          email,
          otp: emailValue,
          type: "signup"
        });
        emailOk = !!(emailRes?.success || emailRes?.data?.success || emailRes?.data?.data?.success);
        
        if (emailOk) {
          setIsEmailVerified(true);
          persistOtpStatus({ emailVerified: true });
          applyAuth(emailRes);
        } else {
          const message = emailRes?.message || emailRes?.data?.message || "Incorrect Email OTP";
          setError(message);
          
          const attempts = emailRes?.failedAttempts || emailRes?.data?.failedAttempts || 0;
          if (attempts >= MAX_RESEND) {
            setIsLocked(true);
            const lockData = JSON.parse(localStorage.getItem("otpLock")) || {};
            lockData[email] = Date.now();
            localStorage.setItem("otpLock", JSON.stringify(lockData));
            toast.error("Email OTP verification locked for 24 hours");
          }
        }
      }
      
      // Verify mobile OTP for Indian numbers only if not already verified
      if (requiresMobileOtp && resolvedMobile && !isMobileVerified) {
        const mobileValue = mobileOtp.join("");
        const mobileRes = await verifySmsOtp({
          phoneNumber: resolvedMobile,
          countryCode: resolvedCountryCode,
          hash: SMS_HASH,
          code: mobileValue,
          type: "signup"
        });
        mobileOk = !!(mobileRes?.success || mobileRes?.data?.success || mobileRes?.data?.data?.success);
        
        if (mobileOk) {
          setIsMobileVerified(true);
          persistOtpStatus({ mobileVerified: true });
          applyAuth(mobileRes);
        } else {
          const mobileMessage = mobileRes?.message || mobileRes?.data?.message || "Incorrect Mobile OTP";
          setMobileError(mobileMessage);
          
          const mobileAttempts = mobileRes?.failedAttempts || mobileRes?.data?.failedAttempts || 0;
          if (mobileAttempts >= MAX_RESEND) {
            setIsMobileLocked(true);
            const lockData = JSON.parse(localStorage.getItem("otpLock")) || {};
            const mobileKey = `${resolvedCountryCode}${resolvedMobile}`;
            lockData[mobileKey] = Date.now();
            localStorage.setItem("otpLock", JSON.stringify(lockData));
            toast.error("Mobile OTP verification locked for 24 hours");
          }
        }
      }

      // If both are verified, navigate to success
      if (emailOk && mobileOk) {
        setSuccessMessage("Verification successful!");
        setError("");
        toast.success("Verification Complete!");
        
        setTimeout(() => {
          clearPersistedOtpStatus();
          navigate("/success", {
            state: {
              name,
              email,
              mobile: resolvedCountryCode ? `${resolvedCountryCode}${resolvedMobile}`.replace(/\+/, "") : resolvedMobile
            }
          });
        }, 1100);
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      setError(err.response?.data?.message || "Error verifying OTP");
    } finally {
      setIsVerifying(false);
      setIsVerifyingMobile(false);
    }
  };
  return <>
      <style>
        {`\
          .otp-input {\
            width: 2.5rem;\
            height: 2.5rem;\
            border: 1px solid #ccc;\
            border-radius: 0.25rem;\
            text-align: center;\
            font-size: 1.25rem;\
            transition: border 0.2s, box-shadow 0.2s;\
          }\
          .otp-input:focus {\
            outline: none;\
            border: 1px solid #E4C48A;\
            box-shadow: 0 0 5px #E4C48A33;\
          }\
          .otp-input:disabled {
            background: #f2f2f2;
            color: #9e9e9e;
            border-color: #d7d7d7;
            box-shadow: none;
          }
\
          @media (min-width: 640px) {\
            .otp-input {\
              width: 3rem;\
              height: 3rem;\
              font-size: 1.5rem;\
            }\
          }\
        `}
      </style>

      <div className="min-h-screen w-full bg-[#F9F7F5] flex items-center justify-center py-8 px-4">
        <div className="bg-[#FBFAF7] shadow-2xl rounded-3xl w-full max-w-md p-6 sm:p-8">
          <Link to={fromLogin ? "/login" : "/signup"} className="inline-flex items-center gap-2 mb-4 px-3 py-2 bg-[#D4A052] text-white rounded-md font-medium">
            <ArrowLeft size={16} />
            Back
          </Link>

          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold mb-2">
              {fromLogin ? "Verification Required" : "Verify OTP"}
            </h3>
            {fromLogin && <p className="text-sm text-gray-600">
              Your account is not verified. Please verify your email{requiresMobileOtp ? " and mobile" : ""} to continue.
            </p>}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Error Messages */}
            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">{error}</div>}
            {mobileError && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">{mobileError}</div>}

            {/* Email OTP Section */}
            {showEmailSection && (
              <div className="mb-4">
                <h6 className="font-medium">Email OTP</h6>
                <p className="text-sm text-gray-500">{email}</p>
                <div className="flex justify-center gap-2 mb-2 mt-3 email-otp" aria-label="Email OTP inputs">
                  {emailOtp.map((digit, idx) => <input
                      key={idx}
                      id={`email-otp-${idx}`}
                      ref={el => {
                      otpRefs.current[idx] = el;
                    }}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      disabled={isEmailVerified || emailCountdown === 0 || isLocked || isVerifying}
                      value={digit}
                      onChange={e => handleOtpChange(idx, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(idx, e)}
                      onPaste={handleOtpPaste}
                      className="otp-input"
                    />)}
                </div>
                <div className="text-center text-sm mt-2">
                  {isVerifying ? <span className="text-blue-600">Verifying...</span> : isEmailVerified ? <span className="text-green-600 inline-flex items-center gap-1"><CheckCircle2 size={16} /> Email Verified</span> : isLocked ? <span className="text-red-600">
                      Email OTP locked for 24 hours
                    </span> : emailCountdown <= 0 ? <>
                      <span className="text-red-600 block mb-2">
                        Email OTP expired
                      </span>
                      {resendAttemptsEmail < MAX_RESEND && (resendCooldown > 0 ? <span className="text-xs text-[#8A6F2A]">
                            You can resend in {formatTime(resendCooldown)}
                          </span> : <div className="flex items-center justify-center gap-2">
                            <button type="button" className="inline-flex items-center justify-center px-4 py-2 rounded-full border text-sm font-semibold transition bg-[#D4A052] text-white border-[#D4A052] hover:bg-[#E4C48A]" onClick={handleResend} disabled={isVerifying || isEmailVerified}>
                              Resend Email OTP
                            </button>
                          </div>)}
                    </> : <>
                      {resendAttemptsEmail < MAX_RESEND && (resendCooldown > 0 ? <span className="text-xs text-[#8A6F2A]">
                            You can resend in {formatTime(resendCooldown)}
                          </span> : <div className="flex items-center justify-center gap-2">
                            <button type="button" className="inline-flex items-center justify-center px-4 py-2 rounded-full border text-sm font-semibold transition bg-[#D4A052] text-white border-[#D4A052] hover:bg-[#E4C48A]" onClick={handleResend} disabled={isVerifying || resendCooldown > 0 || isLocked || isEmailVerified}>
                              Resend Email OTP
                            </button>
                          </div>)}
                      <span className="ml-2 text-gray-500">
                        Valid for {formatTime(emailCountdown)}
                      </span>
                    </>}
                </div>
              </div>
            )}

            {/* Mobile OTP Section - shown when a phone number is available */}
            {mobile && resolvedCountryCode && showMobileSection && (
              <div className="mb-4 mt-6 pt-6 border-t border-gray-200">
                <h6 className="font-medium">Mobile OTP</h6>
                <p className="text-sm text-gray-500">{resolvedCountryCode} {mobile}</p>
                
                {requiresMobileOtp ? (
                  <>
                    <div className="flex justify-center gap-2 mb-2 mt-3 mobile-otp" aria-label="Mobile OTP inputs">
                      {mobileOtp.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`mobile-otp-${idx}`}
                          ref={el => {
                            mobileOtpRefs.current[idx] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength="1"
                          disabled={isMobileVerified || mobileCountdown === 0 || isMobileLocked || isVerifyingMobile}
                          value={digit}
                          onChange={e => handleMobileOtpChange(idx, e.target.value)}
                          onKeyDown={e => handleMobileOtpKeyDown(idx, e)}
                          onPaste={handleMobileOtpPaste}
                          className="otp-input"
                        />
                      ))}
                    </div>
                    <div className="text-center text-sm mt-2">
                      {isVerifyingMobile ? (
                        <span className="text-blue-600">Verifying...</span>
                      ) : isMobileVerified ? (
                        <span className="text-green-600 inline-flex items-center gap-1"><CheckCircle2 size={16} /> Mobile Verified</span>
                      ) : isMobileLocked ? (
                        <span className="text-red-600">Mobile OTP locked for 24 hours</span>
                      ) : mobileCountdown <= 0 ? (
                        <>
                          <span className="text-red-600 block mb-2">Mobile OTP expired</span>
                          {resendAttemptsMobile < MAX_RESEND && (
                            resendCooldownMobile > 0 ? (
                              <span className="text-xs text-[#8A6F2A]">
                                You can resend in {formatTime(resendCooldownMobile)}
                              </span>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center px-4 py-2 rounded-full border text-sm font-semibold transition bg-[#D4A052] text-white border-[#D4A052] hover:bg-[#E4C48A]"
                                  onClick={handleResendMobile}
                                  disabled={isVerifyingMobile || isMobileVerified}
                                >
                                  Resend Mobile OTP
                                </button>
                              </div>
                            )
                          )}
                        </>
                      ) : (
                        <>
                          {resendAttemptsMobile < MAX_RESEND && (
                            resendCooldownMobile > 0 ? (
                              <span className="text-xs text-[#8A6F2A]">
                                You can resend in {formatTime(resendCooldownMobile)}
                              </span>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center px-4 py-2 rounded-full border text-sm font-semibold transition bg-[#D4A052] text-white border-[#D4A052] hover:bg-[#E4C48A]"
                                  onClick={handleResendMobile}
                                  disabled={isVerifyingMobile || resendCooldownMobile > 0 || isMobileLocked || isMobileVerified}
                                >
                                  Resend Mobile OTP
                                </button>
                              </div>
                            )
                          )}
                          <span className="ml-2 text-gray-500">
                            Valid for {formatTime(mobileCountdown)}
                          </span>
                        </>
                      )}
                    </div>
                  </>
                ) : null}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-3 mt-4 rounded-xl font-semibold text-white bg-[#D4A052] hover:bg-[#E4C48A] transition" 
              disabled={isLocked || isVerifying || (requiresMobileOtp && isMobileLocked)}
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </>;
};
export default VerifyOTP;