import { View, ActivityIndicator, Text } from "react-native";
import { SplashScreen } from "expo-router";
import { LogoIcon } from "@/components/LogoIcon";

export default function LoadingScreen() {
  SplashScreen.hideAsync();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <View className="items-center space-y-8">
        <LogoIcon variant="full" width={200} height={50} />

        <View className="items-center space-y-2">
          <ActivityIndicator size="large" />
          <Text className="text-muted-foreground text-sm">Loading...</Text>
        </View>
      </View>
    </View>
  );
}
