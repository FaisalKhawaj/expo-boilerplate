import { Redirect, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/src/context/AuthContext";
import { TabBackground } from "@/components/ui/HeaderStyles";
import { HapticTab } from "@/components/HapticTab";
import { AnimatedTabIcon } from "@/components/ui/AnimatedTabIcon";

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  // const { isLoggedin } = useAuth();

  // if (!isLoggedin) {
  //   return <Redirect href={"/login"} />;
  // }
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#0EA5E9",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          borderBottomWidth: 0,
          elevation: 0,
        },
        tabBarBackground: () => <TabBackground />,
        animation: "shift",
        tabBarButton: (props) => <HapticTab {...props} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
