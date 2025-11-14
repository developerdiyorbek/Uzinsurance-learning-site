import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export function useGetUserCourses() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.userCourses],
    queryFn: async () => {
      const { data } = await customAxios.get("user/courses");
      return data;
    },
  });

  return {
    courses: data?.courses || [],
    isLoading,
    error,
    refetch,
  };
}
