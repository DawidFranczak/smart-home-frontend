import {PointerEvent, useRef} from "react";
import styles from "./EventButton.module.css"
import IEvent from "../../../../interfaces/IEvent.tsx";
import hasEvent from "../../../../utils/hasEvent.ts";
import useEventTriggerMutation from "../../../../hooks/queries/useEventTriggerMutation.tsx";
import {IconButton} from "rsuite";
import OffIcon from "@rsuite/icons/esm/react/Off";
import {TButton} from "../../../../type/TButton.ts";

interface IEventButtonProps {
    id:number;
    events:IEvent[]|undefined;
    buttonType:TButton;
    className?: string;
}
const PRESS_TIME = 1000
export default function EventButton({ id, buttonType, events}: IEventButtonProps) {
    const pressStartTime = useRef<number|null>(null);
    const longPressTimeout = useRef<number|null>(null);
    const mutation = useEventTriggerMutation()

    function triggerEvent(_: PointerEvent<HTMLElement>){

        if (buttonType === "BI"){
            if (hasEvent(events,"on_toggle")) mutation.mutate({id:id,type:"on_toggle"})
            return
        }
        pressStartTime.current = Date.now();
        longPressTimeout.current = window.setTimeout(() => {
            if (hasEvent(events,"on_hold")) mutation.mutate({id:id,type:"on_hold"})
        }, PRESS_TIME)
    }
    function cleanupEvent(_: PointerEvent<HTMLElement>){
        if (buttonType === "BI") return

        if (longPressTimeout.current !== null) {
            window.clearTimeout(longPressTimeout.current)
            longPressTimeout.current = null
        }
        if (pressStartTime.current !== null && Date.now() - pressStartTime.current < PRESS_TIME) {
            if (hasEvent(events,"on_click")) mutation.mutate({id:id,type:"on_click"})
        }

    }
    return <IconButton
                icon={<OffIcon className={styles.size}/>}
                appearance="link"
                className={styles.size}
                onPointerDown={triggerEvent}
                onPointerUp={cleanupEvent}
                onContextMenu={(e) => e.preventDefault()}
            />
}