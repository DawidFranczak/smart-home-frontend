import {useMutation, useQueryClient} from "@tanstack/react-query";
import useFetch from "../../useFetch.tsx";
import { api } from "../../../constant/api.ts";

import updateFavouriteData from "../../../utils/updateFavouriteData.tsx";
import IFavouriteData from "../../../interfaces/IFavouriteData.tsx";
import CacheKey from "../../../constant/cacheKey.ts";

interface IDeviceUpdate {
  name?: string;
  room?: number|null;
}

export default function useDeviceMutation() {
  const { updateData, deleteData } = useFetch();
  const queryClient = useQueryClient();

  function updateDevice(id: number) {
    return useMutation({
      mutationFn: (data: IDeviceUpdate) =>
        updateData(`${api.device}${id}/`, data),
      onSuccess: async (response) => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: [CacheKey.ROOMS] }),
          queryClient.invalidateQueries({ queryKey: [CacheKey.DEVICES] }),
          queryClient.invalidateQueries({ queryKey: [CacheKey.UNASSIGNED_DEVICE] }),
        ]);
        const data = {
          type: "device",
          id: response.data.id,
          is_favourite: true
        } as IFavouriteData;
        updateFavouriteData(queryClient, data, response.status);
      },
    });
  }

  function deleteDevice(id: number) {
    return useMutation({
      mutationFn: () => deleteData(`${api.device}${id}/`),
      onSuccess: async () =>{
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: [CacheKey.ROOMS] }),
          queryClient.invalidateQueries({ queryKey: [CacheKey.DEVICES] })
        ]);
      }
    })
  }
  return { updateDevice, deleteDevice };
}
