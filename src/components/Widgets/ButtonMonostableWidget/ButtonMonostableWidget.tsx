import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {IMonostableButtonWidget} from "../../../interfaces/Widgets/IMonostableButtonWidget.ts";
import styles from "./ButtonMonostableWidget.module.css"
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import {MessageAction} from "../../../enums/message_command.ts";
import {CSSProperties, PointerEvent, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import PowerButtonControl from "../shared/PowerButtonControl/PowerButtonControl.tsx";

const PRESS_TIME = 1000
export default function ButtonMonostableWidget({ id, config, pending, isOnline = true }: IMonostableButtonWidget) {
    const mutation = useTriggerActionEventMutation()
    const {t} = useTranslation();
    const pressStartTime = useRef<number|null>(null);
    const longPressTimeout = useRef<number|null>(null);
    const progressInterval = useRef<number|null>(null);
    const [isPressed, setIsPressed] = useState(false);
    const [holdProgress, setHoldProgress] = useState(0);
    const [holdTriggered, setHoldTriggered] = useState(false);

    const isPending = mutation.isPending || pending.includes(MessageAction.HOLD) || pending.includes(MessageAction.CLICK);
    const isDisabled = !isOnline || isPending;
    const stateText = !isOnline
        ? t("widgetState.offline")
        : isPending
            ? t("widgetState.sync")
            : isPressed
                ? holdTriggered
                    ? t("events.button.hold")
                    : t("events.button.click")
                : t("events.button.click");

    useEffect(() => {
        return () => {
            clearPressTimers();
        };
    }, []);

    function clearPressTimers() {
        if (longPressTimeout.current !== null) {
            window.clearTimeout(longPressTimeout.current)
            longPressTimeout.current = null
        }

        if (progressInterval.current !== null) {
            window.clearInterval(progressInterval.current)
            progressInterval.current = null
        }
    }

    function resetPressState() {
        clearPressTimers();
        pressStartTime.current = null;
        setIsPressed(false);
        setHoldProgress(0);
        setHoldTriggered(false);
    }

    function triggerEvent(event: PointerEvent<HTMLButtonElement>){
        if (isDisabled || pressStartTime.current !== null) return;

        event.currentTarget.setPointerCapture(event.pointerId);
        pressStartTime.current = Date.now();
        setIsPressed(true);
        setHoldTriggered(false);
        setHoldProgress(0);

        progressInterval.current = window.setInterval(() => {
            if (pressStartTime.current === null) return;

            const elapsed = Date.now() - pressStartTime.current;
            setHoldProgress(Math.min((elapsed / PRESS_TIME) * 100, 100));
        }, 16);

        longPressTimeout.current = window.setTimeout(() => {
            const data = peripheralAction(id, MessageAction.HOLD);
            mutation.mutate(data)
            setHoldTriggered(true);
            setHoldProgress(100);
            resetPressState();
        }, PRESS_TIME)
    }

    function cleanupEvent(){
        if (isDisabled) return;

        if (pressStartTime.current !== null && Date.now() - pressStartTime.current < PRESS_TIME) {
            clearPressTimers();
            const data = peripheralAction(id, MessageAction.CLICK);
            mutation.mutate(data)
        }

        resetPressState();
    }

    return (
        <BaseWidget
            name={config?.name}
            className={`${styles.widget} ${!isOnline ? styles.offlineWidget : ""}`}
        >
            <span
                className={`${styles.holdProgress} ${isPressed ? styles.holdProgressVisible : ""}`}
                style={{"--hold-progress": `${holdProgress}%`} as CSSProperties}
                aria-hidden="true"
            />
            <PowerButtonControl
                checked={isPressed || holdTriggered}
                label={stateText}
                disabled={isDisabled}
                offline={!isOnline}
                syncing={isPending}
                onPointerDown={triggerEvent}
                onPointerUp={cleanupEvent}
                onPointerCancel={resetPressState}
            />
        </BaseWidget>
    );
}
