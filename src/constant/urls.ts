export const websocketUrl = import.meta.env.DEV
  ? "ws://localhost:80"
  : "wss://dashing-cod-pretty.ngrok-free.app";
export const baseURL = import.meta.env.DEV
  ? "http://localhost:80"
  : "https://dashing-cod-pretty.ngrok-free.app";
