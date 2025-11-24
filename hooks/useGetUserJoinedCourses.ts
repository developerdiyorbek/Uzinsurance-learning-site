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

export function useGetUserJoinedCourse(slug?: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.userJoinedCourseBySlug, slug],
    queryFn: async () => {
      const { data } = await customAxios.get(`user/user-course/${slug}`);
      return data;
    },
    enabled: !!slug,
  });

  return {
    course: data?.course,
    isLoading,
    error,
    refetch,
  };
}
