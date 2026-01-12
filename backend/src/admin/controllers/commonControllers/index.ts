import { AuthenticatedRequest, LoginRequest } from "../../../types";
import { Response, Request, CookieOptions } from "express";
import { adminSearchService, commonService } from "../../services";
import { IUser, User } from "../../../models";
import {
  constantTimePasswordValidation,
  constantTimeUserLookup,
  generateJTI,
  TimingSafeAuth
} from "../../../utils/timingSafe";
import { getClientIp } from "../../../utils/ipUtils";
import { SessionService } from "../../../services";
import { logger } from "../../../lib";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { APP_CONFIG } from "../../../utils/constants";
import {
  generateCSRFToken,
  generateDeviceFingerprint
} from "../../../utils/secureToken";
import { sanitizeError } from "../../../middleware/securityMiddleware";

class commonControllers {
  static async getDashboardStatsController(
    req: AuthenticatedRequest,
    res: Response
  ) {
    try {
      const stats = await commonService.getAdminDashboardStats();

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error("Error in getDashboardStatsController:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch dashboard stats" });
    }
  }
}

export { commonControllers };

export async function adminSearchController(req: Request, res: Response) {
  try {
    const page = Math.max(parseInt(String(req.query.page || "1"), 10), 1);
    const limitRequested = parseInt(String(req.query.limit || "25"), 10);
    const limit = Math.min(Math.max(limitRequested, 1), 100);

    const filters = {
      ...req.query,
      page,
      limit
    };

    const result = await adminSearchService(filters);

    return res.json({
      success: true,
      data: result.results,
      pagination: {
        page,
        limit,
        total: result.total,
        hasMore: page * limit < result.total
      }
    });
  } catch (err) {
    console.error("adminSearchController error:", err);
    return res.status(500).json({
      success: false,
      message: "Search failed"
    });
  }
}

function sanitizeUser(user: any) {
  const {
    password,
    __v,
    createdAt,
    updatedAt,
    isEmailLoginEnabled,
    isMobileLoginEnabled,
    ...rest
  } = user;
  return rest;
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password }: LoginRequest = req.body;

    if (!password || !email) {
      return res.status(400).json({
        success: false,
        message: "Email or phone number and password are required"
      });
    }

    let result;
    try {
      result = await loginWithEmail(email, password, req);
    } catch (authError: any) {
      logger.warn(
        `Login failed. Email/Phone: ${email}, IP: ${req.ip}, User Agent: ${req.get("user-agent")}, Reason: ${authError.message}`
      );

      const statusCode = authError.status || 401;
      const responseBody: any = {
        success: false,
        message: authError.message
      };

      if (authError.reason) {
        responseBody.reason = authError.reason;
      }

      return res.status(statusCode).json(responseBody);
    }

    const userObj = result.user.toObject ? result.user.toObject() : result.user;
    const publicUser = sanitizeUser(userObj) as any;

    const isProduction = process.env.NODE_ENV === "production";

    const tokenCookieOptions: CookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: APP_CONFIG.COOKIE_MAX_AGE,
      path: "/",
      domain: "admin.satfera.in"
    };

    res.cookie("token", result.token, tokenCookieOptions);

    if (isProduction) {
      logger.info(
        `Cookie set in production: domain: admin.satfera.in, secure: ${tokenCookieOptions.secure}, sameSite: ${tokenCookieOptions.sameSite}, httpOnly: ${tokenCookieOptions.httpOnly}, maxAge: ${tokenCookieOptions.maxAge}`
      );
    }

    const csrfToken = generateCSRFToken();

    const csrfCookieOptions: CookieOptions = {
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: APP_CONFIG.COOKIE_MAX_AGE,
      path: "/",
      domain: "admin.satfera.in"
    };

    res.cookie("csrf_token", csrfToken, csrfCookieOptions);

    if (!isProduction) {
      logger.info(`CSRF cookie set (dev): ${csrfCookieOptions}`);
    }

    logger.info("Successful login", {
      userId: publicUser.id,
      email: email,
      ip: req.ip,
      isNewSession: result.isNewSession
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: publicUser,
      redirectTo: "/dashboard"
    });
  } catch (err: any) {
    logger.error("Login error", {
      error: err.message,
      stack: err.stack,
      ip: req.ip
    });

    if (err.message && err.message !== "An error occurred") {
      return res.status(err.status || 401).json({
        success: false,
        message: err.message
      });
    }

    const sanitized = sanitizeError(err);
    return res.status(sanitized.status).json({
      success: false,
      message: sanitized.message
    });
  }
}

async function loginWithEmail(
  email: string,
  password: string,
  req: Request
): Promise<{ user: IUser; token: string; isNewSession: boolean }> {
  const timingSafe = new TimingSafeAuth(250);

  if (!email || !password) {
    return await timingSafe.fail(new Error("Email and password are required"));
  }

  const user = await constantTimeUserLookup<IUser>(
    () =>
      User.findOne({
        email: email.toLowerCase(),
        role: "admin"
      }).select("password lastLoginAt _id role"),
    100
  );

  if (!user && user.role !== "admin") {
    return await timingSafe.fail(new Error("Invalid credentials"));
  }

  const isPasswordValid = await constantTimePasswordValidation(
    async () => await bcrypt.compare(password, user.password),
    150
  );

  if (!isPasswordValid) {
    return await timingSafe.fail(new Error("Invalid credentials"));
  }

  const userId = String(user._id);
  const ipAddress = getClientIp(req);

  const existingSession = await SessionService.findExistingSession(
    userId,
    req,
    ipAddress
  );

  let token: string;
  let isNewSession: boolean;

  if (existingSession) {
    token = existingSession.token;
    isNewSession = false;

    await SessionService.updateSessionActivity(String(existingSession._id));

    logger.info(`Reusing existing session for user ${userId} on ${ipAddress}`);
  } else {
    const jti = generateJTI();
    token = jwt.sign(
      {
        id: userId,
        email: user.email,
        jti,
        iat: Math.floor(Date.now() / 1000)
      },
      this.jwtSecret(),
      {
        expiresIn: "30d"
      }
    );

    const fingerprint = generateDeviceFingerprint(
      req.get("user-agent") || "",
      ipAddress
    );

    await SessionService.createSession(
      userId,
      token,
      jti,
      req,
      ipAddress,
      APP_CONFIG.COOKIE_MAX_AGE,
      fingerprint
    );
    isNewSession = true;
  }

  user.lastLoginAt = new Date();
  await user.save();

  return await timingSafe.complete({ user, token, isNewSession });
}
