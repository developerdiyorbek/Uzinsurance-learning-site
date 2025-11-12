import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export function useGetTeacherLessonsByCourseSlug(course_slug: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.teacherLessonsByCourseSlug, course_slug],
    queryFn: async () => {
      const { data } = await customAxios.get(`teacher/lessons/${course_slug}`);
      return data;
    },
    enabled: !!course_slug,
  });

  return {
    lessons: data?.lessons || [],
    course: data?.course,
    lessonsCount: data?.lessons_count || 0,
    isLoading,
    error,
    refetch,
  };
}
