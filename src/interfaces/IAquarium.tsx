import { IDevice } from "./IDevice";

export interface IAquarium extends IDevice {
  color_b: number;
  color_g: number;
  color_r: number;
  fluo_mode: boolean;
  fluo_start: string;
  fluo_stop: string;
  led_mode: boolean;
  led_start: string;
  led_stop: string;
  mode: boolean;
}
