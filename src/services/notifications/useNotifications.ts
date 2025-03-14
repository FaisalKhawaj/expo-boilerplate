import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import {
  registerForPushNotifications,
  requestNotificationPermissions,
  sendPushNotificationToken,
  initializeNotifications,
  openNotificationSettings,
} from "./notifications";
import { NotificationPayload, NotificationType } from "./types";
import { Alert, AppState } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "@/src/context/auth";

export function useNotifications() {
  console.log("[Notifications] Mounting");
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [pendingNotificationResponse, setPendingNotificationResponse] =
    useState<Notifications.NotificationResponse | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const appStateSubscription = useRef<any>();
  const { user, isAuthCheckDone } = useAuth();
  const isInitialized = useRef(false);

  // Function to register for push notifications and update state
  const registerForToken = async () => {
    console.log("[Notifications] registerForToken");
    const response = await registerForPushNotifications();

    console.log("[Notifications] Response:", response);

    setPermissionGranted(response.permissionGranted);

    console.log(
      "[Notifications] setPermissionGranted Permission granted:",
      response.permissionGranted
    );

    if (response.token) {
      setExpoPushToken(response.token.token);

      // Always send token to backend if user is logged in, regardless of permission status
      if (user) {
        console.log(
          "[Notifications] Sending token to backend:",
          response.token
        );
        await sendPushNotificationToken(response.token);
      }
    }

    return response;
  };

  // Function to request notification permissions and refresh token
  const requestPermissions = async (): Promise<boolean> => {
    const result = await requestNotificationPermissions();
    setPermissionGranted(result);

    console.log(
      "[Notifications] requestPermissions Permission granted:",
      result
    );

    if (result) {
      // Refresh token after getting permissions
      await registerForToken();
    }

    return result;
  };

  // Handle notification routing and actions
  const handleNotificationResponse = async (
    response: Notifications.NotificationResponse
  ) => {
    try {
      await SplashScreen.hideAsync();
    } catch (e) {
      console.log("[Notifications] Error hiding splash screen:", e);
    }

    if (!isAuthCheckDone || !user) {
      setPendingNotificationResponse(response);
      return;
    }

    try {
      const data = response.notification.request.content
        .data as NotificationPayload;
      console.log("[Notifications] Processing notification data:", data);

      switch (data.type) {
        case NotificationType.CHALLENGE_JOIN_REQUEST:
          // router.push(
          //   `/(main)/challenge-profile/${data.challengeId}/participants?initialTab=requests`
          // );
          break;

        case NotificationType.CHALLENGE_JOIN_RESPONSE:
          if (data.status === "approved") {
            // router.push(`/(main)/challenge-profile/${data.challengeId}`);
          } else {
            Alert.alert(
              "Challenge Join Request",
              `Your request to join ${data.challengeName} was ${data.status}.`
            );
          }
          break;

        case NotificationType.CHALLENGE_DELETED:
          Alert.alert(
            "Challenge Deleted",
            `The challenge "${data.challengeName}" has been deleted${
              data.reason ? `: ${data.reason}` : "."
            }`
          );
          // router.push("/(main)/(tabs)/home");
          break;

        case NotificationType.CHAT_MESSAGE:
          // router.push("/(main)/(tabs)/messages");
          // router.push({
          //   pathname: "/(main)/chat/[id]",
          //   params: { id: data.challengeId },
          // });
          break;

        case NotificationType.WEEKLY_LEADERBOARD:
        case NotificationType.LEADERBOARD_POSITION_CHANGE:
          // router.push(
          //   `/(main)/challenge-profile/${data.challengeId}/leaderboard`
          // );
          break;

        // Support ticket notifications
        case NotificationType.SUPPORT_TICKET_CREATED:
          // For staff members, navigate to the ticket with staff view
          if (user?.isGlobalAdmin || user?.isSupportAgent) {
            // router.push({
            //   pathname: "/(main)/support/[ticketId]",
            //   params: {
            //     ticketId: data.ticketId,
            //     isStaffView: "true",
            //   },
            // });
          } else {
            // For regular users, just navigate to the ticket
            // router.push({
            //   pathname: "/(main)/support/[ticketId]",
            //   params: { ticketId: data.ticketId },
            // });
          }
          break;

        case NotificationType.SUPPORT_TICKET_MESSAGE:
          // For staff members, navigate to the ticket with staff view if the message is from a user
          if (
            (user?.isGlobalAdmin || user?.isSupportAgent) &&
            !data.isStaffMessage
          ) {
            // router.push({
            //   pathname: "/(main)/support/[ticketId]",
            //   params: {
            //     ticketId: data.ticketId,
            //     isStaffView: "true",
            //   },
            // });
          } else {
            // For regular users or if the message is from staff to staff
            // router.push({
            //   pathname: "/(main)/support/[ticketId]",
            //   params: { ticketId: data.ticketId },
            // });
          }
          break;

        case NotificationType.SUPPORT_TICKET_STATUS_CHANGE:
          // For staff members, navigate to the ticket with staff view
          if (user?.isGlobalAdmin || user?.isSupportAgent) {
            // router.push({
            //   pathname: "/(main)/support/[ticketId]",
            //   params: {
            //     ticketId: data.ticketId,
            //     isStaffView: "true",
            //   },
            // });
          } else {
            // For regular users
            // router.push({
            //   pathname: "/(main)/support/[ticketId]",
            //   params: { ticketId: data.ticketId },
            // });
          }
          break;
      }
    } catch (error) {
      console.error("[Notifications] Navigation error:", error);
      // Fallback to home screen if navigation fails
      // router.push("/(main)/(tabs)/home");
    }
  };

  // Process any pending notification once auth is ready
  useEffect(() => {
    if (isAuthCheckDone && user && pendingNotificationResponse) {
      handleNotificationResponse(pendingNotificationResponse);
      setPendingNotificationResponse(null);
    }
  }, [isAuthCheckDone, user]);

  console.log("[Notifications] User:", user);

  // Set up notification listeners and initialize
  useEffect(() => {
    const setupNotifications = async () => {
      if (!isInitialized.current) {
        console.log("[Notifications] Initializing notification system");
        await initializeNotifications();
        isInitialized.current = true;
      }

      console.log("[Notifications] Registering for push notifications");
      await registerForToken();
    };

    setupNotifications();

    // Listen for app state changes to refresh token when app comes to foreground
    appStateSubscription.current = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "active") {
          console.log(
            "[Notifications] App returned to foreground, refreshing token"
          );
          registerForToken();
        }
      }
    );

    // Listen for incoming notifications while app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // Listen for user interactions with notifications
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );

    // Clean up on unmount
    return () => {
      console.log("[Notifications] Cleaning up notification listeners");
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
      if (appStateSubscription.current) {
        appStateSubscription.current.remove();
      }
    };
  }, [user, isAuthCheckDone]);

  return {
    expoPushToken,
    notification,
    requestPermissions,
    permissionGranted,
    openNotificationSettings,
  };
}
