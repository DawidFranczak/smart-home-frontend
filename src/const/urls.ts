export const websockerUrl = import.meta.env.DEV
  ? "ws://localhost:8000"
  : "wss://dashing-cod-pretty.ngrok-free.app";
export const baseURL = import.meta.env.DEV
  ? "http://localhost:8000"
  : "https://dashing-cod-pretty.ngrok-free.app";

// export const websockerUrl = "wss://1cdd-91-227-219-94.ngrok-free.app";
// export const baseURL = "https://1cdd-91-227-219-94.ngrok-free.app";
// export const websockerUrl = "ws://localhost:8000";
// export const baseURL = "http://localhost:8000";
