import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getQueueStats, logger } from "../../lib";
import authenticate from "../../middleware/authMiddleware";
import * as adminController from "../controllers";
import { commonControllers } from "../controllers/commonControllers";
import { asyncHandler, authorizeRoles } from "../../utils/utils";
import { getSystemHealth } from "../controllers/systemControllers";
import { SupportController } from "../controllers/commonControllers/supportController";
import adminAuditMiddleware from "../../middleware/adminAuditMiddleware";
import {
  createEmailTemplateValidation,
  updateEmailTemplateValidation,
  createOrUpdatePricingConfigValidation,
  updateUserProfileValidation
} from "../../validation";

import { getAuditLogsController } from "../controllers/auditController";
const adminRouter = express();

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: Function
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array()
    });
  }
  next();
};

// temp route
adminRouter.get("/queue-stats", async (req: Request, res: Response) => {
  try {
    const stats = await getQueueStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    logger.error("Error fetching queue stats:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch queue stats" });
  }
});

adminRouter.use(adminAuditMiddleware);

adminRouter.post(
  "/account/restore",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.restoreAccountController)
);

adminRouter.delete(
  "/account/hard-delete",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.hardDeleteAccountController)
);

adminRouter.post(
  "/account/delete",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.softDeleteAccountController)
);

adminRouter.get(
  "/accounts/deleted",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.getDeletedAccountsController)
);

adminRouter.get(
  "/dashboard/stats",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(commonControllers.getDashboardStatsController)
);

adminRouter.post(
  "/approve/profile",
  authenticate,
  authorizeRoles("admin", "verification"),
  asyncHandler(adminController.approveUserProfileController)
);

adminRouter.post(
  "/reject/profile",
  authenticate,
  authorizeRoles("admin", "verification"),
  asyncHandler(adminController.rejectUserProfileController)
);

adminRouter.post(
  "/rectify/profile",
  authenticate,
  authorizeRoles("admin", "verification"),
  asyncHandler(adminController.rectifyUserProfileController)
);

adminRouter.get(
  "/profiles/all/premiums",
  authenticate,
  authorizeRoles("admin", "account"),
  asyncHandler(adminController.getAllPremiumsProfilesController)
);

adminRouter.get(
  "/profiles/pending",
  authenticate,
  authorizeRoles("admin", "verification"),
  asyncHandler(adminController.getPendingProfilesController)
);

adminRouter.get(
  "/profile/verify/:userId",
  authenticate,
  authorizeRoles("admin", "verification"),
  asyncHandler(adminController.verifiedProfilesController)
);

adminRouter.get(
  "/profile/unverify/:userId",
  authenticate,
  authorizeRoles("admin", "verification"),
  asyncHandler(adminController.unVerifiedProfilesController)
);

adminRouter.get(
  "/all/profiles",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.getAllProfilesController)
);

adminRouter.get(
  "/profile/:userId",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.getUserProfileDetailsController)
);

adminRouter.put(
  "/profile/:userId",
  authenticate,
  authorizeRoles("admin"),
  updateUserProfileValidation,
  handleValidationErrors,
  asyncHandler(adminController.updateUserProfileDetailsController)
);

adminRouter.get(
  "/analytics",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.getReportsAndAnalyticsController)
);

adminRouter.get(
  "/request-sent",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.getAllRequestsController)
);

adminRouter.post(
  "/request-sent/:id/reminder",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.sendRequestReminder)
);

adminRouter.get(
  "/super-profiles",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.getSuperProfiles)
);

adminRouter.post(
  "/user/change-password",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.changeUserPassword)
);

adminRouter.get(
  "/system/health",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(getSystemHealth)
);

adminRouter.get(
  "/reports",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.getReportsController)
);

adminRouter.put(
  "/reports",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.updateReportStatusController)
);

adminRouter.get(
  "/support/tickets",
  authenticate,
  authorizeRoles("admin", "support"),
  asyncHandler(SupportController.getAllTickets)
);

adminRouter.get(
  "/support/tickets/:id",
  authorizeRoles("admin", "support"),
  asyncHandler(SupportController.getTicketDetails)
);

adminRouter.patch(
  "/support/tickets/:id/status",
  authorizeRoles("admin", "support"),
  asyncHandler(SupportController.updateStatus)
);

adminRouter.post(
  "/support/tickets/:id/messages",
  authorizeRoles("admin", "support"),
  asyncHandler(SupportController.addMessage)
);

adminRouter.get("/search", asyncHandler(adminController.adminSearchController));

adminRouter.get(
  "/email-templates",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.getEmailTemplatesController)
);

adminRouter.get(
  "/email-templates/:id",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.getEmailTemplateByIdController)
);

adminRouter.post(
  "/email-templates",
  authenticate,
  authorizeRoles("admin"),
  createEmailTemplateValidation,
  handleValidationErrors,
  asyncHandler(adminController.createEmailTemplateController)
);

adminRouter.put(
  "/email-templates/:id",
  authenticate,
  authorizeRoles("admin"),
  updateEmailTemplateValidation,
  handleValidationErrors,
  asyncHandler(adminController.updateEmailTemplateController)
);

adminRouter.delete(
  "/email-templates/:id",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.deleteEmailTemplateController)
);

adminRouter.get(
  "/pricing-configs",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.getPricingConfigsController)
);

adminRouter.get(
  "/pricing-configs/:id",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.getPricingConfigByIdController)
);

adminRouter.post(
  "/pricing-configs",
  authenticate,
  authorizeRoles("admin"),
  createOrUpdatePricingConfigValidation,
  handleValidationErrors,
  asyncHandler(adminController.createOrUpdatePricingConfigController)
);

adminRouter.delete(
  "/pricing-configs/:id",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.deletePricingConfigController)
);

adminRouter.get("/audits", authenticate, asyncHandler(getAuditLogsController));

adminRouter.post(
  "/account/deactivate",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.deactivateAccountController)
);

adminRouter.post(
  "/account/activate",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.activateAccountController)
);

adminRouter.get(
  "/bulk/email",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.getBulkEmailUsersController)
);

adminRouter.post(
  "/bulk/email",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.bulkEmailController)
);

adminRouter.get(
  "/users/staff",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.getStaffUsersController)
);

adminRouter.post(
  "/create/staff",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.createUserController)
);

adminRouter.put(
  "/staff/:userId",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.removeUserController)
);

adminRouter.put(
  "/staff/active/:userId",
  authenticate,
  authorizeRoles("admin"),
  asyncHandler(adminController.restoreUserController)
);

export default adminRouter;
