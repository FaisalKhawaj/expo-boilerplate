import { api } from "../api/api";
import { getDeviceId } from "../notifications/notifications";

export const logout = async (): Promise<void> => {
  const deviceId = getDeviceId();
  await api.post("/auth/logout", { deviceId });
};
