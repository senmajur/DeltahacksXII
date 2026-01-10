import apiClient from "./client";
import type { CostType } from "./types";

export const costTypesApi = {
  getCostTypes: async (): Promise<CostType[]> => {
    const { data } = await apiClient.get(`/cost-types`);
    return data as CostType[];
  },
};

export default costTypesApi;
