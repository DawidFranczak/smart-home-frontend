import { useQuery } from "@tanstack/react-query";
import { api } from "../../../constant/api.ts";
import useFetch from "../../useFetch.tsx";
import CacheKey from "../../../constant/cacheKey.ts";

export default function usePrefetchRoomQuery() {
  const { readData } = useFetch();
  const { data,isLoading,isError } = useQuery({
    queryKey: [CacheKey.ROOMS],
    queryFn: () => readData(api.room),
    staleTime: 10 * 60 * 1000,
  });
  return {
    status: data?.status,
    roomData: data?.data,
    isLoading,
    isError
  };
}
