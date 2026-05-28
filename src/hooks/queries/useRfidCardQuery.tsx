import { api } from "../../constant/api";
import useFetch, {ApiError} from "../useFetch";
import CacheKey from "../../constant/cacheKey.ts";
import {useQuery} from "@tanstack/react-query";
import {ReadApiResponse} from "../../type/TApiResponse.ts";
import {ICard} from "../../interfaces/IRfidCard.tsx";

export default function useRfidCardQuery(peripheral_id:number) {
    const { readData } = useFetch();
    const { data, isLoading } = useQuery<ReadApiResponse<ICard[]>,ApiError>({
        queryFn: () => readData(api.rfidCards(peripheral_id)),
        queryKey: [CacheKey.RFID_CARDS, peripheral_id],
        staleTime: 10 * 60 * 1000,
        enabled: !!peripheral_id
    });
    return { status: data?.status, cards: data?.data, isLoading };
}
