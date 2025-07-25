import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../constant/api";
import { IDevice } from "../../interfaces/IDevice";
import CacheKey from "../../constant/cacheKey.ts";
import assignDeviceToRoom from "../../utils/assignDeviceToRoom.tsx";

function updateUnassignedDevice(queryClient: QueryClient, deviceId: number) {
  const oldData = queryClient.getQueryData([CacheKey.UNASSIGNED_DEVICE]) as {
    status: number;
    data: IDevice[];
  };
  const status = oldData.status;
  const devices = oldData.data;
  const newData = devices.filter((device: IDevice) => device.id !== deviceId);
  queryClient.setQueryData([CacheKey.UNASSIGNED_DEVICE], {
    status,
    data: newData,
  });
}

export default function useUnassignedDeviceMutation() {
  const { createData } = useFetch();
  const queryClient = useQueryClient();
  function selectDevice() {
    return useMutation({
      mutationFn: (data: { deviceId: number; roomId: number }) =>
        createData(`${api.device}`, {
          device_id: data.deviceId,
          room_id: data.roomId,
        }),
      onSuccess:async (data) => {
        updateUnassignedDevice(queryClient, data.data.device_id);
        await Promise.all([
            queryClient.invalidateQueries({ queryKey: [CacheKey.ROOMS] }),
            queryClient.invalidateQueries({ queryKey: [CacheKey.DEVICES] })
        ]);
        assignDeviceToRoom(queryClient, data.data);
      },
    });
  }
  return { selectDevice };
}
