import {useEffect, useState} from "react";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {MessageAction} from "../../../enums/message_command.ts";
import {IPinOutputWidget} from "../../../interfaces/Widgets/IPinOutput.ts";
import styles from "./PinOutputWidget.module.css";
import {useTranslation} from "react-i18next";
import PowerButtonControl from "../shared/PowerButtonControl/PowerButtonControl.tsx";


export default function PinOutputWidget({id, state, config, pending, isOnline = true}:IPinOutputWidget){
    const [value, setValue] = useState(state.is_on);
    const mutation = useTriggerActionEventMutation()
    const isLoading = mutation.isPending || pending.includes(MessageAction.TOGGLE)
    const {t} = useTranslation();
    const isDisabled = !isOnline || isLoading;
    const stateText = !isOnline
        ? t("widgetState.offline")
        : isLoading
            ? t("widgetState.sync")
            : value
                ? t("widgetState.on")
                : t("widgetState.off");

    useEffect(() => {
        setValue(state.is_on);
    }, [state.is_on]);

    async function handleToggle() {
        if (isDisabled) return;

        const previousValue = value;
        setValue(!value);
        const data = peripheralAction(id,MessageAction.TOGGLE, {});
        try {
            await mutation.mutateAsync(data)
        } catch {
            setValue(previousValue);
        }
    }
    return (
        <BaseWidget
            name={config?.name}
            className={`${styles.widget} ${!isOnline ? styles.offlineWidget : ""}`}
        >
            <PowerButtonControl
                checked={value}
                label={stateText}
                onClick={handleToggle}
                disabled={isDisabled}
                offline={!isOnline}
                syncing={isLoading}
            />
        </BaseWidget>
    );
}
