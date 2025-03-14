import { Redirect, router, useLocalSearchParams } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  SafeAreaView,
  View,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Haptics from "expo-haptics";

import { useForm } from "react-hook-form";
import { LoginFormType } from "./login.interface";
import { fonts } from "@/hooks/useCacheResources";
import { globalStyles } from "@/src/styles/globalStyles";
import { useValidations } from "@/src/validations/useValidations";
import { useLoginProps } from "./useLoginProps";
import { CustomTextInput } from "@/components/CustomTextInput";
import { Colors } from "@/constants/Colors";
import { SecureStorageHelper } from "@/src/helpers/SecureStorageHelper";
import { translate } from "@/src/locales";
import { LabelButton, LabelButtonVariation } from "@/components/LabelButton";
import { useEffect } from "react";
import { useAuth } from "@/src/context/auth";

const { width, height } = Dimensions.get("window");

export const Login = () => {
  const { loginSchema } = useValidations();
  const { isAuthCheckDone, isAuthenticated }: any = useAuth();
  const { message } = useLocalSearchParams<{ message?: string }>();

  useEffect(() => {
    if (isAuthCheckDone && isAuthenticated!) {
      // Hide splash screen only when we're sure we should show login
      SplashScreen.hideAsync().catch((e) =>
        console.log("[LoginScreen] Error hiding splash screen:", e)
      );
    }
  }, [isAuthenticated, isAuthCheckDone]);

  useEffect(() => {
    if (message) {
      Alert.alert("Success", message);
      // Clear the message from navigation state after showing
      router.setParams({ message: undefined });
    }
  }, [message]);
  const { hidePassword, togglePassword } = useLoginProps();
  const handleSignup = () => {};
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormType) => {
    console.log("data:", data);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    await SecureStorageHelper.setToken("access");
    await SecureStorageHelper.setRefreshToken("refresh");
    await SecureStorageHelper.setUserId(1);
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Colors.light.background }}
      >
        <View style={{ flexGrow: 1, padding: 20 }}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={
              height < 600 ? -50 : Platform.OS == "ios" ? -60 : -120
            }
            style={{ flexGrow: 1, padding: 20 }}
          >
            <Text style={globalStyles.screenTitle}>{translate("login")}</Text>
            <View style={{ marginTop: 20 }} />

            <View style={{ marginTop: 50 }} />
            <Text style={globalStyles.fieldTitle}>Email</Text>
            <CustomTextInput
              control={control}
              name={"email"}
              placeHolder={translate("email")}
              isPortrait={true}
              keyboardType="email-address"
              returnKeyType="done"
              isRequired={true}
              secureTextEntry={false}
              placeholderColor={""}
              maxLength={70}
              showToggleEye={false}
              multiLine={false}
              // style={{ width: containerWidth }}
            />

            <View style={{ marginTop: 30 }} />
            <Text style={globalStyles.fieldTitle}>Password</Text>
            <CustomTextInput
              control={control}
              name={"password"}
              placeHolder={translate("password")}
              keyboardType="default"
              returnKeyType="done"
              isRequired={true}
              placeholderColor={""}
              maxLength={70}
              multiLine={false}
              secureTextEntry={hidePassword}
              showToggleEye={true}
              isPortrait={true}
              handleToggleEye={togglePassword}
              // style={{ width: containerWidth }}
            />
            <View style={{ marginTop: 30 }} />

            <LabelButton
              disabled={false}
              title={translate("login")}
              onPress={handleSubmit(handleLogin)}
              variation={LabelButtonVariation.success}
            >
              {translate("login")}
            </LabelButton>
            <View style={{ marginTop: 20 }} />
            <Text style={[globalStyles.dontHaveAcc, { textAlign: "center" }]}>
              Don't have an account?{" "}
              <Text
                onPress={() => router.push("/signup")}
                style={{ fontFamily: fonts.primary.bold }}
              >
                Sign up
              </Text>
            </Text>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
