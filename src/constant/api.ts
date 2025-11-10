import { baseURL } from "./urls";

export const api = {
  refreshToken: baseURL + "/api/token/refresh/",
  login: baseURL + "/api/login/",
  logout: baseURL + "/api/logout/",
  registration: baseURL + "/api/registration/",
  changePassword: baseURL + "/api/change-password/",

  home: baseURL + "/api/home/",

  room: baseURL + "/api/room/",
  favourite: baseURL + "/api/favourite/",
  aquarium: baseURL + "/api/aquarium/",
  rfid: baseURL + "/api/rfid/",
  card: baseURL + "/api/rfid/card/",
  lamp: baseURL + "/api/lamp/",
  button: baseURL + "/api/button/",
  device: baseURL + "/api/device/",
  buttonType: baseURL + "/api/device/button-type/",
  unassignedDevice: baseURL + "/api/device/?unassigned=true",
  router: baseURL + "/api/device/router/",
  event: baseURL + "/api/event/",
  action: baseURL + "/api/event/action/",
  cameras: baseURL + "/api/cameras/",
  getUpdateLamp: baseURL + "/api/lamp/", // +id
    tempHum:baseURL + "/api/temperature/",
    tempHumHistory:baseURL + "/api/temperature/history/",
  getAllEvents: baseURL + "/api/device/get/event/",
};
