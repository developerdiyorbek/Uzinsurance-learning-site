import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export function useGetUserJoinedCourses() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.userJoinedCourses],
    queryFn: async () => {
      const { data } = await customAxios.get("/user/user-courses");
      return data;
    },
  });

  return {
    courses: data?.courses || [],
    total: data?.total_courses || 0,
    isLoading,
    error,
    refetch,
  };
}
