import {useEffect, useState} from "react";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {MessageAction} from "../../../enums/message_command.ts";
import {IRelayWidget} from "../../../interfaces/Widgets/IRelayWidget.ts";
import styles from "./RelayWidget.module.css";
import {useTranslation} from "react-i18next";

export default function RelayWidget({id, state, config, pending, isOnline }:IRelayWidget){
    const [value, setValue] = useState(state.is_on);
    const mutation = useTriggerActionEventMutation()
    const {t} = useTranslation();
    const isLoading =
        mutation.isPending ||
        pending.includes(MessageAction.TOGGLE) ||
        pending.includes(MessageAction.ON) ||
        pending.includes(MessageAction.OFF)

    const isDisabled = !isOnline || isLoading;
    const stateText = !isOnline
        ? t("widgetState.offline")
        : isLoading
            ? t("widgetState.sync")
            : value
                ? t("relayWidget.energized")
                : t("relayWidget.released");
    const contactText = value
        ? t("relayWidget.closed")
        : t("relayWidget.open");

    useEffect(() => {
        if (value !== state.is_on) setValue(state.is_on);
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
            <button
                type="button"
                className={`${styles.relay} ${value ? styles.energized : styles.released} ${isLoading ? styles.syncing : ""} ${!isOnline ? styles.offline : ""}`}
                onClick={handleToggle}
                disabled={isDisabled}
                aria-pressed={value}
            >
                <span className={styles.hardware} aria-hidden="true">
                    <span className={styles.coil}>
                        <span />
                        <span />
                        <span />
                    </span>
                    <span className={styles.contact}>
                        <span className={styles.terminal} />
                        <span className={styles.arm} />
                        <span className={styles.terminal} />
                    </span>
                </span>
                <span className={styles.textBlock}>
                    <span className={styles.stateText}>{stateText}</span>
                    <span className={styles.contactText}>{contactText}</span>
                </span>
            </button>
        </BaseWidget>
    );
}

