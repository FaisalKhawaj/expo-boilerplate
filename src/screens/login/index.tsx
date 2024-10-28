import { Redirect, router } from "expo-router";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormType } from "./login.interface";
import { fonts } from "@/hooks/useCacheResources";
import { globalStyles } from "@/src/styles/globalStyles";
import { useValidations } from "@/src/validations/useValidations";
import { useLoginProps } from "./useLoginProps";
import { CustomTextInput } from "@/components/CustomTextInput";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/src/context/AuthContext";
import { SecureStorageHelper } from "@/src/helpers/SecureStorageHelper";

export const Login = () => {
  const { loginSchema } = useValidations();
  const { isLoggedin, setIsLoggedin }: any = useAuth();

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
    router.push("/(tabs)");
    setIsLoggedin(true);
    await SecureStorageHelper.setToken("access");
    await SecureStorageHelper.setRefreshToken("refresh");
    await SecureStorageHelper.setUserId(1);
  };

  if (isLoggedin) {
    return <Redirect href={"/(tabs)"} />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <View style={{ flexGrow: 1, padding: 20 }}>
        <Text style={globalStyles.screenTitle}>Sign in</Text>
        <View style={{ marginTop: 20 }} />

        <View style={{ marginTop: 50 }} />
        <Text style={globalStyles.fieldTitle}>Email</Text>
        <CustomTextInput
          control={control}
          name={"email"}
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
        <TouchableOpacity
          activeOpacity={0.8}
          // onPress={handleLogin}
          onPress={handleSubmit(handleLogin)}
          style={[globalStyles.buttonStyle, {}]}
        >
          <Text style={[globalStyles.buttonText]}>Login</Text>
        </TouchableOpacity>
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
      </View>
    </SafeAreaView>
  );
};
