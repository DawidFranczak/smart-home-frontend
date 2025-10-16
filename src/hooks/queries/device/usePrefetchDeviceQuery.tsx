import { useQuery } from "@tanstack/react-query";
import useFetch from "../../useFetch.tsx";
import { IDevice } from "../../../interfaces/IDevice.tsx";
import { api } from "../../../constant/api.ts";
import CacheKey from "../../../constant/cacheKey.ts";

export default function usePrefetchDeviceQuery() {
  const { readData } = useFetch();
  const { data,isLoading,isError } = useQuery({
    queryKey: [CacheKey.DEVICES],
    queryFn: () => readData(api.device),
    staleTime: 10 * 60 * 1000,
  });
  return { status: data?.status, deviceData: data?.data as IDevice[],isLoading,isError };
}
