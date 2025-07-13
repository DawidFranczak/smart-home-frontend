import { useQuery } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../constant/api";

export default function useRouterQuery() {
  const { readData } = useFetch();
  const { data } = useQuery({
    queryKey: ["router"],
    queryFn: () => readData(api.router),
    staleTime: 10 * 60 * 1000,
  });
  return { status: data?.status, routerData: data?.data };
}
