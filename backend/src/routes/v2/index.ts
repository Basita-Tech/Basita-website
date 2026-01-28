import express from "express";
import recommendationRouterV2 from "../../controllers/userController/v2";
import { getPreSignedUrl } from "../../controllers/getPreSignedUrl";
import authenticate from "../../middleware/authMiddleware";
import { asyncHandler } from "../../utils/utils";
import { updatePhotoController } from "../../controllers/userController/v2/uploadPhoto";
import { otpGatewayLimiter } from "../../middleware/redisRateLimiter";
import { verifySignupOtp } from "../../controllers/userController/v2/v2";

const apiV2 = express();

apiV2.use("/", recommendationRouterV2);

apiV2.get("/pre-signed-url", authenticate, asyncHandler(getPreSignedUrl));

apiV2.put("/upload/photos", authenticate, asyncHandler(updatePhotoController));

apiV2.post("/verify-otp", otpGatewayLimiter, asyncHandler(verifySignupOtp));

export default apiV2;
