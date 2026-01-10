import apiClient from "./client";
import type { Profile, ProfileUpdate } from "./types";

export const profileApi = {
  getProfile: async (userId: number): Promise<Profile> => {
    const { data } = await apiClient.get(`/profiles/${userId}`);
    return data as Profile;
  },

  updateProfile: async (userId: number, payload: ProfileUpdate): Promise<Profile> => {
    const { data } = await apiClient.put(`/profiles/${userId}`, payload);
    return data as Profile;
  },
};

export default profileApi;
