import useFetch from "../useFetch.tsx";
import {useQuery} from "@tanstack/react-query";
import cacheKey from "../../constant/cacheKey.ts";
import {api} from "../../constant/api.ts";

export default function useFirmwareDeviceQuery() {
  const { readData } = useFetch();
  const { data } = useQuery({
    queryKey: [cacheKey.FIRMWARE_DEVICE],
    queryFn: () => readData(api.firmwareList),
    staleTime: 24 * 60 * 60 * 1000,
  });
  return { status: data?.status, firmwareList: data?.data };
}
