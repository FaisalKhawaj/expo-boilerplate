import { getDeviceId } from "../notifications/notifications";
import { api } from "./api";

export const logout = async (): Promise<void> => {
  const deviceId = getDeviceId();
  await api.post("/auth/logout", { deviceId });
};
