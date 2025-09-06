import useFetch from "../useFetch.tsx";
import {useQuery} from "@tanstack/react-query";
import {api} from "../../constant/api.ts";
import CacheKey from "../../constant/cacheKey.ts";

export default function useCameraQuery() {
    const {readData} = useFetch();
    const {data, isLoading} = useQuery({
        queryFn: () => readData(api.cameras),
        queryKey: [CacheKey.CAMERAS],
        staleTime: 10 * 60 * 1000
    });
    return {status: data?.status, cameraData: data?.data, isLoading};
}