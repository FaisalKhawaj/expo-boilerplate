import { User } from "../auth/types";
import { handleAuthResponse } from "../utils";
import { api } from "./api";

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/auth/me");
  return handleAuthResponse(response);
};
