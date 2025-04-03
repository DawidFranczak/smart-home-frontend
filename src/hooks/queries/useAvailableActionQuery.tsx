import { useQuery } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../const/api";

export default function useAvailableActionQuery(id: number, fun: string) {
  const { readData } = useFetch();
  const { data } = useQuery({
    queryKey: ["availableAction"],
    queryFn: () => readData(`${api.availableAction}?id=${id}&fun=${fun}`),
    staleTime: 10 * 60 * 1000,
  });
  return { status: data?.status, availableAction: data?.data };
}
