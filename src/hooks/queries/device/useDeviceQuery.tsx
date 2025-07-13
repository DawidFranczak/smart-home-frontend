import { useQuery } from "@tanstack/react-query";
import useFetch from "../../useFetch.tsx";
import { IDevice } from "../../../interfaces/IDevice.tsx";
import { api } from "../../../constant/api.ts";

export default function useDeviceQuery() {
  const { readData } = useFetch();
  const { data } = useQuery({
    queryKey: ["device"],
    queryFn: () => readData(api.device),
    staleTime: 10 * 60 * 1000,
  });
  return { status: data?.status, deviceData: data?.data as IDevice[] };
}
