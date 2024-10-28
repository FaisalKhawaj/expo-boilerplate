import { useAuth } from "@/src/context/AuthContext";
import { SecureStorageHelper } from "@/src/helpers/SecureStorageHelper";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import Login from "./(auth)";
import { Colors } from "@/constants/Colors";

export default function Page() {
  const { isLoggedin, setIsLoggedin }: any = useAuth();

  const [loading, setLoading] = useState(false);
  const checkLoggedIn = async () => {
    try {
      setLoading(true);
      //   const res = await AsyncStorage.getItem("LoggedIn");
      const res = await SecureStorageHelper.getToken();
      console.log("resres", res);
      if (res) {
        setIsLoggedin(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error ", error);
    }
  };

  useEffect(() => {
    checkLoggedIn();
    if (isLoggedin) {
      setIsLoggedin(true);
      router.replace("/(tabs)");
    }
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      {loading ? <ActivityIndicator size={"large"} /> : <Login />}
    </SafeAreaView>
  );
}
