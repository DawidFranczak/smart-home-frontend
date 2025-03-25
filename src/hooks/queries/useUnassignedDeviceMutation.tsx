import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../const/api";
import { IDevice } from "../../interfaces/IDevice";

function updateDeviceQuery(queryClient: QueryClient, deviceId: number) {
  const oldData = queryClient.getQueryData(["unassignedDevice"]) as {
    status: number;
    data: IDevice[];
  };
  const status = oldData.status;
  const devices = oldData.data;
  const newData = devices.filter((device: IDevice) => device.id !== deviceId);
  queryClient.setQueryData(["unassignedDevice"], {
    status,
    data: newData,
  });
}

function invalidateRoomDeviceQuery(queryClient: QueryClient, roomId: number) {
  queryClient.invalidateQueries({ queryKey: ["room", roomId] });
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

      onSuccess: (data) => {
        updateDeviceQuery(queryClient, data.data.device_id);
        invalidateRoomDeviceQuery(queryClient, data.data.room_id);
      },
    });
  }
  return { selectDevice };
}
