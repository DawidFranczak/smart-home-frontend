import { useTranslation } from "react-i18next";
import StatCard from "./StatsCard.tsx";
import styles from "./MetricAggregationData.module.css";

interface IAggregationValues {
    avg: number;
    max: number;
    min: number;
}

interface IAggregationGroup {
    key: string;
    label: string;
    unit: string;
    data: IAggregationValues;
    color: string;
}

interface AggregationDataProps {
    groups: IAggregationGroup[];
}

export default function MetricAggregationData({ groups }: AggregationDataProps) {
    const { t } = useTranslation();
    const activeGroups = groups.filter(g => g.data);

    if (activeGroups.length === 0) return null;

    return (
        <div className={styles.aggregationSection}>
            <div className={styles.sectionHeader}>
                <span className={styles.eyebrow}>Summary</span>
                <h3 className={styles.title}>{t("measurementHistoryManager.sectionTitle")}</h3>
            </div>
            <div className={styles.groupsGrid}>
                {activeGroups.map((group) => (
                    <div key={group.key} className={styles.groupWrapper}>
                        <h4 className={styles.groupLabel} style={{ "--group-color": group.color } as React.CSSProperties}>
                            {group.label}
                        </h4>
                        <div className={styles.statsContainer}>
                            <StatCard
                                title={t("measurementHistoryManager.avr")}
                                value={group.data.avg}
                                unit={group.unit}
                                color={group.color}
                            />
                            <StatCard
                                title={t("measurementHistoryManager.max")}
                                value={group.data.max}
                                unit={group.unit}
                                color="#ff6b6b"
                            />
                            <StatCard
                                title={t("measurementHistoryManager.min")}
                                value={group.data.min}
                                unit={group.unit}
                                color="#4dabf7"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
