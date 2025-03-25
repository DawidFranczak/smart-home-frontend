import { IDevice } from "./IDevice";

export interface ILamp extends IDevice {
  brightness: number;
  light_start: string;
  light_stop: string;
  lighting_time: number;
  step: number;
}
