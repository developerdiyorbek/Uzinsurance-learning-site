import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export function useGetStatistics() {
  const {
    data: statistics,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.statistics],
    queryFn: async () => {
      const { data } = await customAxios.get("admin/statistics");
      return data;
    },
  });

  return { statistics: statistics?.data, isLoading, error };
}
