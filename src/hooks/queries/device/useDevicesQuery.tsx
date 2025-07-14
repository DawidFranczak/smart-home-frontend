import {IDevice} from "../../../interfaces/IDevice.tsx";
import usePrefetchDeviceQuery from "./usePrefetchDeviceQuery.tsx";

export default function useDevicesQuery(deviceIds:number[]) {
    const {deviceData, status, isLoading, isError} = usePrefetchDeviceQuery();
    if (!deviceData) return {devices: [], status, isLoading, isError};
    return {
        devices: deviceData.filter((device: IDevice) => deviceIds.includes(device.id)),
        isLoading,
        isError,
        status
    }
}
