import { api } from "../api/api";
import { User } from "../auth/types";
import { handleAuthResponse } from "../utils";

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/auth/me");
  return handleAuthResponse(response);
};
