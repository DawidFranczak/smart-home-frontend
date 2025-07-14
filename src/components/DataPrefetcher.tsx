import useDeviceQuery from "../hooks/queries/device/useDeviceQuery.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import useRoomQuery from "../hooks/queries/room/useRoomQuery.tsx";
import {IDevice} from "../interfaces/IDevice.tsx";
import {IRoom} from "../interfaces/IRoom.tsx";

export default function DataPrefetcher() {
    const queryClient = useQueryClient();
    const { deviceData } = useDeviceQuery()
    const { roomData } = useRoomQuery(undefined)
    useEffect(() => {
        if (deviceData) {
            deviceData.forEach((device:IDevice) => {
                queryClient.setQueryData(["device", device.id], {status: 200, data: device});
            });
        }
    }, [deviceData]);

    useEffect(() => {
        if (roomData) {
            roomData.forEach((room:IRoom) => {
                queryClient.setQueryData(["room", room.id], {status: 200, data: room});
            });
        }
    }, [roomData]);
    return null;
}