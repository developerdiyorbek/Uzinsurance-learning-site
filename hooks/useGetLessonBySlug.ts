import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { ILesson } from "@/types";

export function useGetLessonBySlug(lesson_slug?: string, course_slug?: string) {
  const { data, isLoading, error, refetch } = useQuery<ILesson>({
    queryKey: [QUERY_KEYS.lessonBySlug, lesson_slug, course_slug],
    queryFn: async () => {
      const { data } = await customAxios.get(
        `admin/lessons/${lesson_slug}/${course_slug}`
      );
      return data?.lesson;
    },
    enabled: !!lesson_slug && !!course_slug,
  });

  return {
    lesson: data,
    lessonLoading: isLoading,
    lessonError: error,
    lessonRefetch: refetch,
  };
}
