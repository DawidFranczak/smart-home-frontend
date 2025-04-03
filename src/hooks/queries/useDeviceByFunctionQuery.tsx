import { useQuery } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../const/api";

export default function useDeviceByFunctionQuery(fun: string) {
  const { readData } = useFetch();
  const { data } = useQuery({
    queryKey: ["deviceByFunction", fun],
    queryFn: () => readData(`${api.device}?function=${fun}`),
    staleTime: 10 * 60 * 1000,
  });
  return { status: data?.status, deviceByFunction: data?.data };
}
