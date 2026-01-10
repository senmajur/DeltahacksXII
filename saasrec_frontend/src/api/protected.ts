import apiClient from "./axios";
import type { ClubCreate, ClubUpdate, ProfileUpdate, UserRole } from "./types";

export async function createClub(data: ClubCreate) {
  const { data: res } = await apiClient.post("/clubs/", data);
  return res;
}

export async function updateClub(club_id: number | string, payload: ClubUpdate) {
  const { data } = await apiClient.put(`/clubs/${club_id}`, payload);
  return data;
}

export async function deleteClub(club_id: number | string) {
  await apiClient.delete(`/clubs/${club_id}`);
}

export async function updateProfile(user_id: number | string, payload: ProfileUpdate) {
  const { data } = await apiClient.put(`/profiles/${user_id}`, payload);
  return data;
}

export async function getUserRoles(user_id: number | string) {
  const { data } = await apiClient.get(`/user-roles/users/${user_id}`);
  return data;
}

export async function assignUserRole(payload: UserRole) {
  const { data } = await apiClient.post(`/user-roles/`, payload);
  return data;
}

// Join a club for a user. Some older frontends expect an endpoint like
// POST /users/:user_id/join-club/:clubId — support that shape for compatibility.
export async function joinClub(user_id: number | string, club_id: number | string) {
  // Try the modern "POST /users/:user_id/clubs" first, fall back to legacy URL.
  try {
    const { data } = await apiClient.post(`/users/${user_id}/clubs`, { club_id });
    return data;
  } catch (e) {
    // fallback to legacy endpoint used in some pages
    const { data } = await apiClient.post(`/users/${user_id}/join-club/${club_id}`);
    return data;
  }
}

const protectedApi = {
  createClub,
  updateClub,
  deleteClub,
  updateProfile,
  getUserRoles,
  assignUserRole,
  joinClub,
};

export default protectedApi;
