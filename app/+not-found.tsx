import { SplashScreen, usePathname, useSegments } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { View } from "moti";

export default function NotFoundScreen() {
  const pathname = usePathname();
  const segments = useSegments();

  console.log("[NotFound] Attempted route:", {
    pathname,
    segments,
    stack: new Error().stack, // This will show us the navigation stack trace
  });
  SplashScreen.hideAsync();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Not Found: {pathname}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
