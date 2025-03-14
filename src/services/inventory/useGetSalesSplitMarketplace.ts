import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";

export function useGetSalesSplitMarketplace() {
  return useQuery({
    queryKey: ["sales-split-marketplace"],
    queryFn: async () => {
      const { data } = await api.get("/products/sales-split-marketplace");
      return data;
    },
    enabled: true,
  });
}
