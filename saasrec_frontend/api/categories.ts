import apiClient from "./client";
import type { Category } from "./types";

export const categoriesApi = {
  getCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get(`/categories`);
    return data as Category[];
  },
};

export default categoriesApi;
