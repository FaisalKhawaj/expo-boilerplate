import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

interface AnimatedTabIconProps {
  name: string;
  color: string;
  size: number;
  focused: boolean;
}

export function AnimatedTabIcon({
  name,
  color,
  size,
  focused,
}: AnimatedTabIconProps) {
  // Remove "-outline" from the name to get the filled version
  const filledIconName = name.replace("-outline", "");

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(focused ? 1 : 0, { duration: 200 }),
      transform: [
        {
          scale: withTiming(focused ? 1 : 0.8, { duration: 200 }),
        },
      ],
    };
  });

  const outlineStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(focused ? 0 : 1, { duration: 200 }),
      transform: [
        {
          scale: withTiming(focused ? 0.8 : 1, { duration: 200 }),
        },
      ],
    };
  });

  return (
    <>
      <AnimatedIcon
        name={filledIconName as any}
        size={size}
        color={color}
        style={[styles.icon, animatedStyle]}
      />
      <AnimatedIcon
        name={name as any}
        size={size}
        color={color}
        style={[styles.icon, outlineStyle]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
  },
});
