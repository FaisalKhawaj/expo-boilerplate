import React from "react";
import { Button, ButtonProps } from "react-native-paper";
import { Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "@/constants/Colors";
import { fonts } from "@/hooks/useCacheResources";
import { twMerge } from "tailwind-merge";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export enum LabelButtonVariation {
  default = "default",
  secondary = "secondary",
  outline = "outline",
  destructive = "destructive",
  ghost = "ghost",
}

export interface LabelButtonProps {
  variation?: LabelButtonVariation;
  title?: any;
  disabled?: any;
  loading?: any;
  onPress?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: any;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function LabelButton({
  variation = LabelButtonVariation.default,
  onPress = () => {},
  disabled = false,
  title,
  size = "md",
  loading,
  className,
  children,
  ...props
}: ButtonProps & LabelButtonProps) {
  console.log("disabled", disabled);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const baseStyles = "rounded-lg items-center justify-center";

  const variantStyles = {
    default: "bg-blue-500 dark:bg-blue-500",
    secondary: "bg-zinc-900 dark:bg-zinc-100",
    outline: "border border-zinc-200 dark:border-zinc-700 bg-transparent",
    destructive: "bg-red-500 dark:bg-red-600",
    ghost: "bg-transparent",
  } as const;

  const disabledStyles = {
    default: "bg-blue-300 dark:bg-blue-300/70",
    secondary: "bg-zinc-400 dark:bg-zinc-300",
    outline:
      "border border-zinc-100 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-700",
    destructive: "bg-red-300 dark:bg-red-400/60",
    ghost: "bg-transparent",
  } as const;

  const sizeStyles = {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-6 py-4",
  };

  const textStyles = {
    default: "text-white dark:text-white",
    secondary: "text-white dark:text-zinc-900",
    outline: "text-zinc-900 dark:text-zinc-100",
    destructive: "text-white dark:text-zinc-900",
    ghost: "text-zinc-900 dark:text-zinc-100",
  } as const;

  const textDisabledStyles = {
    default: "text-white/90 dark:text-white/90",
    secondary: "text-white/70 dark:text-zinc-900/70",
    outline: "text-zinc-400 dark:text-zinc-500",
    destructive: "text-zinc-400 dark:text-zinc-100",
    ghost: "text-zinc-900 dark:text-zinc-100",
  } as const;

  const textSizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 10, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 400 });
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      className={twMerge(
        baseStyles,
        disabled || loading
          ? disabledStyles[variation]
          : variantStyles[variation],
        sizeStyles[size],
        className
      )}
      style={[animatedStyles]}
    >
      <Animated.View className="flex-row items-center gap-2">
        {loading && (
          <ActivityIndicator
            color={variation === "outline" ? "#18181B" : "#FFFFFF"}
            size="small"
          />
        )}
        <Animated.Text
          className={twMerge(
            "font-medium",
            disabled || loading
              ? textDisabledStyles[variation]
              : textStyles[variation],
            textSizeStyles[size]
          )}
        >
          {children}
        </Animated.Text>
      </Animated.View>
    </AnimatedPressable>
  );
}
