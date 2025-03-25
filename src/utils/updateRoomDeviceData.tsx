import { QueryClient } from "@tanstack/react-query";
import { IDevice } from "../interfaces/IDevice";
import { IRoom } from "../interfaces/IRoom";

export default function updateRoomDeviceData(
  queryClient: QueryClient,
  response: { status: number; data: IDevice }
) {
  const roomId = response.data.room;
  const oldData = queryClient.getQueryData(["room", roomId]) as {
    status: number;
    data: IRoom;
  };
  if (!oldData) return;
  const oldRoomData = oldData.data;
  const roomDevice = oldRoomData.device;
  const filtretedRoomDevice = roomDevice.filter(
    (device: IDevice) => device.id !== response.data.id
  );
  const newRoomDevice = [...filtretedRoomDevice, response.data];
  const newRoomData = { ...oldRoomData, device: newRoomDevice };
  queryClient.setQueryData(["room", roomId], {
    status: response.status,
    data: newRoomData,
  });
}
