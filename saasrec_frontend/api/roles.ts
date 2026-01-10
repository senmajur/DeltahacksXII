import apiClient from "./client";
import type { Role } from "./types";

export const rolesApi = {
  getRoles: async (): Promise<Role[]> => {
    const { data } = await apiClient.get(`/roles`);
    return data as Role[];
  },
};

export default rolesApi;
