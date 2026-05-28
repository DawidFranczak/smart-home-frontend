import {CSSProperties, useEffect, useMemo, useReducer, useState} from "react";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import Wheel from "@uiw/react-color-wheel";
import {HsvaColor, rgbaToHsva} from "@uiw/color-convert";
import {IRGBStripWidget} from "../../../interfaces/Widgets/IRGBStrip.ts";
import styles from "./RGBStripWidget.module.css";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import {MessageAction} from "../../../enums/message_command.ts";
import reducer from "./reducer.ts";
import initState from "./initState.ts";
import {useTranslation} from "react-i18next";
import RangeControl from "../shared/RangeControl/RangeControl.tsx";

export default function RGBStripWidget({id, state, config, pending, isOnline = true}:IRGBStripWidget){
    const [rstate, dispatch] = useReducer(reducer, initState(state, config));
    const mutation = useTriggerActionEventMutation()
    const isUpdateLoading = mutation.isPending || pending.includes(MessageAction.UPDATE_STATE);
    const isToggleLoading = mutation.isPending || pending.includes(MessageAction.TOGGLE);
    const isLoading = isUpdateLoading || isToggleLoading;
    const isDisabled = !isOnline || isLoading;
    const activeColor = useMemo(() => normalizeRgb(rstate), [rstate.r_duty_cycle, rstate.g_duty_cycle, rstate.b_duty_cycle]);
    const stripColor = `rgb(${activeColor.r}, ${activeColor.g}, ${activeColor.b})`;
    const dimmedStripColor = `rgba(${activeColor.r}, ${activeColor.g}, ${activeColor.b}, ${rstate.is_on ? Math.max(rstate.brightness, 12) / 100 : 0.16})`;
    const [hsva, setHsva] = useState<HsvaColor>(rgbaToHsva(
        {
            r:activeColor.r,
            g:activeColor.g,
            b:activeColor.b,
            a:1
        }
    ));
    const {t} = useTranslation();
    const statusText = !isOnline
        ? t("widgetState.offline")
        : isLoading
            ? t("widgetState.sync")
            : rstate.is_on
                ? t("widgetState.on")
                : t("widgetState.off");

    useEffect(() => {
        const nextState = initState(state, config);
        dispatch({type: "set/state", payload: {state: nextState}});
        const nextColor = normalizeRgb(nextState);
        setHsva(rgbaToHsva({r: nextColor.r, g: nextColor.g, b: nextColor.b, a: 1}));
    }, [state, config]);

    async function handleSave(){
        if (isDisabled) return;

        const data = peripheralAction(id, MessageAction.UPDATE_STATE, rstate);
        await mutation.mutateAsync(data)
    }

    async function handleToggle(){
        if (isDisabled) return;

        const previousValue = rstate.is_on;
        dispatch({type:"set/isOn",payload:{isOn: !previousValue}})
        const data = peripheralAction(id, MessageAction.TOGGLE, {});
        try {
            await mutation.mutateAsync(data)
        } catch {
            dispatch({type:"set/isOn",payload:{isOn: previousValue}})
        }
    }

    return (
        <BaseWidget
            name={config?.name}
            className={`${styles.widget} ${!isOnline ? styles.offlineWidget : ""}`}
            w={3}
            h={3}
        >
            <div
                className={`${styles.panel} ${rstate.is_on ? styles.on : styles.off} ${isLoading ? styles.syncing : ""} ${!isOnline ? styles.offline : ""}`}
                style={{
                    "--strip-color": stripColor,
                    "--strip-glow": dimmedStripColor,
                    "--brightness": rstate.brightness,
                } as CSSProperties}
            >
                <button
                    type="button"
                    className={styles.powerButton}
                    onClick={handleToggle}
                    disabled={isDisabled}
                    aria-pressed={rstate.is_on}
                >
                    <span className={styles.powerDot} />
                    <span>{statusText}</span>
                </button>

                <div className={styles.controls}>
                    <div className={styles.wheelWrap}>
                        <Wheel
                            width={160}
                            height={160}
                            className={styles.colorWheel}
                            color={hsva}
                            onChange={(color) => {
                                if (isDisabled) return;
                                dispatch({
                                    type: "set/color",
                                    payload: {rgb: color.rgb},
                                });
                                setHsva(color.hsva);
                            }}
                        />
                    </div>

                    <div className={styles.faderBlock}>
                        <div className={styles.brightnessRow}>
                            <span>{t("rgbStrip.brightness")}</span>
                            <strong>{rstate.brightness}%</strong>
                        </div>
                        <RangeControl
                            value={rstate.brightness}
                            disabled={isDisabled}
                            offline={!isOnline}
                            ariaLabel={t("rgbStrip.brightness")}
                            toneStart="rgba(148, 163, 184, 0.82)"
                            toneEnd={stripColor}
                            onChange={(value)=> dispatch({ type:"set/brightness",payload:{brightness:value}})}
                        />
                    </div>
                </div>

                <div className={styles.footer}>
                    <button
                        type="button"
                        className={styles.applyButton}
                        onClick={() => void handleSave()}
                        disabled={isDisabled}
                    >
                        {isUpdateLoading ? t("widgetState.sync") : t("button.apply")}
                    </button>
                </div>
            </div>
        </BaseWidget>
    )
}

function normalizeRgb(state: Pick<IRGBStripWidget["state"], "r_duty_cycle" | "g_duty_cycle" | "b_duty_cycle">) {
    return {
        r: clampColor(state.r_duty_cycle),
        g: clampColor(state.g_duty_cycle),
        b: clampColor(state.b_duty_cycle),
    };
}

function clampColor(value: number) {
    return Math.min(255, Math.max(0, Math.round(value)));
}
