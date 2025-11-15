import {IDevice} from "./IDevice.tsx";
import {TButton} from "../type/TButton.ts";

export default interface ILight extends IDevice{
    fun: "light";
    button_type: TButton;
    on:boolean;
}