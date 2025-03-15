import React from "react";
import {  router, useLocalSearchParams } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Haptics from "expo-haptics";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { LoginFormType } from "./login.interface";
import { fonts } from "@/hooks/useCacheResources";
import { globalStyles } from "@/src/styles/globalStyles";
import { useValidations } from "@/src/validations/useValidations";
import { useLoginProps } from "./useLoginProps";
import { CustomTextInput } from "@/components/CustomTextInput";
import { translate } from "@/src/locales";
import { LabelButton, LabelButtonVariation } from "@/components/LabelButton";
import { useEffect } from "react";
import { useAuth } from "@/src/context/auth";
import { MotiView, ScrollView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { LogoIcon } from "@/components/LogoIcon";
import { z } from "zod";
import { useLogin } from "@/src/services/auth/useLogin";

export const Login = () => {
  const { loginSchema } = useValidations();
  const { isAuthCheckDone, signIn, isAuthenticated }: any = useAuth();
  const { message } = useLocalSearchParams<{ message?: string }>();
  const { mutateAsync: login, isPending, isSuccess, error } = useLogin();
  console.log("isPending", isPending);
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
    watch,
    formState: { isValid },
  } = useForm<LoginFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });
  const formData = watch();
  console.log("formData", formData);
  const handleLogin = async (data: LoginFormType) => {
    console.log("data:", data);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const user = await login({
        email: data.email.trim(),
        password: data.password,
      });
      await signIn(user);
    } catch (error: any) {
      console.error(error, "error");
      const errorMessage =
        error.message ||
        error.response?.data?.error ||
        error.response?.data?.message ||
        "";
      // Handle verification required error
      if (
        error.verificationData ||
        errorMessage.includes("Email not verified")
      ) {
        // router.replace({
        //   pathname: "/(auth)/[email]/verify",
        //   params: {
        //     data.email,
        //     verificationCodeExpires: error.verificationData?.verificationCodeExpires,
        //   },
        // });
        return;
      }

      // Handle other errors
      Alert.alert(
        "Login Failed",
        errorMessage || "Please check your credentials and try again"
      );
    }

    // await SecureStorageHelper.setToken("access");
    // await SecureStorageHelper.setRefreshToken("refresh");
    // await SecureStorageHelper.setUserId(1);
  };

  const [showPassField, setShowPassField] = React.useState(false);
  const handleContinueEmail = () => {
    z.string().email("Email is Invalid");
    if (formData.email.length > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setShowPassField(true);
      return;
    } else {
      Alert.alert("Please enter an email");
      return;
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-background-screen dark:bg-background-darkScreen">
      <ScrollView
        contentContainerClassName="flex-grow"
        className="flex-grow p-5 bg-background-screen dark:bg-background-darkScreen"
      >
        <MotiView
          from={{ translateY: 0 }}
          animate={{
            translateY: 10,
          }}
          transition={{
            type: "timing",
            duration: 1500,
            loop: true,
            repeatReverse: true,
          }}
          className="items-center mb-6"
        >
          <LogoIcon variant="full" width={240} height={80} />
        </MotiView>
        <View className="mt-6" />

        <View className="items-center mb-4">
          <Text className="text-2xl text-zinc-900 dark:text-zinc-100 font-semibold">
            Log in or sign up
          </Text>
        </View>

        <View className="gap-5">
          <CustomTextInput
            control={control}
            name={"email"}
            label={"Email"}
            placeholder={translate("email")}
            keyboardType="email-address"
            returnKeyType="done"
            isRequired={true}
            placeholderTextColor={"#71717A"}
            onSubmitEditing={handleContinueEmail}
          />

          <MotiView
            // from={{ translateY: 0 }}
            animate={{
              height: showPassField ? 100 : 0,
              opacity: showPassField ? 1 : 0,
            }}
            transition={{ type: "timing", duration: 300 }}
            style={{ overflow: "hidden" }}
          >
            <View className="relative">
              <CustomTextInput
                control={control}
                name={"password"}
                label={"Password"}
                placeholder={translate("password")}
                keyboardType="default"
                returnKeyType="done"
                isRequired={true}
                secureTextEntry={false}
                placeholderTextColor={"#71717A"}
              />

              <TouchableOpacity className="absolute self-center right-3 top-5 bottom-0 justify-center ">
                <Ionicons
                  name={hidePassword ? "eye-off" : "eye"}
                  size={24}
                  color="#71717A"
                />
              </TouchableOpacity>
            </View>

            <LabelButton
              onPress={() => {
                // router.push({
                //   pathname:"/(auth)/forgot-password",
                //   params:{email}
                // })
              }}
              className="self-end mt-1 h-auto p-0"
              variation={LabelButtonVariation.ghost}
            >
              Forgot Password?
            </LabelButton>
          </MotiView>
        </View>

        <View className="mt-6" />

        <LabelButton
          disabled={isPending}
          loading={isPending}
          onPress={
            showPassField ? handleSubmit(handleLogin) : handleContinueEmail
          }
          variation={LabelButtonVariation.outline}
        >
          {isPending
            ? "Logging in..."
            : showPassField
            ? translate("login")
            : "Continue"}
        </LabelButton>
        <View className="mt-5" />
        <Text style={[globalStyles.dontHaveAcc, { textAlign: "center" }]}>
          Don't have an account?{" "}
          <Text
            onPress={() => router.push("/signup")}
            style={{ fontFamily: fonts.primary.bold }}
          >
            Sign up
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
