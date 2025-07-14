import useFetch from "../../useFetch.tsx";
import {useQueries, useQueryClient} from "@tanstack/react-query";
import {api} from "../../../constant/api.ts";
import {useMemo} from "react";
import {IRoom} from "../../../interfaces/IRoom.tsx";

export default function useRoomsQuery(roomsIds:number[]) {
    const {readData} = useFetch();
    const queryClient = useQueryClient();

    const roomsQueries = useQueries({
        queries: roomsIds.map((roomId:number) => ({
            queryKey: ["room", roomId],
            queryFn: () => readData(`${api.room}${roomId}/`),
            staleTime: 10 * 60 * 1000,
            initialData: () => {
                const cachedRoom = queryClient.getQueryData(["room", roomId]);
                return cachedRoom || undefined;
            },
        })),
    });
    const rooms: IRoom[] = useMemo(() => {
        return roomsQueries
            .filter(query => query.data?.data)
            .map(query => query.data?.data);
    },[roomsQueries]);

    const isLoading = roomsQueries.some(query => query.isLoading);
    const isError = roomsQueries.some(query => query.isError);

    return{
        rooms,
        isLoading,
        isError
    }
}