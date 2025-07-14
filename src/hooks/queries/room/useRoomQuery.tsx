import {IRoom} from "../../../interfaces/IRoom.tsx";
import usePrefetchRoomQuery from "./usePrefetchRoomQuery.tsx";

export default function useRoomQuery(id:number) {
    const {roomData,isLoading,isError} = usePrefetchRoomQuery();
    if (!roomData) return {room: null, isLoading, isError};
    return {
        room: roomData.filter((room: IRoom) => {
            return id === room.id;
        })[0],
        isLoading,
        isError
    }
}