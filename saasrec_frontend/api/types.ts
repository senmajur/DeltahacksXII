// Shared API types

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

export interface Club {
  id: number;
  name: string;
  description?: string | null;
  category_id?: number | null;
  contact_email?: string | null;
  created_at?: string;
}

export interface ClubCreate {
  name: string;
  description?: string;
  category_id?: number;
  contact_email?: string;
}

export interface ClubUpdate {
  name?: string;
  description?: string;
  category_id?: number | null;
  contact_email?: string | null;
}

export interface ClubListParams {
  limit?: number;
  offset?: number;
  search?: string;
  category_id?: number;
}

export interface Profile {
  id: number;
  user_id: number;
  full_name?: string | null;
  city?: string | null;
  province?: string | null;
  created_at?: string;
}

export interface ProfileUpdate {
  full_name?: string;
  city?: string;
  province?: string;
}

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

export interface UserRole {
  user_id: number;
  role_id: number;
}

export interface HealthResponse {
  status: string;
  details?: Record<string, unknown>;
}
