import styles from "./AggregationData.module.css"
import StatCard from "../StatCard/StatCard.tsx";
import {Col, Grid, Row} from "rsuite";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation();
    if (!temperature && !humidity) return null;
    return (
        <div className={styles.aggregationSection}>
            <h3>{t("aggregationData.sectionTitle")}</h3>
            <Grid fluid>
                {temperature &&
                <Row gutter={16} className={styles.statRow}>
                    <Col xs={24} sm={12} md={8}><StatCard title={t("aggregationData.temperature.avg")} value={temperature.avg} unit="°C" color="#4dabf7" icon="🌡️"/></Col>
                    <Col xs={24} sm={12} md={8}><StatCard title={t("aggregationData.temperature.max")} value={temperature.max} unit="°C" color="#ff6b6b" icon="🔥"/></Col>
                    <Col xs={24} sm={12} md={8}><StatCard title={t("aggregationData.temperature.min")} value={temperature.min} unit="°C" color="#91a7ff" icon="❄️"/></Col>
                </Row>}
                {humidity &&
                <Row gutter={16} className={styles.statRow}>
                    <Col xs={24} sm={12} md={8}><StatCard title={t("aggregationData.humidity.avg")} value={humidity.avg} unit="%" color="#82ca9d" icon="💧"/></Col>
                    <Col xs={24} sm={12} md={8}><StatCard title={t("aggregationData.humidity.max")} value={humidity.max} unit="%" color="#5c7cfa" icon="🌊"/></Col>
                    <Col xs={24} sm={12} md={8}><StatCard title={t("aggregationData.humidity.min")} value={humidity.min} unit="%" color="#91a7ff" icon="☁️"/></Col>
                </Row>}
            </Grid>
        </div>
    );
};