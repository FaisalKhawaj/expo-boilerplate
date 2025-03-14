import React, { createContext, useContext, useEffect, useState } from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useRouter } from "expo-router";

interface NetworkContextType {
  isOnline: boolean;
  checkConnection: () => Promise<boolean>;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

// Function to check if we can reach a reliable endpoint
const checkReachability = async (): Promise<boolean> => {
  try {
    // Using Google's DNS server as it's highly reliable
    const response = await fetch("https://8.8.8.8", {
      mode: "no-cors",
      // Short timeout to avoid hanging
      signal: AbortSignal.timeout(3000),
    });
    return true;
  } catch (error) {
    console.log("[Network] Ping check failed:", error);
    return false;
  }
};

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const router = useRouter();
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);

  const checkConnection = async (): Promise<boolean> => {
    if (isCheckingConnection) return isOnline;

    try {
      setIsCheckingConnection(true);

      const state = await NetInfo.fetch();
      const netInfoConnected =
        state.isConnected &&
        (state.isInternetReachable || state.isInternetReachable === null);

      // If NetInfo says we're connected, trust it
      if (netInfoConnected) {
        setIsOnline(true);
        setIsCheckingConnection(false);
        return true;
      }

      // If NetInfo says we're disconnected, verify with a ping
      const isPingSuccessful = await checkReachability();
      const finalConnectionStatus = netInfoConnected || isPingSuccessful;

      console.log("[Network] Connection check:", {
        netInfoConnected,
        isPingSuccessful,
        finalStatus: finalConnectionStatus,
      });

      setIsOnline(finalConnectionStatus);
      setIsCheckingConnection(false);
      return finalConnectionStatus;
    } catch (error) {
      console.error("[Network] Error checking connection:", error);
      setIsCheckingConnection(false);
      return false;
    }
  };

  // Handle navigation based on connection status
  useEffect(() => {
    if (!isOnline) {
      router.push("/(offline)");
    } else if (router.canGoBack()) {
      router.back();
    }
  }, [isOnline]);

  useEffect(() => {
    // Initial check
    checkConnection();
    console.log("SUBSCRIBED SUBSCRIBED");
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(
      async (state: NetInfoState) => {
        const netInfoConnected =
          state.isConnected &&
          (state.isInternetReachable || state.isInternetReachable === null);

        if (netInfoConnected) {
          setIsOnline(true);
          return;
        }

        // Only do ping check if NetInfo says we're disconnected
        await checkConnection();
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isOnline, checkConnection }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }
  return context;
}
