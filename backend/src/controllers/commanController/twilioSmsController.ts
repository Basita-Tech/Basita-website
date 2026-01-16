import { Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../../types";
import { IUser, User } from "../../models";
import { enqueueWelcomeEmail } from "../../lib/queue/enqueue";
import { logger } from "../../lib/common";
import {
  getOtp,
  getResendCount,
  incrementAttempt,
  incrementResend,
  OTP_ATTEMPT_LIMIT,
  OTP_RESEND_LIMIT,
  setOtp
} from "../../lib/redis/otpRedis";

import {
  constantTimeUserLookup,
  generateSecureOTP,
  TimingSafeAuth,
  verifyOTPConstantTime
} from "../../utils/timingSafe";

const SMS_API_KEY = process.env.SMS_API_KEY || "";
const SMS_SENDER_ID = process.env.SMS_SENDER_ID || "";
const SMS_ENTITY_ID = process.env.SMS_ENTITY_ID || "";
const SMS_TEMPLATE_ID = process.env.SMS_TEMPLATE_ID || "";

async function sendOtp(req: AuthenticatedRequest, res: Response) {
  const { countryCode, phoneNumber, hash } = req.body;
  try {
    if (!phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is required" });
    }
    if (!countryCode) {
      return res
        .status(400)
        .json({ success: false, message: "country Code is required" });
    }

    if (countryCode !== "+91") {
      const mobileNumber = `${countryCode}${phoneNumber}`;

      const user = await User.findOne({
        phoneNumber: mobileNumber,
        isDeleted: false
      });
      user.isPhoneVerified = true;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Phone verified successfully"
      });
    }

    const resendCount = await getResendCount(phoneNumber, "signup");
    if (resendCount >= OTP_RESEND_LIMIT) {
      return res.status(429).json({
        success: false,
        message: "OTP resend limit reached for today. Try again tomorrow."
      });
    }

    const sigHash = hash ? hash : "Satfera";

    const otp = generateSecureOTP(6);
    await setOtp(phoneNumber, otp, "signup");
    await incrementResend(phoneNumber, "signup");

    const baseApiUrl = `https://ui.netsms.co.in/API/SendSMS.aspx?APIkey=${SMS_API_KEY}&SenderID=${SMS_SENDER_ID}&SMSType=4&Mobile=${phoneNumber}&MsgText=Your Satfera OTP is ${otp}. Kindly do not share it with anyone. \n${sigHash}&EntityID=${SMS_ENTITY_ID}&TemplateID=${SMS_TEMPLATE_ID}`;

    await fetch(baseApiUrl);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully"
    });
  } catch (error: any) {
    console.error("Error sending OTP:", error);

    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to send OTP"
    });
  }
}

async function verifyOtp(req: AuthenticatedRequest, res: Response) {
  const { countryCode, phoneNumber, code } = req.body;
  try {
    if (!phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is required" });
    }

    if (!code) {
      return res
        .status(400)
        .json({ success: false, message: "OTP code is required" });
    }

    const timingSafe = new TimingSafeAuth(200);

    const mobileNumber = `${countryCode}${phoneNumber}`;

    const user = await constantTimeUserLookup<IUser>(
      () =>
        User.findOne({
          phoneNumber: mobileNumber,
          isDeleted: false
        }),
      100
    );

    if (!user) {
      return await timingSafe.fail(new Error("User not found"));
    }

    const attemptCount = await incrementAttempt(phoneNumber, "signup");
    if (attemptCount > OTP_ATTEMPT_LIMIT) {
      return await timingSafe.fail(
        new Error(
          `Maximum OTP verification attempts (${OTP_ATTEMPT_LIMIT}) reached. Please request a new OTP or try again after 24 hours.`
        )
      );
    }

    const redisOtp = await getOtp(phoneNumber, "signup");
    if (!redisOtp) {
      return await timingSafe.fail(
        new Error(
          "OTP has expired. OTPs are valid for 5 minutes. Please request a new one."
        )
      );
    }

    const isValid = await verifyOTPConstantTime(code, redisOtp);
    if (!isValid) {
      const remainingAttempts = OTP_ATTEMPT_LIMIT - attemptCount;
      return await timingSafe.fail(
        new Error(
          `Invalid OTP. You have ${remainingAttempts} attempt${
            remainingAttempts !== 1 ? "s" : ""
          } remaining.`
        )
      );
    }

    const verificationCheck = "";

    if (user.isPhoneVerified) {
      return res.status(200).json({
        success: true,
        message: "Phone number is already verified",
        data: verificationCheck
      });
    }

    if (!user.isPhoneVerified) {
      user.isPhoneVerified = true;
      await user.save();

      if (user.isEmailVerified && !user.welcomeSent) {
        try {
          const username = user.email || user.phoneNumber || "";
          const loginLink = `${process.env.FRONTEND_URL || ""}/login`;

          const enqueued = await enqueueWelcomeEmail(
            user._id as any,
            {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              username
            },
            loginLink
          );

          if (enqueued) {
            user.welcomeSent = true;
            await user.save();
            logger.info(`Welcome email queued for ${user.email}`);
          } else {
            logger.error(`Failed to queue welcome email for ${user.email}`);
          }
        } catch (e) {
          logger.error(`Failed to queue welcome email for ${user.email}:`, e);
        }
      }
    }

    // if (verificationCheck.status === "pending") {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid OTP code"
    //   });
    // }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET environment variable is required");
    }

    if (user.isEmailVerified && user.isPhoneVerified) {
      const token = jwt.sign({ id: user._id }, secret, {
        expiresIn: "30d"
      });

      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        data: { token, user }
      });
    }

    return res.status(200).json({
      success: true,
      message: "Phone verified successfully",
      data: verificationCheck
    });
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    // If Twilio returns resource-not-found for verification check, give clearer guidance
    if (error?.code === 20404 || error?.status === 404) {
      return res.status(400).json({
        success: false,
        message:
          "Twilio Verify Service or VerificationCheck resource not found. Check TWILIO_VERIFY_SERVICE_SID, TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN (they must be for the same Twilio account).",
        hint: "If you recently created the Verify Service, ensure its SID (starts with 'VA...') is correct and that the credentials used belong to the same Twilio account."
      });
    }

    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to verify OTP"
    });
  }
}

export { sendOtp, verifyOtp };
