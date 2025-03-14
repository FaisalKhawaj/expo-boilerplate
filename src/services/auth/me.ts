import { api } from "../api/api";
import { handleAuthResponse } from "../utils";
import { User } from "./types";

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/auth/me");
  return handleAuthResponse(response);
};
