export const websocketUrl = import.meta.env.DEV
  ? "ws://localhost:80"
  : "wss://halpiszony.dpdns.org";
export const baseURL = import.meta.env.DEV
  ? "http://localhost:80"
  : "https://halpiszony.dpdns.org";
