import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export function useGetTeacherStatistics() {
  const {
    data: statistics,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.teacherStatistics],
    queryFn: async () => {
      const { data } = await customAxios.get("teacher/statistics");
      return data;
    },
  });

  return { statistics: statistics?.data, isLoading, error };
}
