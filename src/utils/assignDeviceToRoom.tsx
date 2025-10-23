import {QueryClient} from "@tanstack/react-query";
import CacheKey from "../constant/cacheKey.ts";
import {IRoom} from "../interfaces/IRoom.tsx";

export default function assignDeviceToRoom(queryClient: QueryClient, data: {device_id: number, room_id: number}){
    const rooms = queryClient.getQueryData([CacheKey.ROOMS]) as { status: number; data: IRoom[] };
    if (!rooms) return;
    const newRoom = rooms.data.filter((room: IRoom) => room.id === data.room_id)[0];
    if (!newRoom) return;
    const newRooms = rooms.data.map((room: IRoom) => {
        if (room.id === data.room_id) room.device.push(data.device_id);
        return room;
    });
    queryClient.setQueryData([CacheKey.ROOMS], { status: rooms.status, data: newRooms });
}