import apiClient from "./client";
import type { Club, ClubCreate, ClubUpdate, ClubListParams } from "./types";

export const clubsApi = {
  listClubs: async (params?: ClubListParams): Promise<Club[]> => {
    const { data } = await apiClient.get("/clubs", { params });
    return data as Club[];
  },

  getClub: async (clubId: number): Promise<Club> => {
    const { data } = await apiClient.get(`/clubs/${clubId}`);
    return data as Club;
  },

  createClub: async (payload: ClubCreate): Promise<Club> => {
    const { data } = await apiClient.post(`/clubs`, payload);
    return data as Club;
  },

  updateClub: async (clubId: number, payload: ClubUpdate): Promise<Club> => {
    const { data } = await apiClient.put(`/clubs/${clubId}`, payload);
    return data as Club;
  },

  deleteClub: async (clubId: number): Promise<void> => {
    await apiClient.delete(`/clubs/${clubId}`);
  },

  // List clubs a user is a member of
  listUserClubs: async (userId: number): Promise<Club[]> => {
    const { data } = await apiClient.get(`/users/${userId}/clubs`);
    return data as Club[];
  },

  // Join a club for a given user. Backend should accept POST to /users/:userId/clubs
  joinClub: async (userId: number, clubId: number): Promise<any> => {
    const { data } = await apiClient.post(`/users/${userId}/clubs`, { club_id: clubId });
    return data;
  },
};

export default clubsApi;
