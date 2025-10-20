import { useQuery } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../constant/api";

export default function useTempHumQuery(id: number) {
    const { readData } = useFetch();
    const { data } = useQuery({
        queryKey: ["tempHum", id],
        queryFn: () => readData(`${api.tempHum}${id}/`),
        staleTime: 10 * 60 * 1000,
    });
    return { status: data?.status, tempHumData: data?.data };
}
