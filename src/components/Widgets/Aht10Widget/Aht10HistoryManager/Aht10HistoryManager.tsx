import {DateRangePicker, Modal} from "rsuite";
import useMeasurementQuery from "../../../../hooks/queries/useMeasurementQuery.tsx";
import {DateRange} from "rsuite/esm/DateRangePicker";
import {SyntheticEvent, useState} from "react";
import MeasurementEvent from "../../../../constant/measurementEvent.ts";
import MetricChart from "../../../MetricChart/MetricChart.tsx";
import {useTranslation} from "react-i18next";
import MetricAggregationData from "../../../MetricAggregationData/MetricAggregationData.tsx";
import styles from "./Aht10HistoryManager.module.css";
interface IProps{
    id:number
    open:boolean
    onClose:()=>void
}

export default function Aht10HistoryManager({id, open, onClose}:IProps) {
    const {t} = useTranslation();
    const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 24 * 60 * 60 * 1000));
    const { data: temperatureData } = useMeasurementQuery(id, MeasurementEvent.TEMPERATURE, startDate, endDate, open);
    const { data: humidityData } = useMeasurementQuery(id, MeasurementEvent.HUMIDITY, startDate, endDate, open);

    function handleDateChange(value: DateRange | null, _: SyntheticEvent) {
        if (!value) return;
        setStartDate(value[0]);
        setEndDate(new Date(value[1].getTime() + 24 * 60 * 60 * 1000));
    }
    if (!temperatureData || !humidityData) return null;
    return (
        <Modal
            open={open}
            onClose={onClose}
            size="lg"
            className={styles.historyModal}
        >
            <Modal.Header>
                <div className={styles.modalHeader}>
                    <div>
                        <span className={styles.eyebrow}>AHT10 telemetry</span>
                        <h3 className={styles.title}>{t("tempHumWidget.historicalData")}</h3>
                    </div>
                    <DateRangePicker
                        className={styles.datePicker}
                        format="dd.MM.yyyy"
                        character=" – "
                        onChange={handleDateChange}
                        cleanable
                        value={[startDate, endDate]}
                    />
                </div>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <div className={styles.smallScreenNotice}>
                    <span className={styles.rotateIcon}>↻</span>
                    <h4>{t("measurementHistoryManager.smallScreen")}</h4>
                    <p>{t("measurementHistoryManager.smallScreenDes")}</p>
                </div>
                <div className={styles.chartPanel}>
                    <MetricChart series={[
                    {
                        key: 'temperature',
                        label: t("measurementHistoryManager.temperatureLabel"),
                        color: '#f97316',
                        yAxisSide: 'left',
                        data: temperatureData.chart_data
                    },
                    {
                        key: 'humidity',
                        label: t("measurementHistoryManager.humidityLabel"),
                        color: '#22c55e',
                        yAxisSide: 'right',
                        data: humidityData.chart_data
                    }
                    ]}/>
                </div>
                <div className={styles.aggregationPanel}>
                    <MetricAggregationData groups={[
                        {
                            key: 'temp',
                            label: t('temperature'),
                            unit: '°C',
                            color: '#f97316',
                            data: temperatureData?.aggregation_data
                        },
                        {
                            key: 'humi',
                            label: t('humidity'),
                            unit: '%',
                            color: '#22c55e',
                            data: humidityData?.aggregation_data
                        }
                    ]}/>
                </div>
            </Modal.Body>
        </Modal>
    )
}
