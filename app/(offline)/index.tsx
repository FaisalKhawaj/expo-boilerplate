import { View, Text, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useNetwork } from "@/src/context/network";

export default function OfflineScreen() {
  const { checkConnection } = useNetwork();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (isRetrying) return;

    try {
      setIsRetrying(true);
      await checkConnection();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-zinc-950">
      <View className="flex-1 px-6 items-center justify-center">
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 1000 }}
          className="items-center"
        >
          {/* Animated Icon */}
          <MotiView
            from={{ translateY: 0 }}
            animate={{ translateY: 10 }}
            transition={{
              type: "timing",
              duration: 1500,
              loop: true,
              repeatReverse: true,
            }}
            className="mb-8"
          >
            <View className="bg-blue-500 dark:bg-blue-900 rounded-full p-6">
              <Ionicons name="cloud-offline" size={48} color="#007AFF" />
            </View>
          </MotiView>

          <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 text-center mb-4">
            Oops! You're Offline
          </Text>
          <Text className="text-base text-zinc-600 dark:text-zinc-400 text-center max-w-[300px] mb-8">
            Check your internet connection and try again
          </Text>

          <TouchableOpacity
            onPress={handleRetry}
            disabled={isRetrying}
            style={{
              backgroundColor: "#007AFF",
              opacity: isRetrying ? 0.7 : 1,
            }}
            className="py-4 px-8 rounded-2xl flex-row items-center space-x-2"
          >
            <Ionicons
              name={isRetrying ? "sync" : "refresh"}
              size={20}
              color="white"
              style={
                isRetrying ? { transform: [{ rotate: "45deg" }] } : undefined
              }
            />
            <Text className="text-lg font-medium text-white">
              {isRetrying ? "Checking..." : "Reconnect"}
            </Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    </SafeAreaView>
  );
}
