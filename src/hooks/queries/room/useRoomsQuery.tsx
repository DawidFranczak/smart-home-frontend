import {IRoom} from "../../../interfaces/IRoom.tsx";
import usePrefetchRoomQuery from "./usePrefetchRoomQuery.tsx";

export default function useRoomsQuery(roomsIds:number[]) {
    const {roomData,isLoading,isError} = usePrefetchRoomQuery();
    if (!roomData) return {rooms: [], isLoading, isError};
    return {
        rooms: roomData.filter((room: IRoom) => {
            return roomsIds.includes(room.id);
        }),
        isLoading,
        isError
    }
}