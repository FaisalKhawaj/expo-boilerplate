import { api } from "../api/api";
import { AuthErrorResponse, LoginCredentials, User } from "../auth/types";
import { handleAuthResponse } from "../utils";

export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const response = await api.post<User | AuthErrorResponse>(
      "/auth/login",
      credentials
    );
    return handleAuthResponse(response);
  } catch (error: any) {
    if (
      error.response?.status === 401 &&
      error.response?.data?.error?.includes("Email not verified")
    ) {
      // Include all verification data from the response
      const verificationData = {
        message: error.response.data.error,
        userId: error.response.data.userId || credentials.email,
        verificationCodeExpires:
          error.response.data.verificationData?.verificationCodeExpires,
      };

      throw {
        message: "Email not verified",
        status: 401,
        verificationData,
      };
    }
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
