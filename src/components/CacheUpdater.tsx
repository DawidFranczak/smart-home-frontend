import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import updateInstanceData from "../utils/updateInstanceData";
import updateRoomDeviceData from "../utils/updateRoomDeviceData";
import updateFavouriteData from "../utils/updateFavouriteData";
import updateUnassignedDevice from "../utils/updateUnassignedDevice";

export default function CacheUpdater() {
  const [socket, setSocket] = useState<WebSocket>();
  const queryClient = useQueryClient();
  useEffect(() => {
    const token = queryClient.getQueryData(["token"]) as {
      status: number;
      token: string;
    };
    if (!token) return;
    const ws = new WebSocket(`ws://192.168.1.142:8000/ws/user/${token.token}/`);

    ws.onopen = (event) => {
      //   console.log(event);
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newData = data.data;
      const status = data.status;
      if (!newData.room) {
        updateUnassignedDevice(queryClient, { status: status, data: newData });
        return;
      }
      updateInstanceData(queryClient, { status: status, data: newData });
      updateRoomDeviceData(queryClient, { status: status, data: newData });
      if (newData.is_favourite)
        updateFavouriteData(
          queryClient,
          { status: status, data: newData },
          "device"
        );
    };

    ws.onerror = (error) => {
      //   console.error("Błąd WebSocket:", error);
    };

    ws.onclose = () => {
      //   console.log("Rozłączono z serwerem WebSocket");
    };
    setSocket(ws);

    return () => ws.close();
  }, []);
  return null;
}
