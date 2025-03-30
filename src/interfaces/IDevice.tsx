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
  pending: string[];
  events?: DeviceEvent[];
  actions?: string[];
}

interface DeviceEvent {
  id: number;
  target_device: number;
  action: string;
  device: string;
  event: string;
  extra_settings?: object;
}
