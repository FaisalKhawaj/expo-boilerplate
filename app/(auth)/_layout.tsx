import { Slot, Stack } from "expo-router";
import React from "react";
const RootLayout = () => {
  console.log("main RootLayout");
  // const url = Linking.useURL();

  // createSess

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />

        <Stack.Screen name="signup" />
      </Stack>
    </>
  );
};

export default RootLayout;
