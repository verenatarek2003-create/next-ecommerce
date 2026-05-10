"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DummyJsonProductRepository } from "@/core/infrastructure/repositories/dummyjson-repositories";
import type { ProductFilters } from "@/core/domain/repositories";

const productRepo = new DummyJsonProductRepository();

export function useProductsQuery(filters?: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => productRepo.list(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 3,
  });
}
