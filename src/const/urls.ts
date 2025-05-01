export const websockerUrl = import.meta.env.DEV
  ? "ws://localhost:8000"
  : "wss://dashing-cod-pretty.ngrok-free.app";
export const baseURL = import.meta.env.DEV
  ? "http://localhost:8000"
  : "https://dashing-cod-pretty.ngrok-free.app";
