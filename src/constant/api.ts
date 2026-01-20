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
  stairs: baseURL + "/api/stairs/",
  button: baseURL + "/api/button/",
  device: baseURL + "/api/device/",
  buttonType: baseURL + "/api/device/button-type/",
  unassignedDevice: baseURL + "/api/device/?unassigned=true",
  router: baseURL + "/api/device/router/",
  event: baseURL + "/api/event/",
  triggerEvent: baseURL + "/api/event/trigger/",
  action: baseURL + "/api/event/action/",
  cameras: baseURL + "/api/cameras/",
  getUpdateLamp: baseURL + "/api/lamp/", // +id
  tempHum:baseURL + "/api/temperature/",
  getAllEvents: baseURL + "/api/device/get/event/",
  firmwareList: baseURL + "/api/firmware/",
  firmwareUpdate: baseURL + "/api/firmware/update/",
  temperatureHistory:baseURL + "/sensor/api/v1/temperature",
  humidityHistory:baseURL + "/sensor/api/v1/humidity",
};
