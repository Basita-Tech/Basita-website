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
import { issueLoginSession } from "../../utils/utils";

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

      return res.status(201).json({
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

    const sigHash = hash ? hash : "www.satfera.in";

    const otp = generateSecureOTP(6);
    await setOtp(phoneNumber, otp, "signup");
    await incrementResend(phoneNumber, "signup");

    const message = `Your Satfera OTP is ${otp}. Kindly do not share it with anyone.
${sigHash}`;

    const baseApiUrl = `https://ui.netsms.co.in/API/SendSMS.aspx?APIkey=${SMS_API_KEY}&SenderID=${SMS_SENDER_ID}&SMSType=4&Mobile=${phoneNumber}&MsgText=${encodeURIComponent(message)}&EntityID=${SMS_ENTITY_ID}&TemplateID=${SMS_TEMPLATE_ID}`;

    await fetch(baseApiUrl);

    res.status(201).json({
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
  const { countryCode, phoneNumber, code, type } = req.body;

  if (!phoneNumber || !code) {
    return res.status(400).json({
      success: false,
      message: "Phone number and OTP are required"
    });
  }

  const timingSafe = new TimingSafeAuth(200);
  const mobile = `${countryCode}${phoneNumber}`;

  try {
    const user = await constantTimeUserLookup<IUser>(
      () =>
        User.findOne({
          phoneNumber: mobile,
          isDeleted: false
        }),
      100
    );

    if (!user) {
      return timingSafe.fail(new Error("User not found"));
    }
    if (type !== "sms_login") {
      if (user.isPhoneVerified) {
        return res.status(200).json({
          success: true,
          message: "Phone number already verified",
          user
        });
      }
    }

    const attemptCount = await incrementAttempt(phoneNumber, "signup");
    if (attemptCount > OTP_ATTEMPT_LIMIT) {
      return timingSafe.fail(new Error("Maximum OTP attempts exceeded"));
    }

    const redisOtp = await getOtp(phoneNumber, "signup");
    if (!redisOtp) {
      return timingSafe.fail(new Error("OTP expired"));
    }

    const isValid = await verifyOTPConstantTime(code, redisOtp);

    if (!isValid) {
      await incrementAttempt(mobile, "signup");
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    user.isPhoneVerified = true;
    await user.save();

    if (user.isEmailVerified && user.isPhoneVerified) {
      const token = await issueLoginSession(user, req, res);

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

      return res.status(200).json({
        success: true,
        message: "Phone verified successfully",
        token,
        user
      });
    }

    return res.status(200).json({
      success: true,
      message: "Phone verified successfully. Please verify your email.",
      user
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to verify OTP"
    });
  }
}

export { sendOtp, verifyOtp };
