import {
  Expo,
  ExpoPushMessage,
  ExpoPushTicket,
  ExpoPushReceipt
} from "expo-server-sdk";
import { Router, Request, Response } from "express";
import { User } from "../models";

const expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
  useFcmV1: true
});

const expoApp = Router();

expoApp.post("/app/save-token", async (req: Request, res: Response) => {
  const { userId, pushToken } = req.body;

  if (!Expo.isExpoPushToken(pushToken)) {
    return res.status(400).send({
      error: `Push token ${pushToken} is not a valid Expo push token`
    });
  }

  try {
    await User.findByIdAndUpdate(
      userId,
      { pushToken: pushToken },
      { new: true }
    );

    console.log(`Saved token for user ${userId}`);
    res.send({ success: true });
  } catch (error) {
    console.error("Error saving token:", error);
    res.status(500).send({ error: "Error saving token" });
  }
});

expoApp.post(
  "/admin/send-mass-notification",
  async (req: Request, res: Response) => {
    const { userIds, title, messageBody, data } = req.body;

    try {
      const users = await User.find({
        _id: { $in: userIds },
        pushToken: { $exists: true, $ne: null }
      });

      if (!users.length)
        return res.status(404).send({ error: "No users found with tokens" });

      const messages: ExpoPushMessage[] = users
        .filter((u) => Expo.isExpoPushToken(u.pushToken))
        .map((u) => ({
          to: u.pushToken!,
          sound: "default",
          title: title || "New Notification",
          body: messageBody || " ",
          priority: "high",
          channelId: "default",
          data: typeof data === "string" ? JSON.parse(data) : data || {}
        }));

      if (!messages.length)
        return res.status(400).send({ error: "No valid tokens to send to" });

      const tickets = await sendInChunks(messages);
      console.log("Push Tickets:", tickets);

      res.send({ success: true, tickets });
    } catch (error: any) {
      console.error("Mass Send Error:", error.message);
      res.status(500).send({ error: "Failed to send notifications" });
    }
  }
);

const sendInChunks = async (
  messages: ExpoPushMessage[]
): Promise<ExpoPushTicket[]> => {
  let chunks = expo.chunkPushNotifications(messages);
  let tickets: ExpoPushTicket[] = [];

  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error("Chunk Error:", error);
    }
  }
  return tickets;
};

export default expoApp;
