import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export interface IUserTest {
  _id: string;
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  order: number;
}

interface UserTestResponse {
  success: boolean;
  tests: IUserTest[];
  course: {
    title: string;
    slug: string;
  };
}

export function useGetUserTestsByCourseSlug(course_slug?: string) {
  const { data, isLoading, error, refetch } = useQuery<UserTestResponse>({
    queryKey: [QUERY_KEYS.userTestsByCourseSlug, course_slug],
    queryFn: async () => {
      const { data } = await customAxios.get(
        `user/courses/${course_slug}/tests`
      );
      return data;
    },
    enabled: !!course_slug,
  });

  return {
    tests: data?.tests || [],
    course: data?.course,
    isLoading,
    error,
    refetch,
  };
}
