import {
  DarkTheme,
  ThemeProvider,
  DefaultTheme,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/src/context/auth";
import { NotificationsProvider } from "@/src/context/notifications";
import { NetworkProvider } from "@/src/context/network";
import { PropsWithChildren } from "react";
import { I18nProvider } from "@/src/context/i18nProvider";
import { PaperProvider } from "react-native-paper";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: "REACT_QUERY_OFFLINE_CACHE",
});

persistQueryClient({
  queryClient,
  persister,
});

export function Providers({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();

  return (
    <NetworkProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <I18nProvider>
            <PaperProvider>
              <AuthProvider>
                {/* <NotificationsProvider> */}
                {children}
                {/* </NotificationsProvider> */}
              </AuthProvider>
            </PaperProvider>
          </I18nProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </NetworkProvider>
  );
}
