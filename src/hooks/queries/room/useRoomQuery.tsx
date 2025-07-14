import { useQuery } from "@tanstack/react-query";
import { api } from "../../../constant/api.ts";
import useFetch from "../../useFetch.tsx";

export default function useRoomQuery(id: number | undefined) {
  const { readData } = useFetch();
  const endpoint = id ? `${api.room}${id}/` : api.room;
  const key = id ? ["room", id] : ["room"];
  const { data } = useQuery({
    queryKey: key,
    queryFn: () => readData(endpoint),
    staleTime: 10 * 60 * 1000,
  });
  return {
    status: data?.status,
    roomData: data?.data,
  };
}
