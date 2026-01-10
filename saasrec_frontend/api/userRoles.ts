import apiClient from "./client";
import type { UserRole } from "./types";

export const userRolesApi = {
  getUserRoles: async (userId: number): Promise<UserRole[]> => {
    const { data } = await apiClient.get(`/users/${userId}/roles`);
    return data as UserRole[];
  },

  assignRole: async (payload: UserRole): Promise<void> => {
    await apiClient.post(`/user-roles`, payload);
  },
};

export default userRolesApi;
