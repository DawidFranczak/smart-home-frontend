import { QueryClient } from "@tanstack/react-query";
import { IDevice } from "../interfaces/IDevice";
import { IRoom } from "../interfaces/IRoom";

export default function updateFavouriteData(
  queryClient: QueryClient,
  response: { status: number; data: IDevice | IRoom },
  type: "room" | "device"
) {
  const oldFavouriteData = queryClient.getQueryData(["favourite"]) as {
    status: number;
    data: { rooms: IRoom[]; devices: IDevice[] };
  };
  if (!oldFavouriteData) return;
  let newDeviceData = oldFavouriteData.data.devices;
  let newRoomData = oldFavouriteData.data.rooms;

  if (type === "device") {
    if (response.data.is_favourite) {
      newDeviceData.push(response.data as IDevice);
    } else {
      newDeviceData = newDeviceData.filter(
        (device: IDevice) => device.id !== response.data.id
      );
    }
  } else if (type === "room") {
    if (response.data.is_favourite) {
      newRoomData.push(response.data as IRoom);
    } else {
      newRoomData = newRoomData.filter(
        (room: IRoom) => room.id !== response.data.id
      );
    }
  }
  const newFavouriteData = {
    status: response.status,
    data: {
      rooms: newRoomData,
      devices: newDeviceData,
    },
  };
  queryClient.setQueryData(["favourite"], newFavouriteData);
}
