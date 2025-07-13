import { useQuery } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../constant/api";
import { IAquarium } from "../../interfaces/IAquarium";

export default function useAquariumQuery(id: number | undefined) {
  const endpoint = id ? `${api.aquarium}${id}/` : api.aquarium;
  const key = id ? ["aquarium", id] : ["aquarium"];
  const { readData } = useFetch();
  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => readData(endpoint),
    staleTime: 10 * 60 * 1000,
  });

  return {
    isLoading,
    status: data?.status,
    aquariumData: data?.data as IAquarium,
  };
}
