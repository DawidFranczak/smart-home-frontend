import {CSSProperties, useEffect, useRef, useState} from "react";
import {NumberInput} from "rsuite";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {MessageAction} from "../../../enums/message_command.ts";
import {ISequentialLightWidget} from "../../../interfaces/Widgets/ISequentialLight.ts";
import styles from "./SequentialLightWidget.module.css";
import {useTranslation} from "react-i18next";
import RangeControl from "../shared/RangeControl/RangeControl.tsx";
import OffIcon from "@rsuite/icons/Off";
import PlayOutlineIcon from "@rsuite/icons/PlayOutline";

export default function SequentialLightWidget({id, state, config, pending, isOnline = true}:ISequentialLightWidget){
    const [brightness, setBrightness] = useState(state.brightness);
    const [speed, setSpeed] = useState(state.speed)
    const [lightingTime, setLightingTime] = useState(state.lighting_time)
    const committedState = useRef({
        brightness: state.brightness,
        speed: state.speed,
        lightingTime: state.lighting_time,
    });
    const mutation = useTriggerActionEventMutation()
    const isLoading = mutation.isPending ||
        pending.includes(MessageAction.TOGGLE) ||
        pending.includes(MessageAction.BLINK) ||
        pending.includes(MessageAction.UPDATE_STATE)
    const isDisabled = !isOnline || isLoading;
    const hasChanges =
        brightness !== committedState.current.brightness ||
        speed !== committedState.current.speed ||
        lightingTime !== committedState.current.lightingTime;

    const {t} = useTranslation();
    const statusText = !isOnline
        ? t("widgetState.offline")
        : isLoading
            ? t("widgetState.sync")
            : state.is_on
                ? t("widgetState.on")
                : t("widgetState.off");

    useEffect(() => {
        if (isLoading) return;

        setBrightness(state.brightness);
        setSpeed(state.speed);
        setLightingTime(state.lighting_time);
        committedState.current = {
            brightness: state.brightness,
            speed: state.speed,
            lightingTime: state.lighting_time,
        };
    }, [state.brightness, state.speed, state.lighting_time, isLoading]);

    function handleTime(value: string | number | null){
        if (value === null || value === "") return;

        const nextValue = Number(value);
        if (!Number.isFinite(nextValue)) return;

        setLightingTime(Math.max(0, nextValue));
    }

    async function handleToggle() {
        if (isDisabled) return;

        const data = peripheralAction(id, MessageAction.TOGGLE, {});
        await mutation.mutateAsync(data)
    }

    async function handleBlink() {
        if (isDisabled || state.is_on) return;

        const data = peripheralAction(id, MessageAction.BLINK, {});
        await mutation.mutateAsync(data)
    }

    async function handleSave(){
        if (isDisabled || !hasChanges) return;

        const data = peripheralAction(id, MessageAction.UPDATE_STATE, {
            brightness: brightness,
            speed:speed,
            lighting_time: lightingTime
        });
        await mutation.mutateAsync(data);
        committedState.current = {brightness, speed, lightingTime};
    }

    return (
        <BaseWidget
            name={config?.name}
            className={`${styles.widget} ${!isOnline ? styles.offlineWidget : ""}`}
            w={3}
            h={3}
        >
            <div
                className={`${styles.panel} ${state.is_on ? styles.on : styles.off} ${isLoading ? styles.syncing : ""} ${!isOnline ? styles.offline : ""}`}
                style={{
                    "--brightness": brightness,
                    "--speed": speed,
                } as CSSProperties}
            >
                <div className={styles.topBar}>
                    <button
                        type="button"
                        className={`${styles.actionButton} ${styles.blinkButton}`}
                        onClick={() => void handleBlink()}
                        disabled={isDisabled || state.is_on}
                        aria-label={t("sequentialLight.blinkButton")}
                        title={t("sequentialLight.blinkButton")}
                    >
                        <PlayOutlineIcon />
                        <span>{t("sequentialLight.blinkButton")}</span>
                    </button>

                    <button
                        type="button"
                        className={`${styles.actionButton} ${styles.powerButton}`}
                        onClick={() => void handleToggle()}
                        disabled={isDisabled}
                        aria-pressed={state.is_on}
                    >
                        <OffIcon />
                        <span>{statusText}</span>
                    </button>
                </div>

                <div className={styles.timeControl}>
                    <label htmlFor={`lighting-time-${id}`}>{t("sequentialLight.lightningTime")}</label>
                    <NumberInput
                        id={`lighting-time-${id}`}
                        min={0}
                        step={1}
                        value={lightingTime}
                        onChange={handleTime}
                        disabled={isDisabled}
                        suffix="s"
                        size="sm"
                        className={styles.timeInput}
                    />
                </div>

                <div className={styles.controls}>
                    <div className={styles.controlBlock}>
                        <div className={styles.controlHeader}>
                            <span>{t("sequentialLight.brightness")}</span>
                            <strong>{brightness}%</strong>
                        </div>
                        <RangeControl
                            value={brightness}
                            disabled={isDisabled}
                            offline={!isOnline}
                            ariaLabel={t("sequentialLight.brightness")}
                            toneStart="rgba(148, 163, 184, 0.82)"
                            toneEnd="rgba(250, 204, 21, 0.95)"
                            onChange={setBrightness}
                        />
                    </div>

                    <div className={styles.controlBlock}>
                        <div className={styles.controlHeader}>
                            <span>{t("sequentialLight.speed")}</span>
                            <strong>{speed}%</strong>
                        </div>
                        <RangeControl
                            value={speed}
                            disabled={isDisabled}
                            offline={!isOnline}
                            ariaLabel={t("sequentialLight.speed")}
                            toneStart="rgba(56, 189, 248, 0.78)"
                            toneEnd="rgba(34, 197, 94, 0.9)"
                            onChange={setSpeed}
                        />
                    </div>
                </div>

                <button
                    type="button"
                    className={styles.saveButton}
                    onClick={() => void handleSave()}
                    disabled={isDisabled || !hasChanges}
                >
                    <span>{isLoading ? t("widgetState.sync") : t("button.apply")}</span>
                </button>
            </div>
        </BaseWidget>
    );
}
