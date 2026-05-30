import {Card} from "rsuite";
import styles from "./StatsCard.module.css";
interface IStatCardProps {
    title: string;
    value: number | null | undefined;
    unit: string;
    color: string;
}
export default function StatCard({ title, value, unit, color }: IStatCardProps) {
    return (
        <Card
            size="sm"
            className={styles.statCard}
            style={{ "--stat-color": color } as React.CSSProperties}
        >
            <Card.Header className={styles.header}>
                <span className={styles.title}>{title}</span>
            </Card.Header>
            <Card.Body className={styles.content}>
                <span className={styles.value}>
                    {typeof value === 'number' ? value.toFixed(1) : '--'}
                </span>
                <span className={styles.unit}>{unit}</span>
            </Card.Body>
        </Card>
    );
}
