/* eslint-disable react-native/no-inline-styles */
import React, { forwardRef, ForwardRefRenderFunction } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TextInputProps,
} from "react-native";
import { Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { EyeCloseIcon, EyeOpenIcon } from "@/assets/svgs";
import { twMerge } from "tailwind-merge";

import { fonts } from "@/hooks/useCacheResources";

interface InputProp extends TextInputProps {
  control: any;
  initialValue?: any;
  name: string;
  isRequired?: boolean;
  className?: string;
  label: string;
}

const CustomTextInputBase: ForwardRefRenderFunction<TextInput, InputProp> = (
  {
    control,
    label,
    className,
    initialValue,
    name,
    isRequired = false,
    ...props
  },
  ref
) => {
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: isRequired,
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <View className="gap-1.5">
              {label && (
                <Text className="text-md font-medium text-zinc-900 dark:text-zinc-100">
                  {label}
                </Text>
              )}
              <TextInput
                ref={ref}
                className={twMerge(
                  "bg-white rounded-xl px-4 dark:bg-zinc-800 py-5 border border-lime-50 text-zinc-900 dark:text-zinc-100",
                  error && "border-red-500 dark:border-red-500"
                )}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                {...props}
              />
            </View>
            {error?.message && (
              <Text className="text-red-500 text-sm">{error.message}</Text>
            )}
          </>
        )}
        defaultValue={initialValue}
        name={name}
      />
    </View>
  );
};

export const CustomTextInput = forwardRef(CustomTextInputBase);
