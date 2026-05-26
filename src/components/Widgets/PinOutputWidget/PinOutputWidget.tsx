import {useEffect, useState} from "react";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {MessageAction} from "../../../enums/message_command.ts";
import {IPinOutputWidget} from "../../../interfaces/Widgets/IPinOutput.ts";
import styles from "./PinOutputWidget.module.css";
import OffIcon from "@rsuite/icons/Off";
import {useTranslation} from "react-i18next";


export default function PinOutputWidget({id, state, config, pending}:IPinOutputWidget){
    const [value, setValue] = useState(state.is_on);
    const mutation = useTriggerActionEventMutation()
    const isLoading = mutation.isPending || pending.includes(MessageAction.TOGGLE)
    const {t} = useTranslation();
    useEffect(() => {
        setValue(state.is_on);
    }, [state.is_on]);

    async function handleToggle() {
        if (isLoading) return;
        setValue(!value);
        const data = peripheralAction(id,MessageAction.TOGGLE, {});
        try {
            await mutation.mutateAsync(data)
        } catch {
            setValue(value);
        }
    }
    return (
        <BaseWidget name={config?.name} className={styles.widget}>
            <button
                type="button"
                className={`${styles.switchButton} ${value ? styles.active : styles.inactive}`}
                onClick={handleToggle}
                disabled={isLoading}
                role="switch"
                aria-checked={value}
            >
                <span className={styles.glow} />
                <span className={styles.iconRing}>
                    <OffIcon className={styles.icon} />
                </span>
                <span className={styles.stateText}>
                    {isLoading ? t("widgetState.sync") : value ? t("widgetState.on") : t("widgetState.off")}
                </span>
            </button>
        </BaseWidget>
    );
}
