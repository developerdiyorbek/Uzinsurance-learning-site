import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { ICourse } from "@/types";

export function useGetCourseBySlug(slug: string) {
  const { data, isLoading, error, refetch } = useQuery<ICourse>({
    queryKey: [QUERY_KEYS.coursesSlug, slug],
    queryFn: async () => {
      const { data } = await customAxios.get(`admin/courses/${slug}`);
      return data?.course;
    },
    enabled: !!slug,
  });

  return {
    course: data,
    isLoading,
    error,
    refetch,
  };
}
