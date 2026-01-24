import { AuthenticatedRequest, Role } from "../../../types";
import { Response, Request } from "express";
import { adminSearchService, commonService } from "../../services";
import { Profile, User } from "../../../models";
import bcrypt from "bcryptjs";

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

export const getStaffUsersController = async (req: Request, res: Response) => {
  const staffRoles: Role[] = ["admin", "verification", "support", "account"];

  const users = await User.find({ role: { $in: staffRoles } }).select(
    "firstName lastName role isActive isDeleted email lastLoginAt"
  );

  res.json({
    success: true,
    data: users
  });
};

export const createUserController = async (req: Request, res: Response) => {
  const {
    email,
    password,
    firstName,
    lastName,
    role,
    phoneNumber
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    name: string;
    role?: Role;
    phoneNumber: string;
  } = req.body;

  const allowedRoles: Role[] = ["admin", "verification", "support", "account"];

  if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role"
    });
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { phoneNumber }]
  });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User already exists"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    isActive: true,
    isDeleted: false,
    isEmailLoginEnabled: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    welcomeSent: true,
    for_Profile: "myself",
    gender: "male",
    phoneNumber: phoneNumber,
    pushToken: "pushToken"
  });

  await Profile.create({ userId: user.id });

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
};

export const removeUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  if (user.isDeleted) {
    return res.status(400).json({
      success: false,
      message: "User already deleted"
    });
  }

  user.isActive = false;
  user.isVisible = false;
  user.isDeleted = true;
  user.deletedAt = new Date();
  user.deletionReason = "Admin delete";

  await user.save();

  res.json({
    success: true,
    message: "User soft-deleted successfully"
  });
};

export const restoreUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await User.findOne({ _id: userId, isDeleted: true });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Deleted user not found"
    });
  }

  user.isDeleted = false;
  user.isActive = true;
  user.isVisible = true;
  user.deletedAt = undefined;
  user.deletionReason = undefined;

  await user.save();

  res.json({
    success: true,
    message: "User restored successfully"
  });
};
