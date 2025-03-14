import * as Notifications from "expo-notifications";
import { Platform, Linking } from "react-native";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { NotificationType } from "./types";
import { api } from "../api/api";

export const getDeviceId = () => Device.deviceName || "unknown";

// Configure how notifications are presented when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    const data = notification.request.content.data;

    // Default presentation options
    const defaultOptions = {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };

    // Customize based on notification type
    switch (data.type as NotificationType) {
      case NotificationType.CHAT_MESSAGE:
        return {
          ...defaultOptions,
          shouldPlaySound: true,
          shouldSetBadge: true,
          // Group chat messages by challenge
          iOS: {
            threadId: `chat_${data.challengeId}`,
            categoryIdentifier: "chat",
          },
          android: {
            channelId: "chat",
            color: "#007AFF",
          },
        };

      case NotificationType.CHALLENGE_JOIN_REQUEST:
      case NotificationType.CHALLENGE_JOIN_RESPONSE:
        return {
          ...defaultOptions,
          shouldPlaySound: true,
          android: {
            channelId: "challenge_membership",
            color: "#34C759",
          },
        };

      case NotificationType.WEEKLY_LEADERBOARD:
      case NotificationType.LEADERBOARD_POSITION_CHANGE:
        return {
          ...defaultOptions,
          shouldPlaySound: false, // Less intrusive for async updates
          android: {
            channelId: "leaderboard",
            color: "#FF9500",
          },
        };

      case NotificationType.SUPPORT_TICKET_CREATED:
      case NotificationType.SUPPORT_TICKET_MESSAGE:
      case NotificationType.SUPPORT_TICKET_STATUS_CHANGE:
        return {
          ...defaultOptions,
          shouldPlaySound: true,
          shouldSetBadge: true,
          // Group support ticket notifications by ticket ID
          iOS: {
            threadId: `support_${data.ticketId}`,
            categoryIdentifier: "support",
          },
          android: {
            channelId: "support",
            color: "#5856D6", // Purple color for support notifications
          },
        };

      default:
        return defaultOptions;
    }
  },
});

export interface NotificationToken {
  token: string;
  deviceId: string;
  platform: "ios" | "android" | "web";
  permissionGranted?: boolean;
}

// Initialize all notification-related settings
export async function initializeNotifications() {
  try {
    // Set up Android notification channels
    if (Platform.OS === "android") {
      // Default channel
      await Notifications.setNotificationChannelAsync("default", {
        name: "Default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });

      // Chat channel
      await Notifications.setNotificationChannelAsync("chat", {
        name: "Chat Messages",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 100, 100, 100],
        lightColor: "#007AFF",
      });

      // Challenge membership channel
      await Notifications.setNotificationChannelAsync("challenge_membership", {
        name: "Challenge Updates",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 100, 100, 100],
        lightColor: "#34C759",
      });

      // Leaderboard channel
      await Notifications.setNotificationChannelAsync("leaderboard", {
        name: "Leaderboard Updates",
        importance: Notifications.AndroidImportance.DEFAULT,
        vibrationPattern: [0, 100, 100, 100],
        lightColor: "#FF9500",
      });
    }

    // Set up iOS notification categories
    if (Platform.OS === "ios") {
      await setupNotificationCategories();
    }

    console.log(
      "[Notifications] Initialized notification channels and categories"
    );
  } catch (error) {
    console.error("Error initializing notifications:", error);
  }
}

export async function registerForPushNotifications(): Promise<{
  token: NotificationToken | null;
  permissionGranted: boolean;
}> {
  try {
    // Check permissions but never request them
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    const permissionGranted = existingStatus === "granted";

    console.log("[Notifications] Permission granted:", permissionGranted);

    // Get push notification token regardless of permission status
    try {
      const projectId = Constants.expoConfig?.extra?.projectId;
      const token = await Notifications.getExpoPushTokenAsync({
        projectId,
      });

      return {
        token: {
          token: token.data,
          deviceId: getDeviceId(),
          platform: Platform.OS as "ios" | "android" | "web",
          permissionGranted,
        },
        permissionGranted,
      };
    } catch (error) {
      console.error("Error getting push token:", error);
      return { token: null, permissionGranted };
    }
  } catch (error) {
    console.error("Error registering for push notifications:", error);
    return { token: null, permissionGranted: false };
  }
}

