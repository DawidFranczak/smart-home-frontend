import { IDevice } from "./IDevice";
import {TButton} from "../type/TButton.ts";

export interface IRfid extends IDevice {
  cards: ICard[];
  controlled_lamp: IRfidControlledLamp;
  button_type:TButton;
}

export interface ICard {
  id: number;
  name: string;
  rfid: number;
  last_used: string;
}

export interface IRfidControlledLamp {
  name: string;
  id: number;
}
