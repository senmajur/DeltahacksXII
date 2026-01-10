import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import publicApi from './public';
import protectedApi from './protected';
import type { ClubsQuery, Club, Category, CostType, Role, Profile, UserRole, ClubCreate, ClubUpdate, ProfileUpdate } from './types';

// Keys
const KEYS = {
  clubs: (q?: ClubsQuery) => ['clubs', q] as const,
  club: (id: string | number) => ['club', id] as const,
  categories: ['categories'] as const,
  costTypes: ['costTypes'] as const,
  roles: ['roles'] as const,
  profile: (id: string | number) => ['profile', id] as const,
  userRoles: (id: string | number) => ['userRoles', id] as const,
};

// Public queries
export function useClubs(query?: ClubsQuery) {
  return useQuery(KEYS.clubs(query), () => publicApi.getClubs(query));
}

export function useClub(club_id: string | number) {
  return useQuery(KEYS.club(club_id), () => publicApi.getClub(club_id));
}

export function useCategories() {
  return useQuery(KEYS.categories, () => publicApi.getCategories());
}

export function useCostTypes() {
  return useQuery(KEYS.costTypes, () => publicApi.getCostTypes());
}

export function useRoles() {
  return useQuery(KEYS.roles, () => publicApi.getRoles());
}

export function useProfile(user_id: string | number) {
  return useQuery(KEYS.profile(user_id), () => publicApi.getProfile(user_id));
}

// Protected mutations / queries
export function useCreateClub() {
  const qc = useQueryClient();
  return useMutation((payload: ClubCreate) => protectedApi.createClub(payload), {
    onSuccess: () => qc.invalidateQueries(KEYS.clubs()),
  });
}

export function useUpdateClub() {
  const qc = useQueryClient();
  return useMutation(({ id, payload }: { id: string | number; payload: ClubUpdate }) => protectedApi.updateClub(id, payload), {
    onSuccess: (_data, vars) => {
      qc.invalidateQueries(KEYS.clubs());
      qc.invalidateQueries(KEYS.club(vars.id));
    },
  });
}

export function useDeleteClub() {
  const qc = useQueryClient();
  return useMutation((id: string | number) => protectedApi.deleteClub(id), {
    onSuccess: () => qc.invalidateQueries(KEYS.clubs()),
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation(({ id, payload }: { id: string | number; payload: ProfileUpdate }) => protectedApi.updateProfile(id, payload), {
    onSuccess: (_data, vars) => qc.invalidateQueries(KEYS.profile(vars.id)),
  });
}

export function useUserRoles(user_id: string | number) {
  return useQuery(KEYS.userRoles(user_id), () => protectedApi.getUserRoles(user_id));
}

export function useAssignUserRole() {
  const qc = useQueryClient();
  return useMutation((payload: UserRole) => protectedApi.assignUserRole(payload), {
    onSuccess: () => qc.invalidateQueries(KEYS.roles),
  });
}

// joinClub helper as mutation
export function useJoinClub() {
  const qc = useQueryClient();
  return useMutation(({ user_id, club_id }: { user_id: string | number; club_id: string | number }) => protectedApi.joinClub(user_id, club_id), {
    onSuccess: () => qc.invalidateQueries(KEYS.clubs()),
  });
}

export default {
  useClubs,
  useClub,
  useCategories,
  useCostTypes,
  useRoles,
  useProfile,
  useCreateClub,
  useUpdateClub,
  useDeleteClub,
  useUpdateProfile,
  useUserRoles,
  useAssignUserRole,
  useJoinClub,
};
