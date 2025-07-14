import useFetch from "../../useFetch.tsx";
import {useQueries, useQueryClient} from "@tanstack/react-query";
import {api} from "../../../constant/api.ts";
import {IDevice} from "../../../interfaces/IDevice.tsx";
import {useMemo} from "react";

export default function useDevicesQuery(deviceIds:number[]) {
    const {readData} = useFetch()
    const queryClient = useQueryClient();
    const deviceQueries = useQueries({
        queries: deviceIds.map((deviceId) => ({
            queryKey: ["device", deviceId],
            queryFn: () => readData(`${api.device}${deviceId}/`),
            staleTime: 10 * 60 * 1000,
            initialData: () => {
                const cachedDevice = queryClient.getQueryData(["device", deviceId]);
                return cachedDevice || undefined;
            },
        })),
    });

    const devices: IDevice[] = useMemo(() => {
        return deviceQueries
            .filter(query => query.data?.data)
            .map(query => query.data?.data);
    }, [deviceQueries]);

    const isLoading = deviceQueries.some(query => query.isLoading);
    const isError = deviceQueries.some(query => query.isError);
    return {
        devices,
        isLoading,
        isError,
    };
}
