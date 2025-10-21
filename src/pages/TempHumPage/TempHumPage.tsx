import { useParams } from "react-router-dom";
import { useState, SyntheticEvent } from "react";
import { DateRangePicker, Panel, Grid, Row, Col } from 'rsuite';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import useTempHumQuery from "../../hooks/queries/useTempHumQuery.tsx";
import useTempHumHistoryQuery from "../../hooks/queries/useTempHumHistoryQuery.tsx";

import LoadingAnimation from "../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../components/ui/Headers/PageHeader/PageHeader.tsx";
import DeviceActionPanel from "../../components/DeviceActionPanel/DeviceActionPanel.tsx";

import formatDate from "../../utils/formatDate.tsx";
import styles from "./TempHumPage.module.css";
import {DateRange} from "rsuite/DateRangePicker";

export default function TempHumPage() {
    const sensor_id: number = parseInt(useParams().id as string);
    const { tempHumData } = useTempHumQuery(sensor_id);

    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const { tempHumHistoryData } = useTempHumHistoryQuery(sensor_id, startDate, endDate);

    const prepareChartData = () => {
        if (!tempHumHistoryData?.temperature?.chart_data || !tempHumHistoryData?.humidity?.chart_data) return [];

        return tempHumHistoryData.temperature.chart_data
            .map((tempItem: any, index: number) => {
                const humItem = tempHumHistoryData.humidity.chart_data[index];
                const dataPoint: any = { timestamp: tempItem.timestamp };
                if (tempItem.value !== null && tempItem.value !== undefined) dataPoint.temperature = tempItem.value;
                if (humItem?.value !== null && humItem?.value !== undefined) dataPoint.humidity = humItem.value;
                return dataPoint;
            })
            .filter(item => item.temperature !== undefined || item.humidity !== undefined);
    };

    const chartData = prepareChartData();

    if (!tempHumData) return <LoadingAnimation size="xlarge" type="spinner" glow={true} />;

    function handleDateChange(value: DateRange | null, _: SyntheticEvent) {
        if (!value) return;
        setStartDate(formatDate(value[0] as Date, "YYYY-MM-DD"));
        setEndDate(formatDate(value[1] as Date, "YYYY-MM-DD"));
    }

    const StatCard = ({ title, value, unit, color, icon }: { title: string; value: number | null | undefined; unit: string; color: string; icon: string }) => (
        <Panel bordered className={styles.statCard}>
            <div className={styles.statCardContent}>
                <div className={styles.statCardIcon}>{icon}</div>
                <div className={styles.statCardTitle}>{title}</div>
                <div className={styles.statCardValue} style={{ color }}>{value !== null && value !== undefined ? value.toFixed(1) : '--'}</div>
                <div className={styles.statCardUnit}>{unit}</div>
            </div>
        </Panel>
    );

    const AggregationSection = () => {
        if (!tempHumHistoryData?.temperature?.aggregation_data || !tempHumHistoryData?.humidity?.aggregation_data) return null;
        const tempAgg = tempHumHistoryData.temperature.aggregation_data;
        const humAgg = tempHumHistoryData.humidity.aggregation_data;

        return (
            <div className={styles.aggregationSection}>
                <h3>Statystyki dla wybranego okresu</h3>
                <Grid fluid>
                    <Row gutter={16} className={styles.statRow}>
                        <Col xs={24} sm={12} md={8}><StatCard title="Średnia temperatura" value={tempAgg.avg} unit="°C" color="#4dabf7" icon="🌡️"/></Col>
                        <Col xs={24} sm={12} md={8}><StatCard title="Maksymalna temperatura" value={tempAgg.max} unit="°C" color="#ff6b6b" icon="🔥"/></Col>
                        <Col xs={24} sm={12} md={8}><StatCard title="Minimalna temperatura" value={tempAgg.min} unit="°C" color="#91a7ff" icon="❄️"/></Col>
                    </Row>
                    <Row gutter={16} className={styles.statRow}>
                        <Col xs={24} sm={12} md={8}><StatCard title="Średnia wilgotność" value={humAgg.avg} unit="%" color="#82ca9d" icon="💧"/></Col>
                        <Col xs={24} sm={12} md={8}><StatCard title="Maksymalna wilgotność" value={humAgg.max} unit="%" color="#5c7cfa" icon="🌊"/></Col>
                        <Col xs={24} sm={12} md={8}><StatCard title="Minimalna wilgotność" value={humAgg.min} unit="%" color="#91a7ff" icon="☁️"/></Col>
                    </Row>
                </Grid>
            </div>
        );
    };

    return (
        <PageContainer>
            <PageHeader title={tempHumData.name}>
                <DeviceActionPanel
                    buttons={[
                        { label: "Ustawienia urządzenia", to: `/button/${tempHumData.id}/settings/`, type: "default", tooltip: "Zmień ustawienia przycisku" }
                    ]}
                    wifiStrength={tempHumData.is_online ? tempHumData.wifi_strength : -100}
                    showWifi={true}
                />
            </PageHeader>

            <div className={styles.datePickerContainer}>
                <DateRangePicker
                    format="dd.MM.yyyy"
                    character=" – "
                    onChange={handleDateChange}
                    style={{ width: '100%', maxWidth: '400px' }}
                    placeholder="Wybierz zakres dat"
                    cleanable
                />
            </div>

            <div className={styles.chartContainer}>
                {!tempHumHistoryData ? (
                    <LoadingAnimation size="large" type="spinner" glow={true}/>
                ) : chartData.length > 0 ? (
                    <Panel bordered className={styles.chartPanel}>
                        <h3>Historia temperatury i wilgotności</h3>
                        <div className={styles.chartWrapper}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="timestamp" tickFormatter={(v) => formatDate(v,"DD/MM HH")} stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 11, fill: '#aaa' }}/>
                                    <YAxis yAxisId="left" orientation="left" stroke="#4dabf7" tick={{ fontSize: 11, fill: '#aaa' }} label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft', fontSize: 18, fill: '#777' }} />
                                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tick={{ fontSize: 11, fill: '#aaa' }} label={{ value: 'Wilgotność (%)', angle: 90, position: 'insideRight', fontSize: 18, fill: '#777' }} />
                                    <Tooltip contentStyle={{ backgroundColor: 'rgba(30,30,35,0.95)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                                    <Legend wrapperStyle={{ color: '#ccc', fontSize: 14 }} />
                                    <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#4dabf7" strokeWidth={2} dot={false}/>
                                    <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#82ca9d" strokeWidth={2} dot={false}/>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Panel>
                ) : (
                    <Panel bordered className={styles.noDataPanel}>
                        <div>📊 Brak danych dla wybranego zakresu</div>
                    </Panel>
                )}

                <AggregationSection />
            </div>
        </PageContainer>
    );
}
