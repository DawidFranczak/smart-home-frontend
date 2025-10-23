import usePrefetchDeviceQuery from "./usePrefetchDeviceQuery.tsx";
import {IDevice} from "../../../interfaces/IDevice.tsx";

export default function useDeviceQuery(id:number) {
    const {deviceData,isLoading,isError,status} = usePrefetchDeviceQuery();
    if (!deviceData) return {device: null, isLoading, isError};
    return {
        device: deviceData.filter((device: IDevice) => {
            return id === device.id;
        })[0],
        isLoading,
        isError,
        status
    }
}