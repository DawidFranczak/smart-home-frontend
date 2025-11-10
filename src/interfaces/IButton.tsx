import { IDevice } from "./IDevice";
import {TButton} from "../type/TButton.ts";

export default interface IButton extends IDevice {
    fun: "button";
    button_type: TButton
}
