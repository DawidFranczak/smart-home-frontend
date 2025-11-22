import styles from "./EventButton.module.css"
import {TDeviceEvent} from "../../../../type/TDeviceEvent.ts";
import IEvent from "../../../../interfaces/IEvent.tsx";
import hasEvent from "../../../../utils/hasEvent.ts";
import useEventTriggerMutation from "../../../../hooks/queries/useEventTriggerMutation.tsx";

interface IEventButtonProps {
    id:number;
    events:IEvent[]|undefined;
    className?: string;
    type: TDeviceEvent
    children: React.ReactNode
}
export default function EventButton({ id, className, type,children,events}: IEventButtonProps) {
    const mutation = useEventTriggerMutation()
    function handleTrigger(){
        mutation.mutate({id:id,type:type})
    }
    return <button className={`${styles[type]} ${className}`} disabled={!hasEvent(events,type)} onClick={handleTrigger}>{children}</button>
}