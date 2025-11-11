import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export function useGetLessonsByCourseSlug(course_slug: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.lessonsByCourseSlug, course_slug],
    queryFn: async () => {
      const { data } = await customAxios.get(`admin/lessons/${course_slug}`);
      return data;
    },
    enabled: !!course_slug,
  });

  return {
    lessons: data?.lessons || [],
    course: data?.course,
    isLoading,
    error,
    refetch,
  };
}
