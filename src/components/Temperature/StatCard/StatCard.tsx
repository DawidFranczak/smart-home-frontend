import styles from "./StatCard.module.css";
import {Panel} from "rsuite";
interface IStatCardProps {
    title: string
    value: number | null | undefined
    unit: string
    color: string
    icon: string
}

export default function StatCard ({ title, value, unit, color, icon }:IStatCardProps) {
    return <Panel bordered className={styles.statCard}>
        <div className={styles.statCardContent}>
            <div className={styles.statCardIcon}>{icon}</div>
            <div className={styles.statCardTitle}>{title}</div>
            <div className={styles.statCardValue}
                 style={{color}}>{value !== null && value !== undefined ? value.toFixed(1) : '--'}</div>
            <div className={styles.statCardUnit}>{unit}</div>
        </div>
    </Panel>
}