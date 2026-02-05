import { Router } from "express";
import * as connectionController from "../../../../controllers/userController/connectionController";
import authenticate from "../../../../middleware/authMiddleware";
import { asyncHandler } from "../../../../utils/utils";
import { requireActivePlan } from "../../../../middleware/requireActivePlan";

const requestRouter = Router();

requestRouter.get("/all", authenticate, connectionController.getSentRequests);

requestRouter.get(
  "/all/received",
  authenticate,
  asyncHandler(connectionController.getReceivedRequests)
);

requestRouter.post(
  "/send",
  authenticate,
  requireActivePlan,
  asyncHandler(connectionController.sendConnectionRequest)
);
requestRouter.post(
  "/accept",
  authenticate,
  requireActivePlan,
  asyncHandler(connectionController.acceptConnectionRequest)
);

requestRouter.post(
  "/reject",
  authenticate,
  requireActivePlan,
  asyncHandler(connectionController.rejectConnectionRequest)
);

requestRouter.post(
  "/accepted/reject",
  authenticate,
  requireActivePlan,
  asyncHandler(connectionController.rejectAcceptedConnection)
);

requestRouter.post(
  "/rejected/accept",
  authenticate,
  requireActivePlan,
  asyncHandler(connectionController.acceptRejectedConnection)
);

requestRouter.get(
  "/approve",
  authenticate,
  requireActivePlan,
  asyncHandler(connectionController.getApprovedConnections)
);

requestRouter.post(
  "/withdraw",
  authenticate,
  asyncHandler(connectionController.withdrawConnection)
);

requestRouter.get(
  "/favorites",
  authenticate,
  asyncHandler(connectionController.getFavorites)
);

requestRouter.post(
  "/favorites/add",
  authenticate,
  requireActivePlan,
  asyncHandler(connectionController.addToFavorites)
);

requestRouter.post(
  "/favorites/remove",
  authenticate,
  requireActivePlan,
  asyncHandler(connectionController.removeFromFavorites)
);

export default requestRouter;
