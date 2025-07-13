import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../constant/api";
import { ILamp } from "../../interfaces/ILamp";
import useFetch from "../useFetch";
import { IRoom } from "../../interfaces/IRoom";

function getNewRoomData(roomData: IRoom, lampData: ILamp) {
  const newRoomData = { ...roomData };
  const newDevice = [...roomData.device];
  const index = newDevice.findIndex((device) => device.id === lampData.id);
  newDevice[index] = lampData;
  newRoomData.device = newDevice;
  return newRoomData;
}

export default function useLampMutation() {
  const { updateData } = useFetch();
  const queryClient = useQueryClient();

  function updateLamp(id: number) {
    return useMutation({
      mutationFn: (newData: ILamp) => updateData(`${api.lamp}${id}/`, newData),
      onSuccess: (newData) => {
        queryClient.setQueryData(["lamp", id], newData);
        const roomData = queryClient.getQueryData([
          "room",
          newData.data.room,
        ]) as any;
        if (!roomData) return;
        const status = roomData.status;
        const newRoomData = getNewRoomData(roomData.data, newData.data);
        queryClient.setQueryData(["room", id], {
          status: status,
          data: newRoomData,
        });
      },
    });
  }

  return { updateLamp };
}
