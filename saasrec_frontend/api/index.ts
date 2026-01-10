/* Bridge module: keep legacy `api/*` exports working by re-exporting
   implementations from `src/api/*`. This allows gradual migration.

   Note: prefer importing from `src/api` in new code. This file exists
   only to avoid breaking existing imports that reference `api/*`.
*/

/* Bridge module: re-export implementations from `src/api/*` so legacy imports continue to work.
   This file intentionally provides the same named exports that older code expects
   while keeping the canonical implementations under `src/api`.
*/

export * from "../src/api/types";

import apiClient from "../src/api/axios";
import * as authModule from "../src/api/auth";
import * as publicModule from "../src/api/public";
import * as protectedModule from "../src/api/protected";

export { apiClient };

export const authApi = {
  signup: authModule.signup,
  login: authModule.login,
  logout: authModule.logout,
};

export const clubsApi = {
  listClubs: publicModule.getClubs,
  getClub: publicModule.getClub,
  createClub: protectedModule.createClub,
  updateClub: protectedModule.updateClub,
  deleteClub: protectedModule.deleteClub,
  listUserClubs: protectedModule.getUserRoles ? undefined : undefined,
  joinClub: protectedModule.joinClub,
};

export const profileApi = {
  getProfile: publicModule.getProfile,
  updateProfile: protectedModule.updateProfile,
};

export const categoriesApi = {
  getCategories: publicModule.getCategories,
};

export const costTypesApi = {
  getCostTypes: publicModule.getCostTypes,
};

export const rolesApi = {
  getRoles: publicModule.getRoles,
};

export const userRolesApi = {
  getUserRoles: protectedModule.getUserRoles,
  assignRole: protectedModule.assignUserRole,
};

export const healthApi = {
  getHealth: publicModule.getHealth,
};

export const auth = authApi;
export const clubs = clubsApi;
export const profile = profileApi;
export const categories = categoriesApi;
export const costTypes = costTypesApi;
export const roles = rolesApi;
export const userRoles = userRolesApi;
export const health = healthApi;

export default {
  apiClient,
  authApi,
  clubsApi,
  profileApi,
  categoriesApi,
  costTypesApi,
  rolesApi,
  userRolesApi,
  healthApi,
};
