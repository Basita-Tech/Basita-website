import { Router, Request, Response } from "express";

import { User } from "../models";
import {
  registerPushToken,
  sendNotificationToUser
} from "./NotificationService";

const expoApp = Router();

expoApp.post("/app/save-token", async (req: Request, res: Response) => {
  const { userId, pushToken } = req.body;

  try {
    await registerPushToken(userId, pushToken);
    res.send({ success: true, message: "Token registered successfully" });
  } catch (error: any) {
    console.error("Error saving token:", error);
    res.status(500).send({ error: error.message || "Error saving token" });
  }
});

expoApp.post(
  "/admin/send-mass-notification",
  async (req: Request, res: Response) => {
    const { userIds, title, messageBody, data } = req.body;

    try {
      const promises = userIds.map((id: string) =>
        sendNotificationToUser(id, title, messageBody, data)
      );

      await Promise.all(promises);

      res.send({ success: true, message: "Notifications queued/sent" });
    } catch (error: any) {
      console.error("Mass Send Error:", error.message);
      res.status(500).send({ error: "Failed to send notifications" });
    }
  }
);

export default expoApp;
