import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { SessionProvider, User } from "../services/auth/types";
import { getMe } from "../services/api/me";
import { logout } from "../services/api/logout";
import { router } from "expo-router";
import { Alert } from "react-native";
import * as Haptics from "expo-haptics";

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  isAuthCheckDone: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (user: User) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: (sessionProvider?: SessionProvider) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    user: null,
    isAuthCheckDone: false,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const userData = await getMe();

      if (!userData) {
        setState({
          isLoading: false,
          isAuthenticated: false,
          user: null,
          isAuthCheckDone: true,
        });
        return;
      }

      setState({
        isLoading: false,
        isAuthenticated: true,
        user: userData,
        isAuthCheckDone: true,
      });
    } catch (error) {
      // console.error("[Auth] Error during session check:", error);
      setState({
        isLoading: false,
        isAuthenticated: false,
        user: null,
        isAuthCheckDone: true,
      });
    }
  }

  const signIn = async (user: User) => {
    // console.log("singIn user>>", user);
    try {
      const userData = await getMe();

      if (!userData) {
        throw new Error("Invalid credentials");
      }
      // Set sessionProvider from passed user if it exists
      const updatedUserData = {
        ...userData,
        sessionProvider: user?.sessionProvider || userData.sessionProvider,
        authProviders: user?.authProviders || userData.authProviders,
      };

      if (!updatedUserData.emailVerified) {
        router.replace(`/(auth)/${updatedUserData.email}/verify`);
        return;
      }
      setState((prev) => ({
        ...prev,
        isAuthenticated: true,
        user: updatedUserData,
      }));
      if (updatedUserData.didFinishOnboarding) {
        console.log(
          `[Auth] User has completed onboarding, redirecting to home`
        );
        router.replace("/(main)/(tabs)");
      } else {
        console.log(
          `[Auth] User has NOT completed onboarding, redirecting to onboarding`
        );
        // router.replace("/(onboarding)/screen1");
      }
    } catch (error) {
      console.error("[Auth] Error during sign-in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      Alert.alert("Logout", "Are you sure you want to logout?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              await logout();
              queryClient.clear();
              setState({
                isLoading: false,
                isAuthenticated: false,
                user: null,
                isAuthCheckDone: true,
              });
                router.replace("/(auth)/login");
            } catch (error) {
              console.error("Error logging out:", error);
              Alert.alert("Error", "Failed to logout. Please try again.");
            }
          },
        },
      ]);
    } catch (error) {
      console.error("[Auth] Error during sign-out:", error);
      setState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        isAuthCheckDone: true,
      });
    }
  };

  const refreshUser = async (sessionProvider?: SessionProvider) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const userData = await getMe();

      if (!userData) {
        setState({
          isLoading: false,
          isAuthenticated: false,
          user: null,
          isAuthCheckDone: true,
        });
        return;
      }

      setState({
        isLoading: false,
        isAuthenticated: true,
        user: userData,
        isAuthCheckDone: true,
      });
    } catch (error) {
      console.error("[Auth] Error during refresh:", error);
      setState({
        isLoading: false,
        isAuthenticated: false,
        user: null,
        isAuthCheckDone: true,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
