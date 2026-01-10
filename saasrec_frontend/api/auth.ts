import apiClient from "./client";
import type { LoginPayload, SignupPayload, LoginResponse } from "./types";

export const authApi = {
  signup: async (payload: SignupPayload) => {
    const { data } = await apiClient.post("/auth/signup", payload);
    return data as unknown;
  },

  login: async (payload: LoginPayload) => {
    const { data } = await apiClient.post("/auth/login", payload);
    return data as LoginResponse;
  },

  logout: async () => {
    await apiClient.post("/auth/logout");
    return;
  },

  // Attempts to retrieve the current user id from backend (cookie-based session)
  getCurrentUserId: async (): Promise<string | number | null> => {
    try {
      const { data } = await apiClient.get("/auth/me");
      return data?.user_id ?? null;
    } catch (e) {
      return null;
    }
  },
};

export default authApi;
