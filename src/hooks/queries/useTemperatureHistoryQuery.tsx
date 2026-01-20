import { useQuery } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../constant/api";

export default function useTemperatureHistoryQuery(id: number, start:string|null=null, end:string|null=null) {
    const { readData } = useFetch();
    const deviceId = `device_id=${id}`;
    const startDate = start ? `&start_date=${start}` : "";
    const endDate = end ? `&end_date=${end}` : "";
    const { data } = useQuery({
        queryKey: ["tempHum", id, start, end],
        queryFn: () => readData(`${api.temperatureHistory}?${deviceId}${startDate}${endDate}`),
        // staleTime: 10 * 60 * 1000,
    });
    return { status: data?.status, tempHistoryData: data?.data };
}
