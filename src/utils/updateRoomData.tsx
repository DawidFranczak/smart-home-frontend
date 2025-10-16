import { QueryClient } from "@tanstack/react-query";
import { IRoom } from "../interfaces/IRoom";
import CacheKey from "../constant/cacheKey.ts";

export default function updateRoomData(
  queryClient: QueryClient,
  response: { status: number; data: IRoom }
) {
  console.log(response);
  const rooms = queryClient.getQueryData([CacheKey.ROOMS]) as { status: number; data: IRoom[] };
  if (!rooms) return;
  const newRooms = rooms.data.map((room: IRoom) => {
    if (room.id === response.data.id) room = response.data;
    return room;
  });
  queryClient.setQueryData([CacheKey.ROOMS], { status: response.status, data: newRooms });
}
