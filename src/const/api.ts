// const baseURL =
//   import.meta.env.MODE === "development" ? "http://127.0.0.1:8000" : "";
// const baseURL = ""
// const baseURL = "https://dashing-cod-pretty.ngrok-free.app/api"
const baseURL = "http://127.0.0.1:8000";
export const api = {
  refreshToken: baseURL + "/api/token/refresh/",
  login: baseURL + "/api/login/",
  logout: baseURL + "/api/logout/",
  registration: baseURL + "/api/registration/",

  room: baseURL + "/api/room/",
  favourite: baseURL + "/api/favourite/",
  aquarium: baseURL + "/api/aquarium/",
  rfid: baseURL + "/api/rfid/",
  card: baseURL + "/api/rfid/card/",
  lamp: baseURL + "/api/lamp/",
  device: baseURL + "/api/device/",
  unassignedDevice: baseURL + "/api/device/?unassigned=true",
  router: baseURL + "/api/device/router/",

  getUpdateLamp: baseURL + "/api/lamp/", // +id

  getAllEvents: baseURL + "/api/device/get/event/",
};
