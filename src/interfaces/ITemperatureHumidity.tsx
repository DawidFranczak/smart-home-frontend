import {IDevice} from "./IDevice.tsx";

export default interface ITemperatureHumidity extends IDevice {
    humidity: number;
    temperature: number;
    timestamp: string;
    humidity_hysteresis: number;
    temperature_hysteresis: number;
    trigger_hum_down: number;
    trigger_hum_up: number;
    trigger_temp_down: number;
    trigger_temp_up: number;
}