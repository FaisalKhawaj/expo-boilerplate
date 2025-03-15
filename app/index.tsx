import { useAuth } from "@/src/context/auth";
import { Redirect } from "expo-router";

export default function Index() {
  const { isAuthenticated, isAuthCheckDone, user } = useAuth();
  console.log(`Index user`, user);
  console.log(`Index isAuthenticated`, isAuthenticated);
  console.log(`Index isAuthCheckDone`, isAuthCheckDone);

  if (!isAuthCheckDone) {
    return null; // or a loading screen
  }
  console.log("Index isAuthenticated>>>>", isAuthenticated);
  // Redirect based on auth state
  if (isAuthenticated) {
    if (user?.didFinishOnboarding) {
      return <Redirect href="/(main)/(tabs)" />;
    }
  }

  return <Redirect href="/(auth)/login" />;
}
