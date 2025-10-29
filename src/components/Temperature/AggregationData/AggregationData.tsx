import styles from "./AggregationData.module.css"
import StatCard from "../StatCard/StatCard.tsx";
import {Col, Grid, Row} from "rsuite";

interface IAggregationData {
    avg: number
    max: number
    min: number
}
interface AggregationDataProps {
    temperature?:IAggregationData
    humidity?:IAggregationData
}
export default function AggregationData({temperature, humidity}:AggregationDataProps) {
    if (!temperature && !humidity) return null;
    return (
        <div className={styles.aggregationSection}>
            <h3>Statystyki dla wybranego okresu</h3>
            <Grid fluid>
                {temperature &&
                <Row gutter={16} className={styles.statRow}>
                    <Col xs={24} sm={12} md={8}><StatCard title="Średnia temperatura" value={temperature.avg} unit="°C" color="#4dabf7" icon="🌡️"/></Col>
                    <Col xs={24} sm={12} md={8}><StatCard title="Maksymalna temperatura" value={temperature.max} unit="°C" color="#ff6b6b" icon="🔥"/></Col>
                    <Col xs={24} sm={12} md={8}><StatCard title="Minimalna temperatura" value={temperature.min} unit="°C" color="#91a7ff" icon="❄️"/></Col>
                </Row>}
                {humidity &&
                <Row gutter={16} className={styles.statRow}>
                    <Col xs={24} sm={12} md={8}><StatCard title="Średnia wilgotność" value={humidity.avg} unit="%" color="#82ca9d" icon="💧"/></Col>
                    <Col xs={24} sm={12} md={8}><StatCard title="Maksymalna wilgotność" value={humidity.max} unit="%" color="#5c7cfa" icon="🌊"/></Col>
                    <Col xs={24} sm={12} md={8}><StatCard title="Minimalna wilgotność" value={humidity.min} unit="%" color="#91a7ff" icon="☁️"/></Col>
                </Row>}
            </Grid>
        </div>
    );
};