import IEvent from "./IEvent";

export interface IDeviceRoom {
  name: string;
  status: string;
}

export interface IDevice {
  fun: string;
  id: number;
  ip: string;
  is_online: boolean;
  last_seen: string;
  name: string;
  room: number;
  wifi_strength: number;
  is_favourite: boolean;
  firmware_version:number;
  pending: string[];
  events?: IEvent[];
  actions?: string[];
}
