import {CSSProperties, useEffect, useRef, useState} from "react";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import {MessageAction} from "../../../enums/message_command.ts";
import {IPwmWidget} from "../../../interfaces/Widgets/IPwmState.ts";
import styles from "./PinPwmWidget.module.css";
import RangeControl from "../shared/RangeControl/RangeControl.tsx";

export default function PinPwmWidget({id, state, config, pending, isOnline = true}:IPwmWidget){
    const [value, setValue] = useState(state.duty_cycle);
    const committedValue = useRef(state.duty_cycle);
    const mutation = useTriggerActionEventMutation()
    const isLoading = mutation.isPending || pending.includes(MessageAction.UPDATE_STATE)
    const isDisabled = !isOnline || isLoading;

    useEffect(()=>{
        if (isLoading) return;
        setValue(state.duty_cycle);
        committedValue.current = state.duty_cycle;
    },[isLoading])

    function handleChange(nextValue: number) {
        setValue(nextValue);
    }

    async function handleSave(nextValue = value) {
        if (isDisabled || nextValue === committedValue.current) return;

        const previousValue = committedValue.current;
        committedValue.current = nextValue;
        const data = peripheralAction(id, MessageAction.UPDATE_STATE, {"duty_cycle":nextValue});

        try {
            await mutation.mutateAsync(data)
        } catch {
            committedValue.current = previousValue;
            setValue(previousValue);
        }
    }

    return (
        <BaseWidget
            name={config?.name}
            className={`${styles.widget} ${!isOnline ? styles.offlineWidget : ""}`}
            w={3}
        >
            <div
                className={`${styles.control} ${isLoading ? styles.syncing : ""} ${!isOnline ? styles.offline : ""}`}
                style={{"--pwm-value": value} as CSSProperties}
            >
                <div className={styles.readout}>
                    <span className={styles.value}>{value}</span>
                    <span className={styles.unit}>%</span>
                </div>

                <RangeControl
                    value={value}
                    disabled={isDisabled}
                    offline={!isOnline}
                    ariaLabel={config?.name ?? "PWM duty cycle"}
                    onChange={handleChange}
                    onCommit={handleSave}
                />
            </div>
        </BaseWidget>
    )
}