import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { ILesson } from "@/types";

interface UserLessonResponse {
  lesson: ILesson;
  is_completed: boolean;
  next_lesson_slug?: string;
  previous_lesson_slug?: string;
}

export function useGetUserLessonBySlug(
  lesson_slug?: string,
  course_slug?: string
) {
  const { data, isLoading, error, refetch } = useQuery<UserLessonResponse>({
    queryKey: [QUERY_KEYS.userLessonBySlug, lesson_slug, course_slug],
    queryFn: async () => {
      const { data } = await customAxios.get(
        `user/courses/${course_slug}/lessons/${lesson_slug}`
      );
      return data;
    },
    enabled: !!lesson_slug && !!course_slug,
  });

  return {
    lesson: data?.lesson,
    isCompleted: data?.is_completed || false,
    nextLessonSlug: data?.next_lesson_slug,
    previousLessonSlug: data?.previous_lesson_slug,
    isLoading,
    error,
    refetch,
  };
}
