import apiClient from "./axios";
import type { AuthSignupPayload, AuthLoginPayload, AuthResponse } from "./types";

export async function signup(email: string, password: string): Promise<AuthResponse> {
  const payload: AuthSignupPayload = { email, password };
  const { data } = await apiClient.post<AuthResponse>("/auth/signup", payload);
  return data;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const payload: AuthLoginPayload = { email, password };
  const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
  // backend sets HTTP-only cookies (access_token, refresh_token) and a readable cookie user_id
  return data;
}

export async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
}

const authApi = { signup, login, logout };
export default authApi;
