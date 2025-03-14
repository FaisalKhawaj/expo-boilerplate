import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import "react-native-reanimated";
import * as Updates from "expo-updates";
import Constants from "expo-constants";
import { Alert } from "react-native";
import { Slot, useSegments, useRootNavigationState } from "expo-router";
import { useAuth } from "@/src/context/auth";
import { Providers } from "@/components/Providers";
import RootStack from "./rootStack";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(true);
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();
  const { isAuthCheckDone, refreshUser } = useAuth();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Handle splash screen hiding
  useEffect(() => {
    async function hideSplashScreen() {
      // Only hide splash screen when:
      // 1. Fonts are loaded
      // 2. Auth check is done
      // 3. Navigation is ready
      // 4. Not checking for updates
      // 5. We have segments (meaning the route is ready)
      if (
        loaded &&
        isAuthCheckDone &&
        rootNavigationState?.key &&
        !isCheckingUpdate &&
        segments.length > 0
      ) {
        try {
          await SplashScreen.hideAsync();
        } catch (e) {
          console.log("Error hiding splash screen:", e);
        }
      }
    }

    hideSplashScreen();
  }, [
    loaded,
    isAuthCheckDone,
    rootNavigationState?.key,
    isCheckingUpdate,
    segments,
  ]);

  // Single unified update check
  useEffect(() => {
    if (loaded) {
      // you can add more functions like initializeNotifications() etc here
      Promise.all([checkForUpdates()]).catch((error) => {
        console.error("Error in initialization:", error);
      });
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  async function checkForUpdates() {
    // Disable for dev
    const isDev = __DEV__;
    if (isDev) {
      console.log("[OTA Update] Skipping update check in development mode");
      setIsCheckingUpdate(false);
      return;
    }

    try {
      // Log app information for debugging
      const appVersion = Constants.expoConfig?.version || "unknown";
      const buildNumber =
        Constants.expoConfig?.ios?.buildNumber ||
        Constants.expoConfig?.android?.versionCode ||
        "unknown";
      const runtimeVersion = Updates.runtimeVersion || "unknown";
      const updateChannel = Updates.channel || "unknown";

      console.log("[OTA Update] Checking for updates...");
      console.log(
        `[OTA Update] App version: ${appVersion}, Build: ${buildNumber}`
      );
      console.log(
        `[OTA Update] Runtime version: ${runtimeVersion}, Channel: ${updateChannel}`
      );

      const update = await Updates.checkForUpdateAsync();
      console.log(`[OTA Update] Update available: ${update.isAvailable}`);

      if (update.isAvailable) {
        console.log("[OTA Update] Downloading update...");

        Alert.alert(
          "Downloading Update",
          "Please wait while we update the app...",
          [],
          {
            cancelable: false,
          }
        );

        try {
          const result = await Updates.fetchUpdateAsync();
          console.log(
            `[OTA Update] Update downloaded: ${JSON.stringify(result)}`
          );

          Alert.alert(
            "Restarting",
            "Update complete. The app will now restart.",
            [{ text: "OK", onPress: () => Updates.reloadAsync() }],
            { cancelable: false }
          );
        } catch (error) {
          console.log("[OTA Update] Error applying update:", error);
          Alert.alert(
            "Update Failed",
            "There was a problem updating the app. The app will continue with the current version."
          );
        }
      } else {
        console.log("[OTA Update] No updates available");
      }
    } catch (error) {
      console.log("[OTA Update] Error checking for updates:", error);
    } finally {
      setIsCheckingUpdate(false);
    }
  }

  if (!loaded || isCheckingUpdate) {
    return <Slot />;
  }

  return <RootStack />;
}

export default function RootLayout() {
  console.log("RootLayout");
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}
