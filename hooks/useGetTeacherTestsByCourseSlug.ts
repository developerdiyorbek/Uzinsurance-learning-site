import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export function useGetTeacherTestsByCourseSlug(course_slug: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.teacherTestsByCourseSlug, course_slug],
    queryFn: async () => {
      const { data } = await customAxios.get(
        `teacher/courses/${course_slug}/tests`
      );
      return data;
    },
    enabled: !!course_slug,
  });

  return {
    tests: data?.tests || [],
    course: data?.course,
    testsCount: data?.tests_count || 0,
    isLoading,
    error,
    refetch,
  };
}

export function useGetTeacherTestById(test_id?: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.teacherTestById, test_id],
    queryFn: async () => {
      const { data } = await customAxios.get(`teacher/course/tests/${test_id}`);
      return data;
    },
    enabled: !!test_id,
  });

  return {
    test: data?.test,
    isLoading,
    error,
    refetch,
  };
}
