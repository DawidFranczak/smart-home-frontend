export const websocketUrl = import.meta.env.DEV
  ? "ws://192.168.1.142:80"
  : "wss://dashing-cod-pretty.ngrok-free.app";
export const baseURL = import.meta.env.DEV
  ? "http://192.168.1.142:80"
  : "https://dashing-cod-pretty.ngrok-free.app";
