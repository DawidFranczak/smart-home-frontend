import { IDevice } from "./IDevice";

export interface IStairs extends IDevice {
    brightness: number;
    lighting_time: number;
    step: number;
    light_count: number;
}
