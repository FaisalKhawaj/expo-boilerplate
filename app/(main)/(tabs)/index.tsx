import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import { globalStyles } from "@/src/styles/globalStyles";
import * as Haptics from "expo-haptics";
import { useAuth } from "@/src/context/auth";
import { router } from "expo-router";
import { LabelButton, LabelButtonVariation } from "@/components/LabelButton";

export default function HomeScreen() {
  // const { setIsLoggedin }:any = useAuth();
  const { signOut } = useAuth();
  const handleLogout = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await signOut();

  };
  return (
    <SafeAreaView className="flex-1 bg-background-screen dark:bg-background-screen-dark">
      <View className="flex-1 p-5 bg-background-screen dark:bg-background-screen-dark">
        <LabelButton
          onPress={() => handleLogout()}
          variation={LabelButtonVariation.default}
        >
          Logout
        </LabelButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
