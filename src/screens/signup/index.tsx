import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { globalStyles } from "@/src/styles/globalStyles";

export const Signup = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={globalStyles.screenTitle}>Sign up</Text>
      <View style={{ marginTop: 20 }} />
    </SafeAreaView>
  );
};
