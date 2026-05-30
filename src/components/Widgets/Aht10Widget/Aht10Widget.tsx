import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {IAht10Widget} from "../../../interfaces/Widgets/IAht10.ts";
import {Button} from "rsuite";
import WavePointIcon from '@rsuite/icons/WavePoint';
import styles from './Aht10Widget.module.css';
import {useState} from "react";
import {useTranslation} from "react-i18next";
import Aht10HistoryManager from "./Aht10HistoryManager/Aht10HistoryManager.tsx";
import formatDate from "../../../utils/formatDate.tsx";

export default function Aht10Widget({id, state, config}:IAht10Widget) {
    const [showHistory, setShowHistory] = useState(false);
    const {t} = useTranslation();

    return (
        <BaseWidget name={config?.name} w={3} h={2} className={styles.widget}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <span className={styles.eyebrow}>AHT10</span>
                        <p className={styles.heading}>{t("tempHumWidget.temperature")} / {t("tempHumWidget.humidity")}</p>
                    </div>
                    <span className={styles.liveBadge}>Live</span>
                </div>
                <div className={styles.dataGrid}>
                    <div className={`${styles.dataItem} ${styles.temperature}`}>
                        <span className={styles.label}>{t("tempHumWidget.temperature")}</span>
                        <span className={styles.value}>
                            {state?.temperature?.toFixed(1) ?? "--"}
                            <span className={styles.unit}>°C</span>
                        </span>
                    </div>

                    <div className={`${styles.dataItem} ${styles.humidity}`}>
                        <span className={styles.label}>{t("tempHumWidget.humidity")}</span>
                        <span className={styles.value}>
                            {state?.humidity?.toFixed(1) ?? "--"}
                            <span className={styles.unit}>%</span>
                        </span>
                    </div>
                </div>
                <div className={styles.lastRead}>
                    <span className={styles.label}>{t("tempHumWidget.lastRead")}</span>
                    <span className={styles.lastReadValue}>{formatDate(state.last_read)}</span>
                </div>

                <div className={styles.footer}>
                    <Button
                        className={styles.managerButton}
                        appearance="subtle"
                        startIcon={<WavePointIcon />}
                        onClick={() => setShowHistory(true)}
                    >
                        {t("tempHumWidget.historicalData")}
                    </Button>
                </div>
            </div>

            <Aht10HistoryManager
                id={id}
                open={showHistory}
                onClose={()=>setShowHistory(false)}
            />
        </BaseWidget>
    )
}
