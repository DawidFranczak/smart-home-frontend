import {RuleFormState} from "./ruleFormState.ts";
import {IDevice} from "../../interfaces/IDevice.tsx";
import IPeripheral from "../../interfaces/IPeripheral.ts";

type RuleFormAction =
    | { type: "setTrigger/device"; payload: IDevice | null }
    | { type: "setTrigger/peripheral"; payload: IPeripheral | null }
    | { type: "setTrigger/event"; payload: string | null }
    | { type: "setTarget/device"; payload: IDevice | null }
    | { type: "setTarget/peripheral"; payload: IPeripheral | null }
    | { type: "setTarget/action"; payload: string | null }
    | { type: "set/extraSettings"; payload: object }
    | { type: "set/condition"; payload: object }
    | { type: "reset";}

export const initialState: RuleFormState = {
    triggerDevice: null,
    triggerPeripheral: null,
    triggerEvent: null,
    targetDevice: null,
    targetPeripheral: null,
    targetAction: null,
    extraSettings: {},
    condition:{}
}



export default function reducer(state: RuleFormState, action: RuleFormAction): RuleFormState {
    switch (action.type) {
        case "reset":
            return initialState
        case "setTrigger/device":
            return {
                ...state,
                triggerDevice: action.payload,
                triggerPeripheral: null,
                triggerEvent: null,
                condition: {}
            }

        case "setTrigger/peripheral":
            return {
                ...state,
                triggerPeripheral: action.payload,
                triggerEvent: null,
                condition: {}
            }

        case "setTrigger/event":
            return {
                ...state,
                triggerEvent: action.payload,
                condition: {}
            }

        case "setTarget/device":
            return {
                ...state,
                targetDevice: action.payload,
                targetPeripheral: null,
                targetAction: null,
                extraSettings: {}
            }

        case "setTarget/peripheral":
            return {
                ...state,
                targetPeripheral: action.payload,
                targetAction: null,
                extraSettings: {}
            }

        case "setTarget/action":
            return {
                ...state,
                targetAction: action.payload,
                extraSettings: {}
            }
        case "set/extraSettings":
            return {
                ...state,
                extraSettings: action.payload
            }
        case "set/condition":
            return {
                ...state,
                condition: action.payload
            }

        default:
            return state
    }
}
