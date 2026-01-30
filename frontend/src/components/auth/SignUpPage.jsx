import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendEmailOtp, sendSmsOtp, signupUser, verifyOtp } from "../../api/auth";
import { ArrowLeft, CheckCircleFill } from "react-bootstrap-icons";
import { Eye, EyeOff } from "lucide-react";
import { allCountries } from "country-telephone-data";
import SearchableCountryCode from "../SearchableCountryCode";
import toast from "react-hot-toast";
import { AuthContextr } from "../context/AuthContext";
import {
  sanitizeName,
  sanitizeEmail,
  sanitizePhone,
  sanitizeCountryCode,
  sanitizePassword,
  sanitizeString,
} from "../../utils/sanitization";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateDateOfBirth,
  validatePassword,
  validatePasswordMatch,
  validateCountryCode,
  validateProfileFor,
  validateGender,
  validateSignupForm,
  getPasswordStrength,
} from "../../utils/validation";
import { trackEvent } from "../analytics/ga4";
import SEO from "../SEO";

const SMS_HASH = "Satfera";
const OTP_VALID_TIME = 180; 
const RESEND_AFTER = 60; // 1 minute cooldown
const MAX_RESEND = 5;

const profileOptions = [
  {
    value: "myself",
    label: "Myself",
  },
  {
    value: "son",
    label: "Son",
  },
  {
    value: "daughter",
    label: "Daughter",
  },
  {
    value: "brother",
    label: "Brother",
  },
  {
    value: "sister",
    label: "Sister",
  },
  {
    value: "friend",
    label: "Friend",
  },
];
const existingEmails = ["test@example.com", "hello@domain.com"];
const existingMobiles = ["+911234567890", "+919876543210"];
const SignUpPage = () => {
  const today = new Date();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useContext(AuthContextr);
  const [formData, setFormData] = useState({
    profileFor: "",
    gender: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    email: "",
    countryCode: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    useAsUsername: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [emailOtpSending, setEmailOtpSending] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpValues, setEmailOtpValues] = useState(["", "", "", "", "", ""]);
  const [emailOtpVerifying, setEmailOtpVerifying] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [emailCountdown, setEmailCountdown] = useState(OTP_VALID_TIME);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendAttemptsEmail, setResendAttemptsEmail] = useState(0);
  const emailOtpRefs = useRef([]);
  const [mobileOtpSending, setMobileOtpSending] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtpValues, setMobileOtpValues] = useState(["", "", "", "", "", ""]);
  const [mobileOtpVerifying, setMobileOtpVerifying] = useState(false);
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
  const [mobileCountdown, setMobileCountdown] = useState(OTP_VALID_TIME);
  const [mobileResendCooldown, setMobileResendCooldown] = useState(0);
  const [mobileResendAttempts, setMobileResendAttempts] = useState(0);
  const mobileOtpRefs = useRef([]);


  useEffect(() => {
    if (emailCountdown > 0 && emailOtpSent && !emailOtpVerified) {
      const timer = setInterval(() => setEmailCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [emailCountdown, emailOtpSent, emailOtpVerified]);


  useEffect(() => {
    if (resendCooldown > 0 && emailOtpSent && !emailOtpVerified) {
      const timer = setInterval(() => setResendCooldown(prev => Math.max(0, prev - 1)), 1000);
      return () => clearInterval(timer);
    }
  }, [resendCooldown, emailOtpSent, emailOtpVerified]);

 
  useEffect(() => {
    if (mobileCountdown > 0 && mobileOtpSent && !mobileOtpVerified) {
      const timer = setInterval(() => setMobileCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [mobileCountdown, mobileOtpSent, mobileOtpVerified]);


  useEffect(() => {
    if (mobileResendCooldown > 0 && mobileOtpSent && !mobileOtpVerified) {
      const timer = setInterval(() => setMobileResendCooldown(prev => Math.max(0, prev - 1)), 1000);
      return () => clearInterval(timer);
    }
  }, [mobileResendCooldown, mobileOtpSent, mobileOtpVerified]);

  const getCountryAliases = (name, iso2) => {
    const aliasMap = {
      "United States": ["USA", "US", "America"],
      "United Kingdom": ["UK", "Britain", "Great Britain"],
      "United Arab Emirates": ["UAE"],
      "South Korea": ["Korea"],
      "Czech Republic": ["Czechia"],
      Netherlands: ["Holland"],
      Switzerland: ["Swiss"],
    };
    return aliasMap[name] || [];
  };
  const countryCodes = [
    {
      code: "+91",
      country: "India",
      aliases: [],
    },
    ...allCountries
      .filter((c) => c.iso2 !== "in")
      .map((c) => ({
        code: `+${c.dialCode}`,
        country: c.name,
        aliases: getCountryAliases(c.name, c.iso2),
      })),
  ];
  const getNameLabel = () => {
    switch (formData.profileFor) {
      case "myself":
        return "Your Name";
      case "son":
      case "brother":
        return "His Name";
      case "daughter":
      case "sister":
        return "Her Name";
      default:
        return "Name";
    }
  };
  const focusNext = (currentName) => {
    const order = ["dobDay", "dobMonth", "dobYear"];
    const currentIndex = order.indexOf(currentName);
    if (currentIndex !== -1 && currentIndex < order.length - 1) {
      const nextField = document.getElementsByName(order[currentIndex + 1])[0];
      nextField?.focus();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "email") {
      formattedValue = sanitizeEmail(value);
    } else if (name === "mobile") {
      formattedValue = sanitizePhone(value);

      const cleanValue = formattedValue.replace(/\D/g, "");

      if (formData.countryCode === "+91" && cleanValue.length > 10) {
        formattedValue = cleanValue.slice(0, 10);
      } else if (cleanValue.length > 15) {
        formattedValue = cleanValue.slice(0, 15);
      }
    } else if (name === "countryCode") {
      formattedValue = sanitizeCountryCode(value);
    } else if (name === "password" || name === "confirmPassword") {
      formattedValue = sanitizePassword(value);
    } else if (["firstName", "middleName", "lastName"].includes(name)) {
      formattedValue = sanitizeName(value);
    } else if (["dobDay", "dobMonth", "dobYear"].includes(name)) {
      formattedValue = value.replace(/\D/g, "");
    } else {
      formattedValue = sanitizeString(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    if (["firstName", "lastName"].includes(name)) {
      const error = validateName(
        formattedValue,
        name === "firstName" ? "First Name" : "Last Name",
      );
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }

    if (name === "email") {
      const emailError = validateEmail(formattedValue);
      setErrors((prev) => ({
        ...prev,
        email: emailError,
      }));
    }

    if (name === "mobile") {
      const phoneError = validatePhone(formattedValue, formData.countryCode);
      setErrors((prev) => ({
        ...prev,
        mobile: phoneError,
      }));
    }
    if (name === "password") {
      const strength = getPasswordStrength(formattedValue);
      setPasswordCriteria({
        length: formattedValue.length >= 6,
        upper: /[A-Z]/.test(formattedValue),
        lower: /[a-z]/.test(formattedValue),
        number: /\d/.test(formattedValue),
        special: /[@$!%*?&#_]/.test(formattedValue),
      });
    }
    if (["dobDay", "dobMonth", "dobYear"].includes(name)) {
      let dobError = "";
      if (name === "dobDay" && formattedValue.length === 2) {
        if (+formattedValue < 1 || +formattedValue > 31)
          dobError = "Invalid day";
        else focusNext(name);
      }
      if (name === "dobMonth" && formattedValue.length === 2) {
        if (+formattedValue < 1 || +formattedValue > 12)
          dobError = "Invalid month";
        else focusNext(name);
      }
      if (name === "dobYear" && formattedValue.length === 4) {
        const year = +formattedValue;
        const currentYear = today.getFullYear();
        if (year < currentYear - 100 || year > currentYear)
          dobError = "Invalid year";
        else {
          const dobValidationError = validateDateOfBirth(
            formData.dobDay,
            formData.dobMonth,
            formattedValue,
            formData.gender,
          );
          if (dobValidationError) dobError = dobValidationError;
        }
      }
      if (dobError) {
        setErrors((prev) => ({
          ...prev,
          dobDay: dobError,
        }));
      }
    }
  };
  const handleProfileForChange = (value) => {
    const sanitizedValue = sanitizeString(value);
    const profileError = validateProfileFor(sanitizedValue);
    let autoGender = "";
    if (sanitizedValue === "son" || sanitizedValue === "brother")
      autoGender = "male";
    if (sanitizedValue === "daughter" || sanitizedValue === "sister")
      autoGender = "female";
    setFormData((prev) => ({
      ...prev,
      profileFor: sanitizedValue,
      gender: autoGender || "",
    }));
    setErrors((prev) => {
      const updated = {
        ...prev,
      };
      delete updated.profileFor;
      if (autoGender) {
        delete updated.gender;
      } else {
        delete updated.gender;
      }
      return updated;
    });
    if (autoGender) {
      const dobError = validateDateOfBirth(
        formData.dobDay,
        formData.dobMonth,
        formData.dobYear,
        autoGender,
      );
      setErrors((prev) => ({
        ...prev,
        dobDay: dobError,
      }));
    }
  };
  const handleGenderSelect = (gender) => {
    const sanitizedGender = sanitizeString(gender);
    const genderError = validateGender(sanitizedGender);
    setFormData((prev) => ({
      ...prev,
      gender: sanitizedGender,
    }));
    setErrors((prev) => ({
      ...prev,
      gender: "",
    }));
    localStorage.setItem("gender", sanitizedGender);
    const dobError = validateDateOfBirth(
      formData.dobDay,
      formData.dobMonth,
      formData.dobYear,
      sanitizedGender,
    );
    setErrors((prev) => ({
      ...prev,
      dobDay: dobError,
    }));
  };
  const handleGenderBlur = () => {
    setErrors((prev) => {
      const newErr = {
        ...prev,
      };
      delete newErr.gender;
      return newErr;
    });
  };
  const handleNameBlur = (fieldName) => {
    const fieldLabel =
      fieldName === "firstName"
        ? "First Name"
        : fieldName === "lastName"
          ? "Last Name"
          : "Middle Name";
    const fieldValue = formData[fieldName];
    if (fieldValue.trim()) {
      const error = validateName(fieldValue, fieldLabel);
      if (error) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: error,
        }));
      } else {
        setErrors((prev) => {
          const newErr = {
            ...prev,
          };
          delete newErr[fieldName];
          return newErr;
        });
      }
    }
  };
  const handleDOBBlur = () => {
    const dobError = validateDateOfBirth(
      formData.dobDay,
      formData.dobMonth,
      formData.dobYear,
      formData.gender,
    );
    if (dobError) {
      setErrors((prev) => ({
        ...prev,
        dobDay: dobError,
      }));
    } else {
      setErrors((prev) => {
        const newErr = {
          ...prev,
        };
        delete newErr.dobDay;
        delete newErr.dobMonth;
        delete newErr.dobYear;
        return newErr;
      });
    }
  };
  const handleUsernameToggle = (type) => {
    setFormData((prev) => {
      let updatedSelection = [];
      if (prev.useAsUsername.includes(type)) {
        updatedSelection = prev.useAsUsername.filter((t) => t !== type);
      } else {
        updatedSelection = [type];
      }
      setErrors((prevErrors) => {
        const newErrors = {
          ...prevErrors,
        };
        if (updatedSelection.length > 0) {
          delete newErrors.useAsUsername;
        }
        return newErrors;
      });
      return {
        ...prev,
        useAsUsername: updatedSelection,
      };
    });
  };
  const handleSendEmailOtp = async () => {
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      toast.error(emailError);
      return;
    }
    setEmailOtpSending(true);
    try {
      const sanitizedEmail = sanitizeEmail(formData.email.trim());
      const emailOtpRes = await sendEmailOtp({
        email: sanitizedEmail,
        type: "signup",
      });
      if (emailOtpRes?.success) {
        // Check if already verified (backend returns this for 409)
        if (emailOtpRes?.message?.toLowerCase().includes("already verified")) {
          setEmailOtpVerified(true);
          toast.success(emailOtpRes.message);
        } else {
          setEmailOtpSent(true);
          setEmailOtpValues(["", "", "", "", "", ""]);
          setEmailOtpVerified(false);
          setEmailCountdown(OTP_VALID_TIME);
          setResendCooldown(RESEND_AFTER);
          toast.success(emailOtpRes?.message || "OTP sent to your email successfully!");
          setTimeout(() => emailOtpRefs.current[0]?.focus(), 100);
        }
      } else {
        toast.error(emailOtpRes?.message || "Failed to send Email OTP");
      }
    } catch (error) {
      console.error("Email OTP error:", error);
      toast.error("Error sending OTP. Please try again.");
    } finally {
      setEmailOtpSending(false);
    }
  };

  const handleEmailOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtpValues = [...emailOtpValues];
    newOtpValues[index] = value.slice(-1);
    setEmailOtpValues(newOtpValues);

    if (value && index < 5) {
      emailOtpRefs.current[index + 1]?.focus();
    }
  };

  const handleEmailOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !emailOtpValues[index] && index > 0) {
      emailOtpRefs.current[index - 1]?.focus();
    }
  };

  const handleEmailOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtpValues = [...emailOtpValues];
    
    for (let i = 0; i < 6; i++) {
      newOtpValues[i] = pastedData[i] || "";
    }
    
    setEmailOtpValues(newOtpValues);
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    emailOtpRefs.current[lastFilledIndex]?.focus();
  };

  const handleVerifyEmailOtp = async () => {
    const otpString = emailOtpValues.join("");
    
    if (otpString.length !== 6) {
      toast.error("Please enter complete 6-digit OTP");
      return;
    }

    setEmailOtpVerifying(true);
    try {
      const sanitizedEmail = sanitizeEmail(formData.email.trim());
      const verifyRes = await verifyOtp({
        email: sanitizedEmail,
        otp: otpString,
        type: "email",
      });

      if (verifyRes?.success) {
        setEmailOtpVerified(true);
        toast.success("Email verified successfully!");
      } else {
        toast.error(verifyRes?.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Email OTP verification error:", error);
      toast.error("Error verifying OTP. Please try again.");
    } finally {
      setEmailOtpVerifying(false);
    }
  };

  const handleResendEmailOtp = async () => {
    if (emailOtpVerified) return;
    
    if (resendAttemptsEmail >= MAX_RESEND) {
      toast.error(`Too many resend attempts. You've used all ${MAX_RESEND} attempts.`);
      return;
    }

    if (resendCooldown > 0) {
      toast.error(`Please wait ${formatTime(resendCooldown)} before resending.`);
      return;
    }

    setEmailOtpSending(true);
    try {
      const sanitizedEmail = sanitizeEmail(formData.email.trim());
      const emailOtpRes = await sendEmailOtp({
        email: sanitizedEmail,
        type: "signup",
        resendAttempt: resendAttemptsEmail + 1
      });
      
      if (emailOtpRes?.success) {
        // Check if already verified (backend returns this for 409)
        if (emailOtpRes?.message?.toLowerCase().includes("already verified")) {
          setEmailOtpVerified(true);
          toast.success(emailOtpRes.message);
        } else {
          const newAttempts = resendAttemptsEmail + 1;
          setEmailCountdown(OTP_VALID_TIME);
          setResendCooldown(RESEND_AFTER);
          setResendAttemptsEmail(newAttempts);
          setEmailOtpValues(["", "", "", "", "", ""]);
          toast.success(emailOtpRes?.message || "OTP resent successfully!");
          setTimeout(() => emailOtpRefs.current[0]?.focus(), 100);
          
          if (newAttempts >= MAX_RESEND) {
            toast.error(`Warning: This was your ${newAttempts}/${MAX_RESEND} resend. You have no more resends available.`);
          }
        }
      } else {
        toast.error(emailOtpRes?.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("Error resending OTP. Please try again.");
    } finally {
      setEmailOtpSending(false);
    }
  };

  const handleSendMobileOtp = async () => {
    const phoneError = validatePhone(formData.mobile, formData.countryCode);
    if (phoneError) {
      setErrors((prev) => ({ ...prev, mobile: phoneError }));
      toast.error(phoneError);
      return;
    }
    if (!formData.countryCode) {
      toast.error("Please select country code");
      return;
    }
    setMobileOtpSending(true);
    try {
      let sanitizedMobile = sanitizePhone(formData.mobile).replace(/\D/g, "");
      if (sanitizedMobile.startsWith("0")) {
        sanitizedMobile = sanitizedMobile.slice(1);
      }
      const countryCodeMatch = formData.countryCode.match(/^\+\d+/);
      const sanitizedCountryCode = countryCodeMatch
        ? sanitizeCountryCode(countryCodeMatch[0])
        : sanitizeCountryCode(formData.countryCode);
      
      const mobileOtpRes = await sendSmsOtp({
        phoneNumber: sanitizedMobile,
        countryCode: sanitizedCountryCode,
        hash: SMS_HASH,
        type: "signup",
      });
      
      if (mobileOtpRes?.success) {
        // Check if already verified (backend returns this for 409)
        if (mobileOtpRes?.message?.toLowerCase().includes("already verified")) {
          setMobileOtpVerified(true);
          toast.success(mobileOtpRes.message);
        } else {
          setMobileOtpSent(true);
          setMobileOtpValues(["", "", "", "", "", ""]);
          setMobileOtpVerified(false);
          setMobileCountdown(OTP_VALID_TIME);
          setMobileResendCooldown(RESEND_AFTER);
          toast.success(mobileOtpRes?.message || "OTP sent to your mobile successfully!");
        }
      } else {
        toast.error(mobileOtpRes?.message || "Failed to send Mobile OTP");
      }
    } catch (error) {
      console.error("Mobile OTP error:", error);
      toast.error("Error sending OTP. Please try again.");
    } finally {
      setMobileOtpSending(false);
    }
  };

  const handleMobileOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtpValues = [...mobileOtpValues];
    newOtpValues[index] = value.slice(-1);
    setMobileOtpValues(newOtpValues);

    if (value && index < 5) {
      mobileOtpRefs.current[index + 1]?.focus();
    }
  };

  const handleMobileOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !mobileOtpValues[index] && index > 0) {
      mobileOtpRefs.current[index - 1]?.focus();
    }
  };

  const handleMobileOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtpValues = [...mobileOtpValues];
    
    for (let i = 0; i < 6; i++) {
      newOtpValues[i] = pastedData[i] || "";
    }
    
    setMobileOtpValues(newOtpValues);
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    mobileOtpRefs.current[lastFilledIndex]?.focus();
  };

  const handleVerifyMobileOtp = async () => {
    const otpString = mobileOtpValues.join("");
    
    if (otpString.length !== 6) {
      toast.error("Please enter complete 6-digit OTP");
      return;
    }

    setMobileOtpVerifying(true);
    try {
      let sanitizedMobile = sanitizePhone(formData.mobile).replace(/\D/g, "");
      if (sanitizedMobile.startsWith("0")) {
        sanitizedMobile = sanitizedMobile.slice(1);
      }
      const countryCodeMatch = formData.countryCode.match(/^\+\d+/);
      const sanitizedCountryCode = countryCodeMatch
        ? sanitizeCountryCode(countryCodeMatch[0])
        : sanitizeCountryCode(formData.countryCode);

      const verifyRes = await verifyOtp({
        phoneNumber: sanitizedMobile,
        countryCode: sanitizedCountryCode,
        otp: otpString,
        type: "sms",
      });

      if (verifyRes?.success) {
        setMobileOtpVerified(true);
        toast.success("Mobile verified successfully!");
      } else {
        toast.error(verifyRes?.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Mobile OTP verification error:", error);
      toast.error("Error verifying OTP. Please try again.");
    } finally {
      setMobileOtpVerifying(false);
    }
  };

  const handleResendMobileOtp = async () => {
    if (mobileOtpVerified) return;
    
    if (mobileResendAttempts >= MAX_RESEND) {
      toast.error(`Too many resend attempts. You've used all ${MAX_RESEND} attempts.`);
      return;
    }

    if (mobileResendCooldown > 0) {
      toast.error(`Please wait ${formatTime(mobileResendCooldown)} before resending.`);
      return;
    }

    setMobileOtpSending(true);
    try {
      let sanitizedMobile = sanitizePhone(formData.mobile).replace(/\D/g, "");
      if (sanitizedMobile.startsWith("0")) {
        sanitizedMobile = sanitizedMobile.slice(1);
      }
      const countryCodeMatch = formData.countryCode.match(/^\+\d+/);
      const sanitizedCountryCode = countryCodeMatch
        ? sanitizeCountryCode(countryCodeMatch[0])
        : sanitizeCountryCode(formData.countryCode);

      const mobileOtpRes = await sendSmsOtp({
        phoneNumber: sanitizedMobile,
        countryCode: sanitizedCountryCode,
        hash: SMS_HASH,
        type: "signup",
        resendAttempt: mobileResendAttempts + 1
      });
      
      if (mobileOtpRes?.success) {
        const newAttempts = mobileResendAttempts + 1;
        setMobileCountdown(OTP_VALID_TIME);
        setMobileResendCooldown(RESEND_AFTER);
        setMobileResendAttempts(newAttempts);
        setMobileOtpValues(["", "", "", "", "", ""]);
        toast.success("Mobile OTP resent successfully!");
        setTimeout(() => mobileOtpRefs.current[0]?.focus(), 100);
        
        if (newAttempts >= MAX_RESEND) {
          toast.error(`Warning: This was your ${newAttempts}/${MAX_RESEND} resend. You have no more resends available.`);
        }
      } else {
        toast.error(mobileOtpRes?.message || "Failed to resend mobile OTP");
      }
    } catch (error) {
      console.error("Resend mobile OTP error:", error);
      toast.error("Error resending mobile OTP. Please try again.");
    } finally {
      setMobileOtpSending(false);
    }
  };

  const validateForm = () => {
    const validation = validateSignupForm({
      profileFor: formData.profileFor,
      gender: formData.gender,
      firstName: formData.firstName,
      lastName: formData.lastName,
      middleName: formData.middleName,
      dobDay: formData.dobDay,
      dobMonth: formData.dobMonth,
      dobYear: formData.dobYear,
      email: formData.email,
      mobile: formData.mobile,
      countryCode: formData.countryCode,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      useAsUsername: formData.useAsUsername,
      termsAccepted: termsAccepted,
    });
    setErrors(validation.errors);
    return validation.isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrors({});
    try {
      const sanitizedFirstName = sanitizeName(formData.firstName.trim());
      const sanitizedMiddleName = sanitizeName(
        formData.middleName?.trim() || "",
      );
      const sanitizedLastName = sanitizeName(formData.lastName.trim());
      const sanitizedEmail = sanitizeEmail(formData.email.trim());
      let sanitizedMobile = sanitizePhone(formData.mobile).replace(/\D/g, "");
      const countryCodeMatch = formData.countryCode.match(/^\+\d+/);
      const sanitizedCountryCode = countryCodeMatch
        ? sanitizeCountryCode(countryCodeMatch[0])
        : sanitizeCountryCode(formData.countryCode);
      const sanitizedProfileFor = sanitizeString(formData.profileFor);
      const sanitizedGender = sanitizeString(formData.gender);
      const sanitizedPassword = sanitizePassword(formData.password);
      if (sanitizedMobile.startsWith("0")) {
        sanitizedMobile = sanitizedMobile.slice(1);
      }
      const phoneNumber = `${sanitizedCountryCode}${sanitizedMobile}`;
      const useEmailAsUsername = formData.useAsUsername.includes("email");
      const useMobileAsUsername = formData.useAsUsername.includes("mobile");

      const payload = {
        firstName: sanitizedFirstName,
        middleName: sanitizedMiddleName,
        lastName: sanitizedLastName,
        gender: sanitizedGender,
        email: sanitizedEmail,
        phoneNumber,
        password: sanitizedPassword,
        termsAndConditionsAccepted: termsAccepted,
        dateOfBirth: `${String(formData.dobDay).padStart(2, "0")}-${String(formData.dobMonth).padStart(2, "0")}-${formData.dobYear}`,
        for_Profile: sanitizedProfileFor,
        isEmailLoginEnabled: useEmailAsUsername,
        isMobileLoginEnabled: useMobileAsUsername,
      };
      const res = await signupUser(payload);
      if (res?.success) {
        toast.success("Account created successfully!");
        navigate("/success", {
          state: {
            name: `${sanitizedFirstName} ${sanitizedMiddleName ? sanitizedMiddleName + ' ' : ''}${sanitizedLastName}`.trim(),
            email: sanitizedEmail,
            mobile: phoneNumber,
          }
        });
        return;
      }
      if (!res?.success) {
        toast.error(res?.message || "Signup failed");
        setErrors((prev) => ({
          ...prev,
          ...(res.message?.toLowerCase().includes("email")
            ? {
                email: res.message,
              }
            : {
                mobile: res.message,
              }),
        }));
        return;
      }
      if (res?.errors) {
        const newErrors = {};
        if (Array.isArray(res.errors)) {
          res.errors.forEach((err) => {
            const field =
              err.param || err.field || err.key || err.path || "form";
            const message = err.msg || err.message || String(err);
            const mappedField = (() => {
              if (["phoneNumber", "phone", "mobile"].includes(field))
                return "mobile";
              if (["for_Profile", "forProfile", "for_profile"].includes(field))
                return "profileFor";
              if (["dateOfBirth", "dob", "date_of_birth"].includes(field))
                return "dobDay";
              if (["firstName", "firstname"].includes(field))
                return "firstName";
              if (["lastName", "lastname"].includes(field)) return "lastName";
              if (field === "email") return "email";
              if (field === "password") return "password";
              return field;
            })();
            newErrors[mappedField] = message;
          });
        } else if (typeof res.errors === "object") {
          Object.keys(res.errors).forEach((k) => {
            newErrors[k] = Array.isArray(res.errors[k])
              ? res.errors[k].join(" ")
              : String(res.errors[k]);
          });
        }
        setErrors((prev) => ({
          ...prev,
          ...newErrors,
        }));
        return;
      }
      setErrors((prev) => ({
        ...prev,
        form: res?.message || "Signup failed. Try again.",
      }));
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full bg-[var(--brand-bg)] flex justify-center items-center px-2.5 sm:px-4">
      <SEO
        title="Register | Satfera"
        description="Register a Satfera account."
        path="/signup"
      />
      <div className="bg-[var(--brand-card)] rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-xl hover:scale-[1.01] sm:hover:scale-[1.02] transition-transform duration-300">
        <Link
          to="/"
          className="text-[var(--brand-primary)] text-xs sm:text-sm flex items-center mb-4 sm:mb-6 hover:text-[var(--brand-gold)] transition-colors"
        >
          <ArrowLeft className="mr-1 w-4 h-4 sm:w-5 sm:h-5" /> Back to Home
        </Link>

        <div className="text-center mb-6 sm:mb-8">
          <h2 className="inline font-bold text-xl sm:text-2xl md:text-3xl text-gray-800">
            Create Your Profile
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6"
          autoComplete="off"
        >
          {}
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-sm text-gray-700">
              Matrimony Profile For <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {profileOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleProfileForChange(opt.value)}
                  className={`px-4 py-3 text-sm font-medium shadow-md border rounded-md transition-all duration-200 
                    ${formData.profileFor === opt.value ? "bg-[var(--brand-primary)] text-white border-[var(--brand-gold)] font-semibold" : "bg-white text-gray-700 border-[var(--brand-gold)] hover:bg-[#FFF9F2]"}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {errors.profileFor && (
              <p className="text-red-500 text-sm mt-1">{errors.profileFor}</p>
            )}
          </div>

          {}
          {(formData.profileFor === "myself" ||
            formData.profileFor === "friend") && (
            <div className="mt-4">
              <label className="block font-semibold mb-2 text-sm text-gray-700">
                Gender <span className="text-red-500">*</span>
              </label>

              <div className="flex flex-wrap gap-2">
                {["male", "female"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleGenderSelect(g)}
                    className={`px-4 py-3 text-sm font-medium shadow-md border rounded-md transition-all duration-200
            ${formData.gender === g ? "bg-[var(--brand-primary)] text-white border-[var(--brand-gold)] font-semibold" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                  >
                    {g === "male" ? "Male" : "Female"}
                  </button>
                ))}
              </div>

              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>
          )}

          {}
          <div>
            <label className="block font-semibold mb-2 text-sm sm:text-base text-gray-700">
              {getNameLabel()} <span className="text-red-500">*</span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Candidate's Name *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={() => handleNameBlur("firstName")}
                  autoComplete="off"
                  className={`w-full p-3 rounded-md border text-sm ${errors.firstName ? "border-red-500" : "border-[var(--brand-gold)]"} 
    focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)] transition`}
                />

                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  type="text"
                  name="middleName"
                  placeholder="Father's Name"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  onBlur={() => handleNameBlur("middleName")}
                  autoComplete="off"
                  className={`w-full p-3 rounded-md border text-sm ${errors.middleName ? "border-red-500" : "border-[var(--brand-gold)]"} 
    focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)] transition`}
                />
              </div>

              <div className="flex flex-col">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Surname*"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={() => handleNameBlur("lastName")}
                  autoComplete="off"
                  className={`w-full p-3 rounded-md border text-sm ${errors.lastName ? "border-red-500" : "border-[var(--brand-gold)]"} 
    focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)] transition`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
          </div>

          {}
          <div>
            <label className="block font-semibold mb-2 text-sm sm:text-base text-gray-700">
              Date of Birth <span className="text-red-500">*</span>
            </label>

            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                name="dobDay"
                placeholder="DD"
                maxLength={2}
                value={formData.dobDay}
                onChange={handleInputChange}
                onBlur={handleDOBBlur}
                autoComplete="off"
                className={`w-full p-3 rounded-md border text-sm ${errors.dobDay ? "border-red-500" : "border-[var(--brand-gold)]"} focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)] transition`}
              />
              <input
                type="text"
                name="dobMonth"
                placeholder="MM"
                maxLength={2}
                value={formData.dobMonth}
                onChange={handleInputChange}
                onBlur={handleDOBBlur}
                autoComplete="off"
                className={`w-full p-3 rounded-md border text-sm ${errors.dobMonth ? "border-red-500" : "border-[var(--brand-gold)]"} focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)] transition`}
              />
              <input
                type="text"
                name="dobYear"
                placeholder="YYYY"
                maxLength={4}
                value={formData.dobYear}
                onChange={handleInputChange}
                onBlur={handleDOBBlur}
                autoComplete="off"
                className={`w-full p-3 rounded-md border text-sm ${errors.dobYear ? "border-red-500" : "border-[var(--brand-gold)]"} focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)] transition`}
              />
            </div>

            {}
            {errors.dobDay && (
              <p className="text-red-500 text-sm mt-1">{errors.dobDay}</p>
            )}
          </div>

          {}
          <div className="flex flex-col w-full mb-4 sm:mb-6">
            <label className="block font-semibold mb-2 text-sm sm:text-base text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => {
                  handleInputChange(e);
                  setEmailOtpSent(false);
                  setEmailOtpVerified(false);
                  setEmailOtpValues(["", "", "", "", "", ""]);
                }}
                autoComplete="off"
                className={`flex-1 p-3 rounded-md border text-sm ${errors.email ? "border-red-500" : "border-[var(--brand-gold)]"} focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)] transition`}
              />
              <button
                type="button"
                onClick={handleSendEmailOtp}
                disabled={emailOtpSending || !formData.email || emailOtpSent || emailOtpVerified}
                className={`w-auto px-2.5 py-1.5 rounded font-medium text-[11px] whitespace-nowrap transition-all duration-200 ${
                  emailOtpVerified
                    ? "bg-[var(--brand-primary)] text-white cursor-not-allowed"
                    : emailOtpSent
                    ? "bg-[var(--brand-primary)] text-white cursor-not-allowed"
                    : emailOtpSending || !formData.email
                    ? "bg-[#f5ecd8] text-[#a89165] cursor-not-allowed border border-[#e6d8b8] opacity-70"
                    : "bg-[var(--brand-primary)] hover:bg-[var(--brand-gold)] text-white"
                }`}
              >
                {emailOtpSending ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                ) : emailOtpVerified ? (
                  "✓ Verified"
                ) : emailOtpSent ? (
                  "✓ Sent"
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}

            {/* OTP Input Boxes */}
            {emailOtpSent && !emailOtpVerified && (
              <div className="mt-4 flex flex-col items-start w-full">
                <div className="flex gap-2 justify-start items-center">
                  {emailOtpValues.map((value, index) => (
                    <input
                      key={index}
                      ref={(el) => (emailOtpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={value}
                      onChange={(e) => handleEmailOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleEmailOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleEmailOtpPaste : undefined}
                      disabled={emailCountdown === 0}
                      className={`w-10 h-10 sm:w-12 sm:h-12 text-center text-lg font-semibold border border-[var(--brand-gold)] rounded-lg focus:outline-none transition ${
                        emailCountdown === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                      }`}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={handleVerifyEmailOtp}
                    disabled={emailOtpVerifying || emailOtpValues.join("").length !== 6 || emailCountdown === 0}
                    className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
                      emailOtpVerifying || emailOtpValues.join("").length !== 6 || emailCountdown === 0
                        ? "bg-[#f5ecd8] text-[#a89165] cursor-not-allowed border border-[#e6d8b8] opacity-70"
                        : "bg-[var(--brand-primary)] hover:bg-[var(--brand-gold)] text-white"
                    }`}
                  >
                    {emailOtpVerifying ? (
                      <span className="flex items-center justify-center gap-1">
                        <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>

                {/* Timer and Status */}
                <div className="w-full mt-2 flex flex-col items-center">
                  {emailCountdown > 0 ? (
                    <div className="flex items-center justify-center gap-3 text-sm">
                      <span className="text-gray-600">
                        Valid for <span className="font-semibold text-[var(--brand-primary)]">{formatTime(emailCountdown)}</span>
                      </span>
                      {emailOtpSent && resendCooldown > 0 ? null : emailOtpSent && resendAttemptsEmail < MAX_RESEND ? (
                        <button
                          type="button"
                          onClick={handleResendEmailOtp}
                          disabled={emailOtpSending}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold transition bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-gold)] disabled:opacity-50"
                        >
                          Resend OTP
                        </button>
                      ) : null}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-red-600">OTP expired</span>
                      {resendAttemptsEmail < MAX_RESEND && emailOtpSent && (
                        resendCooldown > 0 ? null : (
                          <button
                            type="button"
                            onClick={handleResendEmailOtp}
                            disabled={emailOtpSending}
                            className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold transition bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-gold)] disabled:opacity-50"
                          >
                            Resend OTP
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* <p className="text-xs text-amber-700 font-medium mt-2 opacity-80">
                Note: This email address will be used for OTP verification and cannot be changed until onboarding is complete.
            </p> */}

            <div className="mt-1">
              <input
                type="checkbox"
                checked={formData.useAsUsername.includes("email")}
                onChange={() => handleUsernameToggle("email")}
                className="mr-2 accent-[#333230] w-3 h-3"
              />
              <span className="text-xs sm:text-sm">
                Use as Username{" "}
                {formData.useAsUsername.includes("email") && (
                  <CheckCircleFill className="inline text-[var(--brand-primary)] ml-1" />
                )}
              </span>
            </div>
            {errors.useAsUsername && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.useAsUsername}
              </p>
            )}
          </div>

          {}
          <div className="flex flex-col w-full mb-4 sm:mb-6">
            <label className="text-xs sm:text-sm font-medium mb-2">
              Mobile <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-col gap-2">
              {/* Country Code on its own line on mobile, inline on desktop */}
              <div className="sm:hidden">
                <SearchableCountryCode
                  value={formData.countryCode}
                  onChange={(code) => {
                    setFormData({
                      ...formData,
                      countryCode: code,
                    });
                    setErrors((prev) => ({
                      ...prev,
                      mobile: "",
                    }));
                    setMobileOtpSent(false);
                  }}
                  error={errors.mobile}
                  countryCodes={countryCodes}
                />
              </div>

              {/* Input and Button Row */}
              <div className="flex gap-2">
                {/* Country Code for desktop */}
                <div className="hidden sm:block w-auto">
                  <SearchableCountryCode
                    value={formData.countryCode}
                    onChange={(code) => {
                      setFormData({
                        ...formData,
                        countryCode: code,
                      });
                      setErrors((prev) => ({
                        ...prev,
                        mobile: "",
                      }));
                      setMobileOtpSent(false);
                    }}
                    error={errors.mobile}
                    countryCodes={countryCodes}
                  />
                </div>

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter Mobile Number"
                  value={formData.mobile}
                  maxLength={formData.countryCode === "+91" ? 10 : 15}
                  onChange={(e) => {
                    handleInputChange(e);
                    setMobileOtpSent(false);
                    setMobileOtpVerified(false);
                    setMobileOtpValues(["", "", "", "", "", ""]);
                  }}
                  autoComplete="off"
                  className={`flex-1 p-3 rounded-md border text-sm ${errors.mobile ? "border-red-500" : "border-[var(--brand-gold)]"} focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)] transition`}
                />
                <button
                  type="button"
                  onClick={handleSendMobileOtp}
                  disabled={mobileOtpSending || !formData.mobile || !formData.countryCode || mobileOtpSent || mobileOtpVerified}
                  className={`w-auto px-2.5 py-1.5 rounded font-medium text-[11px] whitespace-nowrap transition-all duration-200 ${
                    mobileOtpVerified
                      ? "bg-[var(--brand-primary)] text-white cursor-not-allowed"
                      : mobileOtpSent
                      ? "bg-[var(--brand-primary)] text-white cursor-not-allowed"
                      : mobileOtpSending || !formData.mobile || !formData.countryCode
                      ? "bg-[#f5ecd8] text-[#a89165] cursor-not-allowed border border-[#e6d8b8] opacity-70"
                      : "bg-[var(--brand-primary)] hover:bg-[var(--brand-gold)] text-white"
                  }`}
                >
                  {mobileOtpSending ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  ) : mobileOtpVerified ? (
                    "✓ Verified"
                  ) : mobileOtpSent ? (
                    "✓ Sent"
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            </div>
            {/* <p className="text-xs text-amber-700 font-medium mt-2 opacity-80">
               Note: This mobile number will be used for OTP verification and cannot be changed until onboarding is complete.
            </p> */}

            {/* Mobile OTP Input Boxes */}
            {mobileOtpSent && !mobileOtpVerified && (
              <div className="mt-4 flex flex-col items-start w-full">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Enter OTP sent to your mobile
                </label>
                <div className="flex gap-2 justify-start items-center">
                  {mobileOtpValues.map((value, index) => (
                    <input
                      key={index}
                      ref={(el) => (mobileOtpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={value}
                      onChange={(e) => handleMobileOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleMobileOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleMobileOtpPaste : undefined}
                      disabled={mobileCountdown === 0}
                      className={`w-10 h-10 sm:w-12 sm:h-12 text-center text-lg font-semibold border border-[var(--brand-gold)] rounded-lg focus:outline-none transition ${
                        mobileCountdown === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                      }`}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={handleVerifyMobileOtp}
                    disabled={mobileOtpVerifying || mobileOtpValues.join("").length !== 6 || mobileCountdown === 0}
                    className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
                      mobileOtpVerifying || mobileOtpValues.join("").length !== 6 || mobileCountdown === 0
                        ? "bg-[#f5ecd8] text-[#a89165] cursor-not-allowed border border-[#e6d8b8] opacity-70"
                        : "bg-[var(--brand-primary)] hover:bg-[var(--brand-gold)] text-white"
                    }`}
                  >
                    {mobileOtpVerifying ? (
                      <span className="flex items-center justify-center gap-1">
                        <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>

                {/* Timer and Status */}
                <div className="w-full mt-2 flex flex-col items-center">
                  {mobileCountdown > 0 ? (
                    <div className="flex items-center justify-center gap-3 text-sm">
                      <span className="text-gray-600">
                        Valid for <span className="font-semibold text-[var(--brand-primary)]">{formatTime(mobileCountdown)}</span>
                      </span>
                      {mobileResendCooldown > 0 ? null : mobileResendAttempts < MAX_RESEND ? (
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={handleResendMobileOtp}
                            disabled={mobileOtpSending}
                            className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold transition bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-gold)] disabled:opacity-50"
                          >
                            Resend OTP
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-red-600">OTP expired</span>
                      {mobileResendAttempts < MAX_RESEND && (
                        mobileResendCooldown > 0 ? null : (
                          <button
                            type="button"
                            onClick={handleResendMobileOtp}
                            disabled={mobileOtpSending}
                            className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold transition bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-gold)] disabled:opacity-50"
                          >
                            Resend OTP
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {}
            <label className="flex items-center mt-2 cursor-pointer text-xs sm:text-sm select-none">
              <input
                type="checkbox"
                checked={formData.useAsUsername.includes("mobile")}
                onChange={() => handleUsernameToggle("mobile")}
                className="mr-2 accent-[#3e3d3a] w-3 h-3"
              />
              Use as Username
              {formData.useAsUsername.includes("mobile") && (
                <CheckCircleFill className="inline text-[var(--brand-primary)] ml-1" />
              )}
            </label>

            {}
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}
            {errors.useAsUsername && (
              <p className="text-red-500 text-sm mt-1">
                {errors.useAsUsername}
              </p>
            )}
          </div>

          {}
          <div>
            <label className="block font-semibold mb-2 text-sm sm:text-base text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="new-password"
                className={`w-full p-3 pr-12 rounded-md border text-sm ${errors.password ? "border-red-500" : "border-[var(--brand-gold)]"} 
    focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)] transition`}
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}

            {}
            {formData.password &&
              !(
                formData.password.length >= 6 &&
                /[A-Z]/.test(formData.password) &&
                /[a-z]/.test(formData.password) &&
                /[0-9]/.test(formData.password) &&
                /[@$!%*?&#_]/.test(formData.password)
              ) && (
                <div className="mt-2 text-xs sm:text-sm space-y-1">
                  <p
                    className={`${formData.password.length >= 6 ? "text-[var(--brand-primary)]" : "text-gray-500"}`}
                  >
                    • Minimum 6 characters
                  </p>
                  <p
                    className={`${/[A-Z]/.test(formData.password) ? "text-[var(--brand-primary)]" : "text-gray-500"}`}
                  >
                    • At least one uppercase letter
                  </p>
                  <p
                    className={`${/[a-z]/.test(formData.password) ? "text-[var(--brand-primary)]" : "text-gray-500"}`}
                  >
                    • At least one lowercase letter
                  </p>
                  <p
                    className={`${/[0-9]/.test(formData.password) ? "text-[var(--brand-primary)]" : "text-gray-500"}`}
                  >
                    • At least one number
                  </p>
                  <p
                    className={`${/[@$!%*?&#_]/.test(formData.password) ? "text-[var(--brand-primary)]" : "text-gray-500"}`}
                  >
                    • At least one special character (@$!%*?&#_)
                  </p>
                </div>
              )}
          </div>

          {}
          <div>
            <label className="block font-semibold mb-2 text-sm sm:text-base text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                autoComplete="new-password"
                className={`w-full p-3 pr-12 rounded-md border text-sm ${errors.confirmPassword ? "border-red-500" : "border-[var(--brand-gold)]"} 
    focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)] transition`}
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {}
          <div className="flex items-start space-x-2 sm:space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                setErrors((prev) => ({
                  ...prev,
                  termsAccepted: "",
                }));
              }}
              className="w-4 h-4 accent-[var(--brand-accent)] mt-1 flex-shrink-0"
            />
            <label className="text-xs sm:text-sm text-gray-700">
              I agree to the{" "}
              {/* Open Terms in a new tab to preserve form state */}
              <Link
                to="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-700"
              >
                Terms & Conditions
              </Link>
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>
          )}

          {}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-gold)] text-white p-3 rounded-full font-semibold text-sm shadow-lg transition-colors duration-300 
    ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {}
        {showDisclaimer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end sm:items-center z-50 p-0 sm:p-4">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
              {}
              <div className="flex-shrink-0 border-b border-gray-200 px-5 sm:px-8 py-4 sm:py-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  Disclaimer for SATFERA Matrimony
                </h3>
              </div>

              {}
              <div
                className="flex-1 overflow-y-auto px-5 sm:px-8 py-4 sm:py-6"
                style={{
                  maxHeight: "calc(90vh - 180px)",
                }}
              >
                <div className="text-sm sm:text-base text-gray-700 space-y-3 sm:space-y-4 leading-relaxed">
                  <p>
                    By registering on <strong>SATFERA</strong>, you give us
                    permission to use your photos, profile details, and other
                    shared information on our website, mobile application, and
                    for sharing with suitable profiles for matchmaking purposes.
                  </p>
                  <p>
                    You confirm that all personal details provided by you,
                    including name, age, contact number, education, financial
                    details, and any other information, are true, correct, and
                    updated.
                  </p>
                  <p>
                    <strong>SATFERA</strong> is only a matchmaking platform. We
                    do not guarantee marriage, engagement, or confirmation of
                    any relationship.
                  </p>
                  <p>
                    If you are interested in any profile, it is your sole
                    responsibility to verify their past, present, financial
                    capacity, family background, and other necessary details
                    before making any decision. SATFERA is not responsible for
                    the authenticity of users’ claims.
                  </p>
                  <p>
                    SATFERA will not be held responsible for any issues,
                    disputes, frauds, or misunderstandings arising after
                    marriage, engagement, or any personal interactions. We
                    cannot interfere in the personal life of any member.
                  </p>
                  <p>
                    SATFERA strongly advises all members to exercise caution,
                    conduct independent verification, and use their own judgment
                    before sharing personal, financial, or sensitive information
                    with other members.
                  </p>
                  <p>
                    SATFERA does not conduct criminal background checks or
                    financial verifications of its members. Users are
                    responsible for due diligence.
                  </p>
                  <p>
                    SATFERA will not be liable for any loss, damage, fraud, or
                    emotional/financial harm arising out of interactions with
                    other members.
                  </p>
                  <p>
                    Membership fees or charges paid to SATFERA are
                    non-refundable under any circumstances.
                  </p>
                  <p>
                    By using SATFERA, you agree to abide by our Terms &
                    Conditions and Privacy Policy.
                  </p>
                </div>
              </div>

              {}
              <div className="flex-shrink-0 border-t border-gray-200 px-5 sm:px-8 py-4 sm:py-6 flex justify-end bg-white">
                <button
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-white text-sm sm:text-base font-semibold transition shadow-md"
                  onClick={() => setShowDisclaimer(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SignUpPage;
