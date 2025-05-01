import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import updateInstanceData from "../utils/updateInstanceData";
import updateRoomDeviceData from "../utils/updateRoomDeviceData";
import updateUnassignedDevice from "../utils/updateUnassignedDevice";
import MessageType from "../const/message_type";
import updateRouterData from "../utils/updateRouterData";
import { websockerUrl } from "../const/urls";
import updateFavouriteData from "../utils/updateFavouriteData";

export default function CacheUpdater() {
  const [_, setSocket] = useState<WebSocket>();
  const queryClient = useQueryClient();
  useEffect(() => {
    const token = queryClient.getQueryData(["token"]) as {
      status: number;
      token: string;
    };
    if (!token) return;
    const ws = new WebSocket(`${websockerUrl}/ws/user/${token.token}/`);
    ws.onopen = (event) => {
      console.log(event);
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(event.data);
      switch (data.action) {
        case MessageType.UPDATE_ROUTER:
          updateRouterData(queryClient, data.data);
          break;
        case MessageType.UPDATE_DEVICE:
          updateInstanceData(queryClient, data.data);
          updateRoomDeviceData(queryClient, data.data);
          updateFavouriteData(
            queryClient,
            { status: data.data.status, data: data.data.data },
            "device"
          );
          break;
        case MessageType.NEW_DEVICE_CONNECTED:
          updateUnassignedDevice(queryClient, data.data);
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
