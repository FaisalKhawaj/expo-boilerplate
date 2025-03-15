import axios from "axios";

// Increase timeout for development environment
const TIMEOUT = __DEV__ ? 40000 : 10000;

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: TIMEOUT,
  withCredentials: true, // Important for session cookies
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(
      `🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("❌ API Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // Network error (no connection)
    if (!error.response) {
      // Don't reject auth-related requests on network errors
      if (error.config?.url?.includes("/auth/")) {
        console.log("🌐 Network error on auth request - will retry:", {
          url: error.config.url,
        });
        return Promise.reject({
          ...error,
          isNetworkError: true,
        });
      }
    }

    // Expected failures that should only be logged, not shown as errors
    const expectedFailures = [
      "/auth/me", // Auth check for non-logged in users
      // Add other endpoints that can fail expectedly
    ];

    if (expectedFailures.includes(error.config?.url)) {
      console.log("🌐 API Request failed (expected):", {
        url: error.config.url,
        status: error.response?.status,
      });
      return Promise.reject(error);
    }

    // Unexpected failures that should show error popup
    console.error("❌ API Response Error:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
);

// Remove or modify the second error interceptor since it's redundant
// and is causing double error logging
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Only log auth errors, don't console.error them
    if (axios.isAxiosError(error)) {
      console.log("🔒 Auth Status:", error.response?.status);
    }
    return Promise.reject(error);
  }
);
