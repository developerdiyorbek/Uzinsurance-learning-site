import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface CompleteLessonResponse {
  message: string;
  next_lesson_slug?: string;
  completed_lessons: number;
  total_lessons: number;
  progress_percentage: number;
}

export function useCompleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      course_slug,
      lesson_slug,
    }: {
      course_slug: string;
      lesson_slug: string;
    }) => {
      const { data } = await customAxios.post<CompleteLessonResponse>(
        `user/courses/${course_slug}/lessons/${lesson_slug}/complete`
      );
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.userLessonBySlug,
          variables.lesson_slug,
          variables.course_slug,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.userLessonsByCourseSlug, variables.course_slug],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.userJoinedCourses],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.userCourseBySlug, variables.course_slug],
      });

      toast.success("Dars muvaffaqiyatli tugatildi!");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error.response?.data?.message || "Darsni tugatishda xatolik yuz berdi";
      toast.error(errorMessage);
    },
  });
}
