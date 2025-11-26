import customAxios from "@/configs/customAxios";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export function useGetUserCertificates() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.userCertificates],
    queryFn: async () => {
      const { data } = await customAxios.get("user/certificates");
      return data;
    },
  });

  return {
    certificates: data?.certificates || [],
    isLoading,
    error,
    refetch,
  };
}
