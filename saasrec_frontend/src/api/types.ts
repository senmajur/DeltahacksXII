// Frontend copies of backend request/response shapes.

// Auth
export interface AuthSignupPayload {
  email: string;
  password: string;
}

export interface AuthLoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user_id: string;
}

// Health
export interface HealthResponse {
  status: string;
}

// Lookup types
export interface Category {
  id: number;
  name: string;
}

export interface CostType {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
}

// Clubs
export interface Club {
  id: number | string;
  name: string;
  description?: string | null;
  category_id?: number | null;
  contact_email?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ClubCreate {
  name: string;
  description?: string;
  category_id?: number | null;
  contact_email?: string | null;
}

export interface ClubUpdate {
  name?: string;
  description?: string | null;
  category_id?: number | null;
  contact_email?: string | null;
}

// Profiles
export interface Profile {
  id: number | string;
  user_id: number | string;
  full_name?: string | null;
  city?: string | null;
  province?: string | null;
  created_at?: string;
}

export interface ProfileUpdate {
  full_name?: string | null;
  city?: string | null;
  province?: string | null;
}

// User roles
export interface UserRole {
  user_id: number | string;
  role_id: number;
}

// Generic query params for clubs
export interface ClubsQuery {
  skip?: number;
  limit?: number;
  search?: string;
  category_id?: number;
}

export interface ApiError {
  message?: string;
  [key: string]: any;
}

export type Paged<T> = T[];

// Legacy compatibility types (from top-level `api/types.ts`) - keep names used across the codebase
export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  full_name?: string;
}

export interface LoginResponse {
  user_id: number | string;
}

export interface ClubListParams {
  limit?: number;
  offset?: number;
  search?: string;
  category_id?: number;
}

// Re-export legacy type names to minimize migration friction
export type CategoryList = Category[];
export type CostTypeList = CostType[];

