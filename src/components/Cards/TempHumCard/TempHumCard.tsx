import styles from "./TempHumCard.module.css";
import { IDevice } from "../../../interfaces/IDevice";
import ThreeDot from "../../ui/ThreeDot/ThreeDot.tsx";
import Header from "../../ui/Headers/Header/Header.tsx";

type TempHumDevice = IDevice & {
    temperature?: number;
    humidity?: number;
    timestamp?: string;
};

function formatNumber(value?: number) {
    if (value === undefined || value === null || Number.isNaN(value)) return "N/A";
    return value.toFixed(2);
}

export default function TempHumCard(tempHum: TempHumDevice) {
    const temperature = formatNumber((tempHum as any).temperature);
    const humidity = formatNumber((tempHum as any).humidity);
    return (
        <div className={styles.container}>
            <ThreeDot className={styles.threeDots} to={`/temperature/${tempHum.id}/`}/>
            <Header className={styles.header} disable={!tempHum.is_online}>{tempHum.name}</Header>
            <div className={styles.measurement}>
                <div className={styles.temperature}>
                    <div className={styles.temperatureBar}></div> <p className={styles.temperatureValue}>{temperature} °C</p>
                </div>
                <div className={styles.humidity}>
                    <div className={styles.humidityBar}></div> <p className={styles.humidityValue}>{humidity} %</p>
                </div>
            </div>
        </div>
    );
}
