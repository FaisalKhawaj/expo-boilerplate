/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";
import { Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { EyeCloseIcon, EyeOpenIcon } from "@/assets/svgs";
import { fonts } from "@/hooks/useCacheResources";

interface InputProp {
  control?: any;
  initialValue?: object | any;
  name?: string | number | any;
  isRequired: boolean | any;
  placeholderColor: string;
  placeHolder?: string;
  showLeftIcon?: boolean | any;
  inputFieldWidth?: any;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "url"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "name-phone-pad"
    | "twitter"
    | "web-search";
  maxLength: number;
  secureTextEntry: boolean;
  showToggleEye: boolean;
  toggleSecurePassword?: () => void;
  returnKeyType:
    | "none"
    | "done"
    | "search"
    | "default"
    | "go"
    | "next"
    | "send"
    | "previous"
    | "google"
    | "join"
    | "route"
    | "yahoo"
    | "emergency-call";
  allowFontScaling?: boolean;
  marginVertical?: number;
  errors?: any;
  width?: number | string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoComplete?:
    | "additional-name"
    | "address-line1"
    | "address-line2"
    | "birthdate-day"
    | "birthdate-full"
    | "birthdate-month"
    | "birthdate-year"
    | "cc-csc"
    | "cc-exp"
    | "cc-exp-day"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-number"
    | "country"
    | "current-password"
    | "email"
    | "family-name"
    | "gender"
    | "given-name"
    | "honorific-prefix"
    | "honorific-suffix"
    | "name"
    | "name-family"
    | "name-given"
    | "name-middle"
    | "name-middle-initial"
    | "name-prefix"
    | "name-suffix"
    | "new-password"
    | "nickname"
    | "one-time-code"
    | "organization"
    | "organization-title"
    | "password"
    | "password-new"
    | "postal-address"
    | "postal-address-country"
    | "postal-address-extended"
    | "postal-address-extended-postal-code"
    | "postal-address-locality"
    | "postal-address-region"
    | "postal-code"
    | "street-address"
    | "sms-otp"
    | "tel"
    | "tel-country-code"
    | "tel-national"
    | "tel-device"
    | "url"
    | "username"
    | "username-new"
    | "off";
  cursorColor?: string;
  maxFontSizeMultiplier?: number;
  numberOfLines?: number;
  textAlignVertical?: "auto" | "bottom" | "center" | "top";
  multiLine: boolean;
  style?: any;
  editable?: boolean | any;
  leftIcon?: any;
  handleToggleEye?: () => void;
  height?: any;
  isPortrait?: any;
}

export const CustomTextInput: React.FC<InputProp> = ({
  control,
  initialValue,
  name,
  isRequired,
  placeholderColor,
  placeHolder,
  keyboardType,
  maxLength,
  secureTextEntry,
  returnKeyType,
  allowFontScaling,
  errors,
  autoCapitalize = "sentences",
  maxFontSizeMultiplier = 1,
  numberOfLines,
  textAlignVertical = "auto",
  multiLine = false,
  editable = true,
  showToggleEye = false,
  handleToggleEye = () => {},
  height = 55,
  style,
  isPortrait,

  // cursorColor=''
}) => {
  // const { isPortrait } = useOrientation(); // Use the custom hook
  // console.log("width", width);
  // const inputWidth = width * 0.85; // 90% of the available width

  return (
    <Controller
      control={control}
      rules={{
        required: isRequired,
      }}
      render={({
        field: { ref, onChange, onBlur, value },
        fieldState: { error },
      }: any) => (
        <>
          <View
            style={[
              styles.inputView,
              {
                ...style,
                flexDirection: "row",
                height: 55,
                alignItems: "center",
              },
            ]}
          >
            <TextInput
              //   ref={ref}
              maxFontSizeMultiplier={maxFontSizeMultiplier}
              autoCapitalize={autoCapitalize}
              numberOfLines={numberOfLines}
              returnKeyType={returnKeyType}
              testID={name}
              value={value}
              textAlignVertical={textAlignVertical}
              allowFontScaling={allowFontScaling}
              placeholderTextColor={placeholderColor}
              placeholder={placeHolder}
              style={{
                color: Colors.light.text,
                fontFamily: fonts.primary.regular,
                fontSize: 13,
                height: "100%",
                flex: 1,
                borderColor: errors
                  ? Colors.light.danger
                  : Colors.light.inputBg,
              }}
              keyboardType={keyboardType}
              onBlur={onBlur}
              editable={editable}
              onChangeText={onChange}
              multiline={multiLine}
              // value={initialValue ? initialValue : value}
              maxLength={maxLength}
              secureTextEntry={secureTextEntry}
            />
            {showToggleEye && (
              <TouchableOpacity activeOpacity={0.8} onPress={handleToggleEye}>
                {!secureTextEntry ? (
                  <EyeCloseIcon width={20} height={20} />
                ) : (
                  <EyeOpenIcon width={20} height={20} />
                )}
              </TouchableOpacity>
            )}
          </View>
          {error?.message && (
            <Text style={styles.errorText}>{error.message}</Text>
          )}
        </>
      )}
      defaultValue={initialValue}
      name={name}
    />
  );
};

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: Colors.light.inputBg,
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 55,
    borderColor: Colors.light.inputBg,
    borderWidth: 1,
    marginTop: 4,
  },
  errorText: {
    fontSize: 13,
    fontFamily: fonts.primary.regular,
    color: Colors.light.danger,
  },
});
