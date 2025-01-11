import React from "react";
import { Button, ButtonProps } from "react-native-paper";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "@/constants/Colors";
import { fonts } from "@/hooks/useCacheResources";

export enum LabelButtonVariation {
  default = "default",
  light = "light",
  plain = "plain",
  destructive = "destructive",
  approve = "approve",
  success = "success",
}

export interface LabelButtonProps {
  variation?: LabelButtonVariation;
  title?: any;
  disabled?: any;
  loading?: any;
  onPress?: () => void;
  children?: any;
}

export function LabelButton(props: ButtonProps & LabelButtonProps) {
  const {
    variation = LabelButtonVariation.default,
    onPress = () => {},
    disabled=false,
    title,
    loading,
    children,
  } = props;
console.log('disabled',disabled)

const currentButtonColor = disabled
? Colors.light.disableButton // Grey background for disabled state
: buttonColors[variation];
console.log('currentButtonColor',currentButtonColor)
  return (
    <Button
      disabled={disabled}
      buttonColor={currentButtonColor}
      style={buttonWrap.buttonStyle}
      textColor={Colors.light.background}
      labelStyle={titleStyles[variation]}
      onPress={onPress}
      contentStyle={{
        height:'100%',
        backgroundColor:currentButtonColor
      }}
      loading={loading}
      {...props}
    >
      {children || title}
    </Button>
  );
}

const titleStyles: { [key in LabelButtonVariation]: any } = {
  default: {
    color: Colors.dark.background,
    fontSize: RFValue(15),
    fontFamily: fonts.primary.semibold,
    fontWeight: "600",
  },
  light: {
    color: Colors.dark.background,
    fontSize: RFValue(15),
    fontFamily: fonts.primary.bold,
    fontWeight: "600",
  },
  plain: {
    color: Colors.dark.background,
    fontSize: RFValue(15),
    fontFamily: fonts.primary.bold,
    fontWeight: "600",
  },
  destructive: {
    color: Colors.dark.background,
    fontSize: RFValue(15),
    fontFamily: fonts.primary.bold,
    fontWeight: "600",
  },
  approve: {
    color: Colors.dark.background,
    fontSize: RFValue(15),
    fontFamily: fonts.primary.bold,
    fontWeight: "600",
  },
  success: {
    color: Colors.dark.background,
    fontSize: RFValue(15),
    fontFamily: fonts.primary.bold,
    fontWeight: "600",
  },
};

const buttonWrap = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    borderRadius: 5,
    height: 48,
    justifyContent: "center",
  },
});

const buttonColors: { [key in LabelButtonVariation]: string } = {
  default: Colors.light.buttonBg,
  light: Colors.light.success,
  plain: "transparent",
  destructive: Colors.light.danger,
  approve: Colors.light.success,
  success: Colors.light.success,
};
