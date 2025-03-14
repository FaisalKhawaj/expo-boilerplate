import React, { createContext, useContext } from "react";
import { useNotifications } from "../services/notifications/useNotifications";

interface NotificationsContextType {}

const NotificationsContext = createContext<NotificationsContextType | null>(
  null
);

export function useNotificationsContext() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotificationsContext must be used within a NotificationsProvider"
    );
  }
  return context;
}

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("[NotificationsProvider] Mounting");

  // Use our enhanced notifications hook
  useNotifications();

  return (
    <NotificationsContext.Provider value={{}}>
      {children}
    </NotificationsContext.Provider>
  );
}
