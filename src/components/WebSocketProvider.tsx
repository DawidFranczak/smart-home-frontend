import { useQueryClient } from "@tanstack/react-query";
import {createContext, useContext, useEffect, useState} from "react";
import updateDeviceData from "../utils/updateDeviceData.tsx";
import updateUnassignedDevice from "../utils/updateUnassignedDevice";
import MessageType from "../constant/message_type";
import updateRouterData from "../utils/updateRouterData";
import { websocketUrl } from "../constant/urls";

interface WebSocketType {
  send: (data: object) => void;
  status: WebSocket["readyState"];
}

export const WebSockerContext = createContext<WebSocketType|undefined>(undefined);

export const useWebSocket = () => {
  const context = useContext(WebSockerContext);
  if (context === undefined) throw Error("WebSockerContext is undefined");
  return context;
};

export default function WebSocketProvider({children}:{children: React.ReactNode}) {
  const [socket, setSocket] = useState<WebSocket>();
  const [status, setStatus] = useState<WebSocket["readyState"]>(WebSocket.CONNECTING);
  const queryClient = useQueryClient()

  function connect(){
    const token = queryClient.getQueryData(["token"]) as {
      status: number;
      token: string;
    };
    if (!token) return;
    const ws = new WebSocket(`${websocketUrl}/ws/user/${token.token}/`);
    ws.onopen = () => {
      setStatus(WebSocket.OPEN);
    };
    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      switch (data.action) {
        case MessageType.UPDATE_ROUTER:
          updateRouterData(queryClient, data.data, data.status);
          break;
        case MessageType.UPDATE_DEVICE:
          updateDeviceData(queryClient, data.data, data.status);
          break;
        case MessageType.NEW_DEVICE_CONNECTED:
          updateUnassignedDevice(queryClient, data.data, data.status);
      }
    };

    ws.onerror = () => {
      setStatus(WebSocket.CLOSED);
    };

    ws.onclose = () => {
      setStatus(WebSocket.CLOSED);
      setTimeout(connect, 5000);
    };
    setSocket(ws);
  }

  useEffect(() => {
    connect();
    return () => {if (socket) socket.close()};
  }, []);
  function send(data: object) {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify(data));
  }

  return <WebSockerContext.Provider value={{send, status}}>{children}</WebSockerContext.Provider>;
}