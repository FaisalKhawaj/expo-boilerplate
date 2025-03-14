import { useAuth } from "@/src/context/auth";
import { Redirect } from "expo-router";

export default function Index() {
  const { isAuthenticated, isAuthCheckDone, user } = useAuth();

  if (!isAuthCheckDone) {
    return null; // or a loading screen
  }

  // Redirect based on auth state
  if (isAuthenticated) {
    if (user?.didFinishOnboarding) {
      return <Redirect href="/(main)/(tabs)" />;
    }
  }

  return <Redirect href="/(auth)/login" />;
}
