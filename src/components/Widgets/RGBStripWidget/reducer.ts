import {IRGBStripState} from "../../../interfaces/Widgets/IRGBStrip.ts";


type TAction =
    { type: "set/color", payload:{rgb: { r: number; g: number; b: number }}} |
    { type: "set/brightness", payload:{brightness: number}}|
    { type: "set/isOn", payload:{isOn: boolean}} |
    { type: "set/state", payload:{state: IRGBStripState}}


export default function reducer(state:IRGBStripState, action:TAction){
    switch(action.type){
        case "set/color":
            return {
                ...state,
                r_duty_cycle:action.payload.rgb.r,
                g_duty_cycle:action.payload.rgb.g,
                b_duty_cycle:action.payload.rgb.b,
            };
        case "set/brightness":
            return {
                ...state,
                brightness:action.payload.brightness,
            }
        case "set/isOn":
            return {
                ...state,
                is_on:action.payload.isOn,
            }
        case "set/state":
            return action.payload.state;
    }
}
