import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { SessionProvider, User } from "../services/auth/types";
import { getMe } from "../services/auth/me";
import { logout } from "../services/auth/logout";

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
      console.error("[Auth] Error during session check:", error);
      setState({
        isLoading: false,
        isAuthenticated: false,
        user: null,
        isAuthCheckDone: true,
      });
    }
  }

  const signIn = async (user: User) => {
    try {
      const userData = await getMe();

      if (!userData) {
        throw new Error("Invalid credentials");
      }

      setState({
        isAuthenticated: true,
        user: userData,
        isLoading: false,
        isAuthCheckDone: true,
      });
    } catch (error) {
      console.error("[Auth] Error during sign-in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await logout();
      queryClient.clear();
      setState({
        isLoading: false,
        isAuthenticated: false,
        user: null,
        isAuthCheckDone: true,
      });
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
