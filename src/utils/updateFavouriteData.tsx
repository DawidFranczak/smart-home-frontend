import { QueryClient } from "@tanstack/react-query";
import IFavouriteData from "../interfaces/IFavouriteData.tsx";



export default function updateFavouriteData(
  queryClient: QueryClient,
  data: IFavouriteData,
  status: number
) {
  const oldFavouriteData = queryClient.getQueryData(["favourite"]) as {
    status: number;
    data: { rooms: number[]; devices: number[] };
  };
  if (!oldFavouriteData) return;
  let deviceData = oldFavouriteData.data.devices;
  let roomData = oldFavouriteData.data.rooms;
  if (data.type === "device") {
    if (!data.is_favourite) {
      deviceData.push(data.id);
    } else {
      deviceData = deviceData.filter(
        (id: number) => id !== data.id
      );
    }
  }else if (data.type === "room") {
    if (!data.is_favourite) {
      roomData.push(data.id);
    } else {
      roomData = roomData.filter(
        (id: number) => id !== data.id
      );
    }
  }
  const newFavouriteData = {
    status: status,
    data: {
      rooms: roomData,
      devices: deviceData,
    },
  };
  queryClient.setQueryData(["favourite"], newFavouriteData);
}
