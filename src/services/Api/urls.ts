export const URLS = {
  register: "/api/client/register/",
  login: "api/auth/token/obtain/",
  userInfo: (userId: any) => `api/${userId}/`,
  refreshToken: `api/token/refresh/`,
  requestResetPass: `api/auth/request-password-reset/`,
  resetPassword: `api/auth/reset-password/`,
};
