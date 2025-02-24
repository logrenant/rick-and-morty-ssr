import { create } from "zustand";
import { Filters, Pagination } from "@/lib/api";
import { updateUrlParams } from "@/lib/lib";

type CharacterStore = {
  pagination: Pagination;
  setPagination: (pagination: Pagination) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
};

export const useCharacterStore = create<CharacterStore>((set) => ({
  filters: { status: "", gender: "" },
  setFilters: (filters) => {
    const updatedFilters = {
      ...filters,
      status: filters.status === "all" ? "" : filters.status,
      gender: filters.gender === "all" ? "" : filters.gender,
    };

    set({ filters: updatedFilters });
    updateUrlParams(updatedFilters);
  },
  pagination: { page: 1 },
  setPagination: (pagination) => {
    set({ pagination });
    updateUrlParams({ page: pagination.page });
  },
}));
