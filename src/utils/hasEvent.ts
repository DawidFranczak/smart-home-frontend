import IEvent from "../interfaces/IEvent.tsx";
import {TDeviceEvent} from "../type/TDeviceEvent.ts";

export default function hasEvent(events:IEvent[]|undefined, eventType:TDeviceEvent){
    if (!events) return false;
    return events.some(event => event.event === eventType);
}
