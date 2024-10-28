import {
  Image,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { globalStyles } from "@/src/styles/globalStyles";
import { SecureStorageHelper } from "@/src/helpers/SecureStorageHelper";
import { useAuth } from "@/src/context/AuthContext";

export default function HomeScreen() {
  const { setIsLoggedin } = useAuth();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={async () => {
          setIsLoggedin(false);
          await SecureStorageHelper.removeRefreshToken();
          await SecureStorageHelper.removeToken();
          await SecureStorageHelper.removeUserId();
        }}
        // onPress={handleSubmit(handleLogin)}
        style={[globalStyles.buttonStyle, {}]}
      >
        <Text style={[globalStyles.buttonText]}>Logout</Text>
      </TouchableOpacity>
    </ParallaxScrollView>
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
