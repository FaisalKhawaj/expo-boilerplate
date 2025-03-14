import { AuthErrorResponse, User } from "./auth/types";

export function handleAuthResponse<T extends User>(response: {
  data: T | AuthErrorResponse;
}): T {
  if (
    "error" in response.data ||
    ("success" in response.data && response.data.success === false) ||
    ("status" in response.data && response.data.status !== 200)
  ) {
    throw new Error(
      (response.data as AuthErrorResponse).error || "Authentication error"
    );
  }

  return response.data as T;
}
