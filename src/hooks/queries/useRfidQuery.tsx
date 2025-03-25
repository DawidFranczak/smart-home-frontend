import { useQuery } from "@tanstack/react-query";
import { api } from "../../const/api";
import useFetch from "../useFetch";
import { IRfid } from "../../interfaces/IRfid";

export default function useRfidQuery(id: number | undefined) {
  const endpoint = id ? `${api.rfid}${id}/` : api.rfid;
  const key = id ? ["rfid", id] : ["rfid"];
  const { readData } = useFetch();
  const { data, isLoading } = useQuery({
    queryFn: () => readData(endpoint),
    queryKey: key,
    staleTime: 10 * 60 * 1000,
  });
  return { status: data?.status, rfidData: data?.data as IRfid, isLoading };
}
