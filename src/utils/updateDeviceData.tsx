import { QueryClient } from "@tanstack/react-query";
import { IDevice } from "../interfaces/IDevice";
import CacheKey from "../constant/cacheKey.ts";

export default function updateDeviceData(
  queryClient: QueryClient,
  response: { status: number; data: IDevice }
) {

  const devices = queryClient.getQueryData([CacheKey.DEVICES]) as { status: number; data: IDevice[] };
  if (!devices) return;
  const newDevices = devices.data.map((device: IDevice) => {
    if (device.id === response.data.id) device = response.data;
    return device;
  });
  queryClient.setQueryData([CacheKey.DEVICES], { status: response.status, data: newDevices });
}
