import {useMutation} from "@tanstack/react-query";
import useFetch from "../../useFetch.tsx";
import {api} from "../../../constant/api.ts";

interface IRoomUpdate{
    name?: string;
    visibility?: "PU"|"PR"
}
export default function useRoomMutation(){
    const {updateData, deleteData} = useFetch()
    function updateRoom(id: number){
        return useMutation({
            mutationFn:(data:IRoomUpdate) => updateData(`${api.room}${id}/`, data),
            onSuccess: (data) => {
                console.log(data)
            }
        })
    }
    function deleteRoom(id: number){
        return useMutation({
            mutationFn: () => deleteData(`${api.room}${id}/`),
            onSuccess: (data) => {
                console.log(data)
            }
        })
    }

    return {updateRoom, deleteRoom}
}