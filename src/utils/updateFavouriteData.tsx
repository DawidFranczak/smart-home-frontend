import { QueryClient } from "@tanstack/react-query";
import { IDevice } from "../interfaces/IDevice";
import { IRoom } from "../interfaces/IRoom";

export default function updateFavouriteData(
  queryClient: QueryClient,
  response: { status: number; data: IDevice },
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
    newDeviceData = updateDevice(oldFavouriteData.data.devices, response.data);
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

function updateRoom(oldRoomData: IRoom, newRoomData: IRoom) {}

function updateDevice(oldDeviceData: IDevice[], newDeviceData: IDevice) {
  const filtretedData = oldDeviceData.filter(
    (device) => device.id !== newDeviceData.id
  );
  filtretedData.push(newDeviceData);
  return filtretedData;
}
