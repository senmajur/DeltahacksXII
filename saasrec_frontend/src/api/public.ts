import apiClient from "./axios";
import type {
  HealthResponse,
  Category,
  CostType,
  Role,
  Club,
  ClubsQuery,
  Profile,
} from "./types";

export async function getHealth(): Promise<HealthResponse> {
  const { data } = await apiClient.get<HealthResponse>("/health");
  return data;
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<Category[]>("/categories/");
  return data;
}

export async function getCostTypes(): Promise<CostType[]> {
  const { data } = await apiClient.get<CostType[]>("/cost-types/");
  return data;
}

export async function getRoles(): Promise<Role[]> {
  const { data } = await apiClient.get<Role[]>("/roles/");
  return data;
}

export async function getClubs(query: ClubsQuery = {}): Promise<Club[]> {
  const params: Record<string, any> = {};
  if (typeof query.skip !== "undefined") params.offset = query.skip;
  if (typeof query.limit !== "undefined") params.limit = query.limit;
  if (query.search) params.search = query.search;
  if (typeof query.category_id !== "undefined") params.category_id = query.category_id;

  const { data } = await apiClient.get<Club[]>("/clubs/", { params });
  return data;
}

export async function getClub(club_id: number | string): Promise<Club> {
  const { data } = await apiClient.get<Club>(`/clubs/${club_id}`);
  return data;
}

export async function getProfile(user_id: number | string): Promise<Profile> {
  const { data } = await apiClient.get<Profile>(`/profiles/${user_id}`);
  return data;
}

const publicApi = {
  getHealth,
  getCategories,
  getCostTypes,
  getRoles,
  getClubs,
  getClub,
  getProfile,
};

export default publicApi;
