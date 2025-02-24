"use client";
import { useEffect } from "react";
import { useCharacterStore } from "@/store/useCharacterStore";

export const UrlParamInitializer = () => {
  const { setFilters, setPagination } = useCharacterStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setFilters({
      status: params.get("status") || undefined,
      gender: params.get("gender") || undefined,
    });

    setPagination({
      page: Number(params.get("page")) || 1,
    });
  }, [setFilters, setPagination]);

  return null;
};
