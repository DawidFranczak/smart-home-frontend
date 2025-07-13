import useFetch from "../useFetch.tsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {IDevice} from "../../interfaces/IDevice.tsx";
import {api} from "../../constant/api.ts";

export default function useDeviceManager() {
    const {readData} = useFetch();
    const queryClinet = useQueryClient();
    const devicesQuery = useQuery({
        queryKey: ["device-all"],
        queryFn: () => readData(api.device),
        staleTime: 10 * 60 * 1000,
    })



    return {
        allDevices: devicesQuery.data || [],

        isLoading: devicesQuery.isLoading,
        isFetching: devicesQuery.isFetching,
        error: devicesQuery.error,
        refetch: devicesQuery.refetch,
    }
}