import {SyntheticEvent, useEffect, useMemo, useState} from "react";
import {DateRangePicker, Panel} from "rsuite";
import styles from "./TemperatureChart.module.css"
import {DateRange} from "rsuite/DateRangePicker";
import LoadingAnimation from "../../ui/LoadingAnimation/LoadingAnimation.tsx";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip} from "recharts";
import formatDate from "../../../utils/formatDate.tsx";
interface IChartData {
    timestamp: string;
    value: number;
}

interface TemperatureChartProps {
    temperatureData?: IChartData[];
    humidityData?: IChartData[];
    onDataChange: (value: DateRange | null, _: SyntheticEvent) => void;
}

function prepareChartData(temperatureData:IChartData[]| undefined, humidityData:IChartData[]|undefined) {
    if (!temperatureData && !humidityData) return [];

    const maxLength = Math.max(
        temperatureData?.length || 0,
        humidityData?.length || 0
    );

    const result: any[] = [];

    for (let i = 0; i < maxLength; i++) {
        const tempItem = temperatureData?.[i];
        const humItem = humidityData?.[i];

        if ((tempItem && tempItem.value !== null && tempItem.value !== undefined) ||
            (humItem && humItem.value !== null && humItem.value !== undefined)) {

            const dataPoint: any = {};
            if (tempItem) dataPoint.timestamp = tempItem.timestamp.replace("T", " ");
            else if(humItem) dataPoint.timestamp = humItem.timestamp.replace("T", " ");
            if (tempItem?.value !== null && tempItem?.value !== undefined) dataPoint.temperature = tempItem.value.toFixed(2);
            if (humItem?.value !== null && humItem?.value !== undefined) dataPoint.humidity = humItem.value.toFixed(2);

            result.push(dataPoint);
        }
    }
    return result;
}

export default function TemperatureChart({onDataChange, temperatureData, humidityData}: TemperatureChartProps) {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    },[])

    const chartData = useMemo(()=> prepareChartData(temperatureData,humidityData),[temperatureData,humidityData]);
    console.log(chartData)
    if (windowWidth < 786){
        return <div className={styles.noChartMessage}>
            📱 Wyświetlacz jest zbyt wąski aby wyświetlić wykres
        </div>
    }

    return <>
        <div className={styles.datePickerContainer}>
            <DateRangePicker
                format="dd.MM.yyyy"
                character=" – "
                onChange={onDataChange}
                style={{width: '100%', maxWidth: '400px'}}
                placeholder="Wybierz zakres dat"
                cleanable
            />
        </div>
        <div className={styles.chartContainer}>
            {!temperatureData && ! humidityData ? (
                <LoadingAnimation size="large" type="spinner" glow={true}/>
            ) : chartData.length > 0 ? (
                <Panel bordered className={styles.chartPanel}>
                    <h3>Historia temperatury i wilgotności</h3>
                    <div className={styles.chartWrapper}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
                                <XAxis dataKey="timestamp" tickFormatter={(v) => formatDate(v, "DD/MM HH")}
                                       stroke="rgba(255,255,255,0.4)" tick={{fontSize: 11, fill: '#aaa'}}/>
                                {temperatureData?.length && temperatureData?.length > 1 && <>
                                    <YAxis yAxisId="left" orientation="left" stroke="#4dabf7"
                                           tick={{fontSize: 11, fill: '#aaa'}} label={{
                                        value: 'Temperatura (°C)',
                                        angle: -90,
                                        position: 'insideLeft',
                                        fontSize: 18,
                                        fill: '#777'
                                    }}/>
                                    <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#4dabf7"
                                          strokeWidth={2} dot={false}/>
                                </>}
                                {humidityData?.length && humidityData?.length > 1  && <>
                                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"
                                           tick={{fontSize: 11, fill: '#aaa'}} label={{
                                        value: 'Wilgotność (%)',
                                        angle: 90,
                                        position: 'insideRight',
                                        fontSize: 18,
                                        fill: '#777'
                                    }}/>
                                    <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#82ca9d"
                                          strokeWidth={2} dot={false}/>
                                </>
                                }
                                <Tooltip contentStyle={{
                                    backgroundColor: 'rgba(30,30,35,0.95)',
                                    color: '#fff',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px'
                                }}/>
                                <Legend wrapperStyle={{color: '#ccc', fontSize: 14}}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Panel>
            ) : (
                <Panel bordered className={styles.noDataPanel}>
                    <div>📊 Brak danych dla wybranego zakresu</div>
                </Panel>
            )}
        </div>
    </>
}