import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../../useFetch.tsx";
import { api } from "../../../constant/api.ts";

import updateInstanceData from "../../../utils/updateInstanceData.tsx";
import updateRoomDeviceData from "../../../utils/updateRoomDeviceData.tsx";
import updateFavouriteData from "../../../utils/updateFavouriteData.tsx";

interface IDeviceUpdate {
  name?: string;
  room?: number|null;
}

export default function useDeviceMutation() {
  const { createData, updateData, deleteData } = useFetch();
  const queryClient = useQueryClient();
  function createDevice() {
    return useMutation({
      mutationFn: (data: { name: string; fun: string; room_id: number }) =>
        createData(api.device, data),
      onSuccess: (data) => {
        console.log(data);
      },
    });
  }
  function updateDevice(id: number) {
    return useMutation({
      mutationFn: (data: IDeviceUpdate) =>
        updateData(`${api.device}${id}/`, data),
      onSuccess: (response) => {
        updateInstanceData(queryClient, response);
        updateRoomDeviceData(queryClient, response);
        if (response.data.is_favourite)
          updateFavouriteData(queryClient, response, "device");
      },
    });
  }

  function deleteDevice(id: number) {
    return useMutation({
      mutationFn: () => deleteData(`${api.device}${id}/`)
    })
  }
  return { createDevice, updateDevice, deleteDevice };
}
