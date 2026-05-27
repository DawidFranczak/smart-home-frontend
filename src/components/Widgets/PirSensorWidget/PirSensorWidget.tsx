import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {IPirSensorWidget} from "../../../interfaces/Widgets/IPirSensorWidget.ts";
import EyeIcon from '@rsuite/icons/Visible';
import EyeOffIcon from '@rsuite/icons/Unvisible';
import styles from './PirSensorWidget.module.css';
import {useTranslation} from "react-i18next";

export default function PirSensorWidget({ state, config, isOnline }: IPirSensorWidget) {
    const {t} = useTranslation();
    const isMotion = state.is_on;
    const statusText = !isOnline
        ? t("widgetState.offline")
        : isMotion
            ? t("pirSensor.motion")
            : t("pirSensor.clear");

    return (
        <BaseWidget
            name={config.name}
            className={`${styles.widget} ${!isOnline ? styles.offlineWidget : ""}`}
        >
            <div className={`${styles.readout} ${isMotion ? styles.motion : styles.clear} ${!isOnline ? styles.offline : ""}`}>
                <div className={styles.sensor} aria-hidden="true">
                    <span className={styles.scanLine} />
                    <span className={styles.scanLine} />
                    <span className={styles.scanLine} />
                    <span className={styles.lens}>
                        {isMotion ? (
                            <EyeIcon className={styles.icon} />
                        ) : (
                            <EyeOffIcon className={styles.icon} />
                        )}
                    </span>
                </div>
                <div className={styles.textBlock}>
                    <span className={styles.statusText}>{statusText}</span>
                </div>
            </div>
        </BaseWidget>
    );
}
