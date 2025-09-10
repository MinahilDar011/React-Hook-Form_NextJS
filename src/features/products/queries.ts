"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, postProduct, putProduct, removeProduct } from "./api";

export const PRODUCT_QUERY_KEYS = {
  all: ["products"],
};

export const useGetProductsQuery = () => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.all,
    queryFn: getProducts,
    staleTime: 1000,
  });
};

export const usePostProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.all });
    },
  });
};

export const usePutProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updatedData }: { id: number; updatedData: { title?: string; price?: number } }) =>
      putProduct(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.all });
    },
  });
};

export const useRemoveProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.all });
    },
  });
};
