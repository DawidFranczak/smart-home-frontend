import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import updateInstanceData from "../utils/updateInstanceData";
import updateRoomDeviceData from "../utils/updateRoomDeviceData";
import updateFavouriteData from "../utils/updateFavouriteData";
import updateUnassignedDevice from "../utils/updateUnassignedDevice";
import MessageType from "../const/message_type";
import updateRouterData from "../utils/updateRouterData";

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
      switch (data.action) {
        case MessageType.UPDATE_ROUTER:
          updateRouterData(queryClient, data);
          break;
        case MessageType.UPDATE_DEVICE:
          updateInstanceData(queryClient, data);
          updateRoomDeviceData(queryClient, data);
          break;
        case MessageType.NEW_DEVICE_CONNECTED:
          updateUnassignedDevice(queryClient, data);
      }
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
