import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { ICourse } from "@/types";

interface UserCourseResponse {
  course: ICourse;
  lessons_count?: number;
}

export function useGetUserCourseBySlug(slug?: string) {
  const { data, isLoading, error, refetch } = useQuery<UserCourseResponse>({
    queryKey: [QUERY_KEYS.userCourseBySlug, slug],
    queryFn: async () => {
      const { data } = await customAxios.get(`user/courses/${slug}`);
      return data;
    },
    enabled: !!slug,
  });

  return {
    course: data?.course,
    lessonsCount: data?.lessons_count || 0,
    isLoading,
    error,
    refetch,
  };
}

