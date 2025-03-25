import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../const/api";

import updateInstanceData from "../../utils/updateInstanceData";
import updateRoomDeviceData from "../../utils/updateRoomDeviceData";
import updateFavouriteData from "../../utils/updateFavouriteData";

interface IDeviceUpdate {
  name?: string;
  room?: number;
}

export default function useDeviceMutation() {
  const { createData, updateData } = useFetch();
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
        console.log(response);
        updateInstanceData(queryClient, response);
        updateRoomDeviceData(queryClient, response);
        if (response.data.is_favourite)
          updateFavouriteData(queryClient, response, "device");
      },
    });
  }
  return { createDevice, updateDevice };
}
