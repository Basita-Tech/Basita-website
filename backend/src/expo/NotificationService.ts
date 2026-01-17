import {
  Expo,
  ExpoPushMessage,
  ExpoPushTicket,
  ExpoPushReceipt
} from "expo-server-sdk";
import { User } from "../models";

const expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
  useFcmV1: true
});

export const registerPushToken = async (userId: string, token: string) => {
  if (!Expo.isExpoPushToken(token)) {
    throw new Error(`Invalid Expo push token: ${token}`);
  }

  await User.findByIdAndUpdate(userId, {
    $addToSet: { pushToken: token }
  });
};

export const unregisterPushToken = async (userId: string, token: string) => {
  await User.findByIdAndUpdate(userId, {
    $pull: { pushToken: token }
  });
};

export const sendNotificationToUser = async (
  userId: string,
  title: string,
  body: string,
  data: any = {},
  categoryId?: string
) => {
  try {
    const user = await User.findById(userId).select("pushToken");

    if (!user || !user.pushToken || user.pushToken.length === 0) {
      console.log(`User ${userId} has no push tokens.`);
      return;
    }

    const messages: ExpoPushMessage[] = [];

    for (const token of user.pushToken) {
      if (!Expo.isExpoPushToken(token)) {
        console.error(`Skipping invalid token for user ${userId}: ${token}`);
        continue;
      }

      messages.push({
        to: token,
        sound: "default",
        title,
        body,
        data,
        categoryId,
        priority: "high"
      });
    }

    const chunks = expo.chunkPushNotifications(messages);
    const tickets: ExpoPushTicket[] = [];

    for (let chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error("Error sending chunk:", error);
      }
    }

    await handlePushTickets(tickets, user.pushToken, userId);

    return tickets;
  } catch (error) {
    console.error(`Failed to send notification to user ${userId}:`, error);
  }
};

/**
 * Helper to process tickets and remove invalid tokens from the database.
 * If Expo returns "DeviceNotRegistered", it means the user uninstalled the app.
 */
const handlePushTickets = async (
  tickets: ExpoPushTicket[],
  tokensUsed: string[],
  userId: string
) => {
  const tokensToRemove: string[] = [];

  tickets.forEach((ticket, index) => {
    if (ticket.status === "error") {
      if (ticket.details && ticket.details.error === "DeviceNotRegistered") {
        const badToken = tokensUsed[index];
        if (badToken) {
          tokensToRemove.push(badToken);
        }
      }
    }
  });

  if (tokensToRemove.length > 0) {
    console.log(
      `Removing ${tokensToRemove.length} dead tokens for user ${userId}`
    );
    await User.findByIdAndUpdate(userId, {
      $pull: { pushToken: { $in: tokensToRemove } }
    });
  }
};
