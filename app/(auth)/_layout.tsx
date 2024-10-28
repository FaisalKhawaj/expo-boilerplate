import { Slot, Stack } from "expo-router";
import React from "react";
const RootLayout = () => {
  console.log("main RootLayout");
  // const url = Linking.useURL();

  // createSess

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />

        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default RootLayout;
