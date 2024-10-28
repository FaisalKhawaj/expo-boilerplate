import { fonts } from "@/hooks/useCacheResources";
import { globalStyles } from "@/src/styles/globalStyles";
import { router } from "expo-router";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";

export const Login = () => {
  const handleSignup = () => {};

  const handleLogin = () => {
    router.push("/(tabs)");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexGrow: 1, padding: 20 }}>
        <Text style={globalStyles.screenTitle}>Sign in</Text>
        <View style={{ marginTop: 20 }} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogin}
          style={[globalStyles.buttonStyle, {}]}
        >
          <Text style={[globalStyles.buttonText]}>Login</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20 }} />
        <Text style={[globalStyles.dontHaveAcc, { textAlign: "center" }]}>
          Don't have an account?{" "}
          <Text
            onPress={() => router.push("/signup")}
            style={{ fontFamily: fonts.primary.bold }}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};
