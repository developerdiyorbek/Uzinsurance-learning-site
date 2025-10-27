import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import customAxios from "@/configs/customAxios";

export function useGetUsers(
  page: number,
  limit: number,
  searchValue: string,
  status: string,
  role: string
) {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.users, searchValue, page, limit, status, role],
    queryFn: async () => {
      const { data } = await customAxios.get("admin/users", {
        params: {
          page,
          limit,
          search: searchValue,
          status,
          role,
        },
      });
      return data;
    },
  });

  return {
    users: data?.users,
    isLoading,
    error,
    currentPage: data?.current_page,
    totalPages: data?.total_pages,
    total: data?.total,
  };
}
