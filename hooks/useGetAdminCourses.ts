import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export function useGetAdminCourses(
  page: number,
  limit: number,
  searchValue: string
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.adminCourses, page, limit, searchValue],
    queryFn: async () => {
      const { data } = await customAxios.get("admin/courses", {
        params: {
          page,
          limit,
          search: searchValue,
        },
      });
      return data;
    },
  });

  return {
    courses: data?.courses,
    isLoading,
    error,
    currentPage: data?.current_page,
    totalPages: data?.total_pages,
    total: data?.total,
    refetch,
  };
}
