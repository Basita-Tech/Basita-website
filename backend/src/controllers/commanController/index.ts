import { logger } from "../../lib";
import { PricingConfig } from "../../models/PricingConfig";

export * from "./notificationControllers";
export * from "./recommendationController";
export * from "./twilioSmsController";

export async function getPricingConfigsService(req, res) {
  try {
    const configs = await PricingConfig.find().sort({ createdAt: -1 }).lean();

    return res.status(200).json({
      success: true,
      data: configs
    });
  } catch (error: any) {
    logger.error("Error fetching pricing configs:", {
      error: error.message,
      stack: error.stack
    });
    throw new Error("Failed to fetch pricing configs");
  }
}
