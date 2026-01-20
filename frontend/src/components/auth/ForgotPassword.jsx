import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { forgotPassword, verifyEmailOtp } from "@/api/auth";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("input"); // 'input' | 'otp' | 'success'
  const [otpExpiry, setOtpExpiry] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Countdown Timer logic
  useEffect(() => {
    let timer;
    if (otpExpiry > 0) {
      timer = setInterval(() => {
        setOtpExpiry((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpExpiry]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPassword(email.toLowerCase());
      if (res.success) {
        toast.success(res.message || "OTP sent successfully!");
        setStep("otp");
        setOtpExpiry(180); // 3 minutes
      } else {
        toast.error(res.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otpExpiry <= 0) {
      setError("OTP Expired. Please resend.");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyEmailOtp({
        otp,
        email: email.toLowerCase(),
        type: "forgot-password",
      });

      if (res.success) {
        toast.success(res.data?.message || "OTP Verified Successfully!");
        setStep("success");
      } else {
        toast.error(res.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const maskEmail = (str) => {
    const [user, domain] = str.split("@");
    return `${user[0]}****@${domain}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* STEP 1: Email Input */}
        {step === "input" && (
          <>
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Forgot Password
            </h3>
            <p className="text-center text-gray-500 mb-8 text-sm">
              Enter your email address to receive a verification code.
            </p>

            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 mt-1 rounded-xl border border-gray-200 focus:border-[#D4A052] focus:ring-2 focus:ring-[#D4A052]/20 outline-none transition-all"
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs italic ml-1">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#D4A052] text-white font-bold hover:bg-[#B3863F] transition-all disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
            </form>
          </>
        )}

        {/* STEP 2: OTP Verification */}
        {step === "otp" && (
          <>
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Verify your Email
            </h3>
            <p className="text-gray-500 text-center mb-8 text-sm">
              We've sent a code to{" "}
              <span className="font-medium text-gray-700">
                {maskEmail(email)}
              </span>
            </p>

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4A052] focus:ring-2 focus:ring-[#D4A052]/20 text-center text-xl tracking-widest outline-none transition-all"
              />

              <button
                type="submit"
                disabled={loading || otpExpiry <= 0}
                className="w-full py-3 rounded-xl bg-[#D4A052] text-white font-bold hover:bg-[#B3863F] transition-all disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <div className="text-center mt-6">
              {otpExpiry > 0 ? (
                <p className="text-gray-400 text-xs">
                  Resend code in{" "}
                  <span className="text-gray-600 font-bold">
                    {Math.floor(otpExpiry / 60)}:
                    {(otpExpiry % 60).toString().padStart(2, "0")}
                  </span>
                </p>
              ) : (
                <button
                  onClick={handleSendOtp}
                  className="text-[#D4A052] text-sm font-bold hover:underline"
                >
                  Didn't get the code? Resend
                </button>
              )}
            </div>
          </>
        )}

        {/* STEP 3: Success Message */}
        {step === "success" && (
          <div className="text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Check your Inbox
            </h3>
            <p className="text-gray-500 mb-8 text-sm">
              Verification successful! A password reset link has been sent to
              your email address.
            </p>
            <button
              onClick={() => window.open(`mailto:${email}`)}
              className="w-full py-3 rounded-xl bg-[#D4A052] text-white font-bold hover:bg-[#B3863F] transition-all"
            >
              Open Email App
            </button>
          </div>
        )}

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <Link
            to="/login"
            className="text-sm text-gray-500 hover:text-[#D4A052] font-semibold transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
