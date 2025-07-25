import { useQuery } from "@tanstack/react-query";
import { api } from "../../constant/api";
import useFetch from "../useFetch";
import CacheKey from "../../constant/cacheKey.ts";

export default function useFavouriteQuery() {
  const { readData } = useFetch();
  const { data, isLoading } = useQuery({
    queryFn: () => readData(api.favourite),
    queryKey: [CacheKey.FAVOURITES],
    staleTime: 10 * 60 * 1000,
  });
  return { status: data?.status, favouriteData: data?.data, isLoading };
}
