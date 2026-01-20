import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Mail, Phone } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  requestEmailChange,
  verifyEmailChange,
  requestPhoneChange,
  verifyPhoneChange,
} from "../api/auth";
export function EditContactModal({
  open,
  onOpenChange,
  contactType,
  currentValue,
  onSave,
}) {
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  useEffect(() => {
    if (open) {
      setValue(currentValue || "");
      setOtp("");
      setIsOtpSent(false);
      setError("");
      setCountdown(0);
    }
  }, [open, currentValue]);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  const validateInput = () => {
    if (contactType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError("Please enter a valid email address");
        return false;
      }
    } else if (contactType === "phone") {
      const phoneRegex = /^[+]?[0-9]{10,15}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ""))) {
        setError("Please enter a valid phone number");
        return false;
      }
    }
    setError("");
    return true;
  };
  const handleSendOtp = async () => {
    if (!validateInput()) return;
    setIsLoading(true);
    try {
      let response;
      if (contactType === "email") {
        response = await requestEmailChange(value);
      } else if (contactType === "phone") {
        response = await requestPhoneChange(value);
      }
      if (response?.success) {
        setIsOtpSent(true);
        setCountdown(300);
        toast.success(
          response.message ||
            `OTP sent to ${contactType === "email" ? "email" : "phone number"}`,
        );
      } else {
        setError(response?.message || "Failed to send OTP");
        toast.error(
          response?.message || "Failed to send OTP. Please try again.",
        );
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleVerifyAndSave = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    setIsLoading(true);
    try {
      let response;
      if (contactType === "email") {
        response = await verifyEmailChange(value, otp);
      } else if (contactType === "phone") {
        response = await verifyPhoneChange(value);
      }
      if (response?.success) {
        toast.success(
          response.message ||
            `${contactType === "email" ? "Email" : "Phone number"} updated successfully`,
        );
        onSave(value);
        onOpenChange(false);
      } else {
        setError(response?.message || "Verification failed");
        toast.error(response?.message || "Invalid OTP or verification failed");
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      setError("Verification failed. Please try again.");
      toast.error("Invalid OTP or verification failed");
    } finally {
      setIsLoading(false);
    }
  };
  const isEmail = contactType === "email";
  const Icon = isEmail ? Mail : Phone;
  const title = isEmail ? "Update Email Address" : "Update Mobile Number";
  const placeholder = isEmail
    ? "Enter new email address"
    : "Enter new mobile number";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showClose={true}
        className="
      sm:max-w-[420px]
      max-w-[90vw]
      p-0
      gap-0
      rounded-[20px]
      bg-gold
      shadow-2xl
      border border-border-subtle
      overflow-hidden
    "
      >
        <div className="relative bg-gradient-to-br from-gold via-gold/90 to-gold/80 px-5 py-4 text-center text-white border-b border-gold/20">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Icon className="w-8 h-8 text-white" />
          </div>

          <DialogHeader>
            <DialogTitle className="text-xl text-white">{title}</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-white/90 mt-1">
            Verify your new {isEmail ? "email" : "number"} with OTP
          </p>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-5 bg-white">
          {/* Contact input */}
          <div className="space-y-2">
            <Label htmlFor="contactValue" className="text-sm font-medium">
              {isEmail ? "New Email Address" : "New Mobile Number"}
            </Label>

            <Input
              id="contactValue"
              type={isEmail ? "email" : "tel"}
              value={value}
              disabled={isOtpSent}
              onChange={(e) => {
                setValue(e.target.value);
                setError("");
              }}
              placeholder={placeholder}
              className={`rounded-xl border-border-subtle ${
                error && !isOtpSent ? "border-red-accent" : ""
              }`}
            />

            {error && !isOtpSent && (
              <p className="text-xs text-red-accent">{error}</p>
            )}
          </div>

          {/* OTP section */}
          {isOtpSent && (
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-medium">
                Enter OTP
              </Label>

              <Input
                id="otp"
                inputMode="numeric"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                  setError("");
                }}
                placeholder="••••••"
                className={`rounded-xl text-center text-lg tracking-widest ${
                  error ? "border-red-accent" : "border-border-subtle"
                }`}
              />

              {error && <p className="text-xs text-red-accent">{error}</p>}

              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>OTP sent to {isEmail ? "email" : "number"}</span>

                {countdown > 0 ? (
                  <span>Resend in {countdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    className="text-gold hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Footer actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="flex-1 rounded-xl h-11"
            >
              Cancel
            </Button>

            {isOtpSent ? (
              <Button
                type="button"
                onClick={handleVerifyAndSave}
                disabled={isLoading || otp.length !== 6}
                className="flex-1 bg-gold hover:bg-gold/90 text-white rounded-xl h-11"
              >
                {isLoading ? "Verifying..." : "Verify & Save"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSendOtp}
                disabled={isLoading || !value}
                className="flex-1 bg-gold hover:bg-gold/90 text-white rounded-xl h-11"
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
