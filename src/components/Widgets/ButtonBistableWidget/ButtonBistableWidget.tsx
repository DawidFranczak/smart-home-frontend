import {useEffect, useState} from "react";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {IBistableButtonWidget} from "../../../interfaces/Widgets/IBistableButtonWidget.ts";
import styles from "./ButtonBistableWidget.module.css"
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import {MessageAction} from "../../../enums/message_command.ts";
import {useTranslation} from "react-i18next";
import PowerButtonControl from "../shared/PowerButtonControl/PowerButtonControl.tsx";

export default function BistableButtonWidget({ id, state, config, pending, isOnline = true }: IBistableButtonWidget) {
    const [value, setValue] = useState(state.is_on);
    const mutation = useTriggerActionEventMutation()
    const {t} = useTranslation();
    const isPending = mutation.isPending || pending.includes(MessageAction.TOGGLE);
    const isDisabled = !isOnline || isPending;
    const stateText = !isOnline
        ? t("widgetState.offline")
        : isPending
            ? t("widgetState.sync")
            : value
                ? t("widgetState.on")
                : t("widgetState.off");

    useEffect(() => {
        setValue(state.is_on);
    }, [state.is_on]);

    async function handleChange() {
        if (isDisabled) return;

        const previousValue = value;
        setValue(!value);

        const data = peripheralAction(id, MessageAction.TOGGLE);
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
                onClick={handleChange}
                disabled={isDisabled}
                offline={!isOnline}
                syncing={isPending}
            />
        </BaseWidget>
    );
}
