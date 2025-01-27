import {
  Image,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { globalStyles } from "@/src/styles/globalStyles";
import { SecureStorageHelper } from "@/src/helpers/SecureStorageHelper";
import { useAuth } from "@/src/context/AuthContext";

export default function HomeScreen() {
  const { setIsLoggedin }:any = useAuth();
  return (
  <SafeAreaView>
    <View style={{flex:1,padding:20,}}>


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
