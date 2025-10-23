import { useQuery } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../constant/api";

export default function useTempHumHistoryQuery(id: number,start:string|null=null, end:string|null=null) {
    const { readData } = useFetch();
    const startDate = start ? `&start_date=${start}` : "";
    const endDate = end ? `&end_date=${end}` : "";
    const { data } = useQuery({
        queryKey: ["tempHum", id, start, end],
        queryFn: () => readData(`${api.tempHumHistory}${id}/?${startDate}${endDate}`),
        // staleTime: 10 * 60 * 1000,
    });
    return { status: data?.status, tempHumHistoryData: data?.data };
}