export async function sendPushNotificationToken(token: NotificationToken) {
  try {
    console.log("[Notifications] Sending token to backend:", token);
    await api.post("/notifications/register", token);
  } catch (error) {
    console.error("Error sending push notification token:", error);
  }
}

// Function to schedule a local notification
export async function scheduleLocalNotification(
  title: string,
  body: string,
  trigger: Notifications.NotificationTriggerInput = null
) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger,
    });
  } catch (error) {
    console.error("Error scheduling local notification:", error);
  }
}

// Function to schedule a daily reminder
export async function scheduleDailyReminder(
  title: string,
  body: string,
  hour: number,
  minute: number
) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
  } catch (error) {
    console.error("Error scheduling daily reminder:", error);
  }
}

// Function to cancel all scheduled notifications
export async function cancelAllScheduledNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error("Error canceling scheduled notifications:", error);
  }
}

// Add notification listeners
export function addNotificationListeners(
  onNotification: (notification: Notifications.Notification) => void,
  onNotificationResponse: (response: Notifications.NotificationResponse) => void
) {
  const notificationListener =
    Notifications.addNotificationReceivedListener(onNotification);
  const responseListener =
    Notifications.addNotificationResponseReceivedListener(
      onNotificationResponse
    );

  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
}

// Add this function to set up notification categories (for iOS)
export async function setupNotificationCategories() {
  if (Platform.OS === "ios") {
    // Chat category
    await Notifications.setNotificationCategoryAsync("chat", [
      {
        identifier: "reply",
        buttonTitle: "Reply",
        options: {
          opensAppToForeground: true,
        },
      },
    ]);

    // Support ticket category
    await Notifications.setNotificationCategoryAsync("support", [
      {
        identifier: "view",
        buttonTitle: "View Ticket",
        options: {
          opensAppToForeground: true,
        },
      },
      {
        identifier: "reply",
        buttonTitle: "Reply",
        options: {
          opensAppToForeground: true,
        },
      },
    ]);
  }

  // Set up Android notification channels
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });

    await Notifications.setNotificationChannelAsync("chat", {
      name: "Chat Messages",
      description: "Notifications for new chat messages",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#007AFF",
    });

    await Notifications.setNotificationChannelAsync("challenge_membership", {
      name: "Challenge Membership",
      description: "Notifications about challenge join requests and responses",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#34C759",
    });

    await Notifications.setNotificationChannelAsync("leaderboard", {
      name: "Leaderboard Updates",
      description: "Notifications about leaderboard position changes",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF9500",
    });

    await Notifications.setNotificationChannelAsync("support", {
      name: "Support Tickets",
      description: "Notifications about support tickets and messages",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#5856D6",
    });
  }
}

export async function requestNotificationPermissions(): Promise<boolean> {
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    if (existingStatus === "granted") {
      return true;
    }

    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  } catch (error) {
    console.error("Error requesting notification permissions:", error);
    return false;
  }
}

// Function to open device notification settings
export async function openNotificationSettings(): Promise<void> {
  try {
    if (Platform.OS === "ios") {
      // iOS: Open app settings
      await Linking.openSettings();
    } else if (Platform.OS === "android") {
      // Android: Open app details settings which has notifications
      const packageName = Constants.expoConfig?.android?.package || "";
      await Linking.openSettings();
      // Alternative approach if the above doesn't open directly to notifications:
      // await Linking.openURL(`package:${packageName}`);
    }
  } catch (error) {
    console.error("Error opening notification settings:", error);
  }
}
