import { Request, Response } from "express";
import {
  getOtp,
  incrementAttempt,
  OTP_ATTEMPT_LIMIT
} from "../../../lib/redis/otpRedis";
import { verifyOTPConstantTime } from "../../../utils/timingSafe";
import {
  getEmailFromCache,
  getPhoneFromCache,
  setEmailVerifyCache,
  setPhoneVerifyCache
} from "../../../lib";

type IdentifierType = "email" | "phone";

export async function verifySignupOtp(req: Request, res: Response) {
  try {
    const { email, mobileNumber, countryCode, otp } = req.body;

    if (!email && !mobileNumber) {
      return res.status(400).json({
        success: false,
        message: "Email or mobile number is required"
      });
    }

    const identifier: string = email ?? mobileNumber;
    const type: IdentifierType = email ? "email" : "phone";

    const alreadyVerified =
      type === "email"
        ? await getEmailFromCache(identifier)
        : await getPhoneFromCache(identifier);

    if (alreadyVerified && countryCode !== "+91") {
      await setPhoneVerifyCache(identifier);
      return res.status(200).json({
        success: true,
        message: `${type === "email" ? "Email" : "Phone number"} already verified`
      });
    }

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required"
      });
    }

    const attemptCount = await incrementAttempt(identifier, "signup");
    if (attemptCount > OTP_ATTEMPT_LIMIT) {
      return res.status(429).json({
        success: false,
        message: "Maximum OTP attempts exceeded"
      });
    }

    const redisOtp = await getOtp(identifier, "signup");
    if (!redisOtp) {
      return res.status(410).json({
        success: false,
        message: "OTP expired"
      });
    }

    const isValid = await verifyOTPConstantTime(otp, redisOtp);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    if (type === "email") {
      await setEmailVerifyCache(identifier);
    } else {
      await setPhoneVerifyCache(identifier);
    }

    return res.status(200).json({
      success: true,
      message: `${type === "email" ? "Email" : "Phone number"} verified successfully`
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "OTP verification failed"
    });
  }
}
