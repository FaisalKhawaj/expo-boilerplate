import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const SecureStorageHelper = {
  getToken: async () => {
    if (Platform.OS === "web") {
      return await localStorage.getItem("accessToken");
    } else return await SecureStore.getItemAsync("accessToken");
  },
  getRefreshToken: async () => {
    if (Platform.OS === "web") {
      return await localStorage.getItem("refreshToken");
    } else return await SecureStore.getItemAsync("refreshToken");
  },
  getUserId: async () => {
    if (Platform.OS === "web") {
      return await localStorage.getItem("userId");
    } else return await SecureStore.getItemAsync("userId");
  },
  setToken: async (token: string) => {
    if (Platform.OS === "web") {
      return await localStorage.setItem("accessToken", JSON.stringify(token));
    } else await SecureStore.setItemAsync("accessToken", JSON.stringify(token));
  },
  setRefreshToken: async (token: string) => {
    if (Platform.OS === "web") {
      return await localStorage.setItem("refreshToken", JSON.stringify(token));
    } else
      await SecureStore.setItemAsync("refreshToken", JSON.stringify(token));
  },
  setUserId: async (userId: number) => {
    if (Platform.OS === "web") {
      return await localStorage.setItem("userId", JSON.stringify(userId));
    } else await SecureStore.setItemAsync("userId", JSON.stringify(userId));
  },
  removeUserId: async () => {
    if (Platform.OS === "web") {
      return await localStorage.removeItem("userId");
    } else await SecureStore.deleteItemAsync("userId");
  },
  removeToken: async () => {
    if (Platform.OS === "web") {
      return await localStorage.removeItem("accessToken");
    } else await SecureStore.deleteItemAsync("accessToken");
  },
  removeRefreshToken: async () => {
    if (Platform.OS === "web") {
      return await localStorage.removeItem("refreshToken");
    } else await SecureStore.deleteItemAsync("refreshToken");
  },
};
