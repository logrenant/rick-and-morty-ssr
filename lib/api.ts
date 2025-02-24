import { useQuery } from "@tanstack/react-query";
import { useCharacterStore } from "@/store/useCharacterStore";

import { Character } from "@/types/character";

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface Filters {
  gender?: string;
  status?: string;
}

export interface Pagination {
  page: number;
}

const getParams = (filters: Filters, pagination: Pagination): string => {
  const params = new URLSearchParams();

  if (filters.gender) params.append("gender", filters.gender);
  if (filters.status) params.append("status", filters.status);
  if (pagination.page) params.append("page", pagination.page.toString());

  return params.toString() ? `?${params.toString()}` : "";
};

const getUsers = async (
  filters: Filters,
  pagination: Pagination,
): Promise<ApiResponse> => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character${getParams(filters, pagination)}`,
  );
  if (!res.ok) throw new Error("Failed to fetch characters");
  return await res.json();
};

export const useCharacters = () => {
  const { filters, pagination } = useCharacterStore();

  return useQuery({
    queryKey: ["characters", filters.gender, filters.status, pagination.page],
    queryFn: () => getUsers(filters, pagination),
  });
};
