import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {IPinInputWidget} from "../../../interfaces/Widgets/IPinInput.ts";
import {useTranslation} from "react-i18next";
import styles from "./PinInputWidget.module.css";

export default function PinInputWidget({state, config, isOnline = true}:IPinInputWidget){
    const {t} = useTranslation();
    const isActive = state.is_on;

    const statusText = !isOnline
        ? t("widgetState.offline")
        : isActive
                ? t("widgetState.on")
                : t("widgetState.off");
    return (
        <BaseWidget
            name={config?.name}
            className={`${styles.widget} ${!isOnline ? styles.offlineWidget : ""}`}
        >
            <div className={`${styles.readout} ${isActive ? styles.active : styles.inactive} ${!isOnline ? styles.offline : ""}`}>
                <div className={styles.signal} aria-hidden="true">
                    <span className={styles.signalCore} />
                    <span className={styles.signalRing} />
                </div>
                <div>
                    <span className={styles.statusText}>{statusText}</span>
                </div>
            </div>
        </BaseWidget>
    );
}
