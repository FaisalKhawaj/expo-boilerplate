import React from "react";
import { View, Text } from "react-native";

export function HeaderBackground() {
  return (
    <View className="absolute inset-0 bg-white dark:bg-black border-b border-zinc-200 dark:border-black" />
  );
}

export function TabBackground() {
  return (
    <View className="absolute inset-0 bg-zinc-50 dark:bg-black border-t-[0.3px] border-zinc-200 dark:border-black" />
  );
}

export function HeaderTitle({ children }: { children: React.ReactNode }) {
  return (
    <View className="max-w-[270px]">
      <Text
        className="text-zinc-900 dark:text-zinc-50 text-xl font-semibold"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {children}
      </Text>
    </View>
  );
}
