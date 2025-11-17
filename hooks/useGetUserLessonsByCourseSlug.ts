import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { ILesson } from "@/types";

interface UserLessonsResponse {
  lessons: ILesson[];
  course: {
    _id: string;
    title: string;
    slug: string;
  };
  completed_lessons: number;
  next_lesson_slug?: string;
  progress_percentage: number;
}

export function useGetUserLessonsByCourseSlug(course_slug: string) {
  const { data, isLoading, error, refetch } = useQuery<UserLessonsResponse>({
    queryKey: [QUERY_KEYS.userLessonsByCourseSlug, course_slug],
    queryFn: async () => {
      const { data } = await customAxios.get(
        `user/courses/${course_slug}/lessons`
      );
      return data;
    },
    enabled: !!course_slug,
  });

  return {
    lessons: data?.lessons || [],
    course: data?.course,
    completedLessons: data?.completed_lessons || [],
    nextLessonSlug: data?.next_lesson_slug,
    progressPercentage: data?.progress_percentage || 0,
    isLoading,
    error,
    refetch,
  };
}
