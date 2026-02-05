import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../types";
import { User } from "../models";

export const requireActivePlan = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }

  const user = await User.findById(userId).select("planExpiry role isVisible");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found"
    });
  }

  const PLAN_REQUIRED_ROLES = ["user"];

  if (!PLAN_REQUIRED_ROLES.includes(user.role)) {
    return next();
  }

  if (user.planExpiry && new Date(user.planExpiry) < new Date()) {
    if (user.deactivationReason !== "plan_expired") {
      await User.findByIdAndUpdate(userId, {
        deactivatedAt: new Date(),
        deactivationReason: "plan_expired"
      });
    }

    return res.status(402).json({
      success: false,
      code: "PLAN_UPGRADE",
      message: "Your plan has expired. Please upgrade to continue."
    });
  }

  next();
};
