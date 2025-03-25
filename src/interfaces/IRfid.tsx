import { IDevice } from "./IDevice";

export interface IRfid extends IDevice {
  cards: ICard[];
  controlled_lamp: IRfidControlledLamp;
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
