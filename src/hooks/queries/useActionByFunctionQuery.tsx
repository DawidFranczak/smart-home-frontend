import { useQuery } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../const/api";

export default function useActionByFunctionQuery(fun: string) {
  const { readData } = useFetch();
  const { data } = useQuery({
    queryKey: ["actionByFunction", fun],
    queryFn: () => readData(`${api.action}?function=${fun}`),
    staleTime: 10 * 60 * 1000,
  });
  return { status: data?.status, actionByFunction: data?.data };
}
