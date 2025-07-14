import {useMutation, useQueryClient} from "@tanstack/react-query";
import useFetch from "../../useFetch.tsx";
import {api} from "../../../constant/api.ts";
import updateRoomData from "../../../utils/updateRoomData.tsx";
import CacheKey from "../../../constant/cacheKey.ts";
import {IRoom} from "../../../interfaces/IRoom.tsx";

interface IRoomUpdate{
    name?: string;
    visibility?: "PU"|"PR"
}
export default function useRoomMutation(){
    const {updateData, deleteData} = useFetch()
    const queryClient = useQueryClient();
    function updateRoom(id: number){
        return useMutation({
            mutationFn:(data:IRoomUpdate) => updateData(`${api.room}${id}/`, data),
            onSuccess: (response) => {
                console.log(response)
                updateRoomData(queryClient, response);
            }
        })
    }
    function deleteRoom(id: number){
        return useMutation({
            mutationFn: () => deleteData(`${api.room}${id}/`),
            onSuccess: (_:{status: number}) => {
                const rooms = queryClient.getQueryData([CacheKey.ROOMS]) as {status: number, data: IRoom[]} | undefined;
                if(!rooms) return;
                const newRooms = rooms.data.filter(room => room.id !== id);
                queryClient.setQueryData([CacheKey.ROOMS], {...rooms, data: newRooms});
            }
        })
    }

    return {updateRoom, deleteRoom}
}