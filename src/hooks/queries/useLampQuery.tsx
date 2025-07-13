import { useQuery } from "@tanstack/react-query";
import { api } from "../../constant/api";
import useFetch from "../useFetch";
import { ILamp } from "../../interfaces/ILamp";

export default function useLampQuery(id: number | undefined) {
  const endpoint = id ? `${api.lamp}${id}/` : api.lamp;
  const key = id ? ["lamp", id] : ["lamp"];
  const { readData } = useFetch();
  const { data, isLoading } = useQuery({
    queryFn: () => readData(endpoint),
    queryKey: key,
    staleTime: 10 * 60 * 1000,
  });
  return { status: data?.status, lampData: data?.data as ILamp, isLoading };
}
