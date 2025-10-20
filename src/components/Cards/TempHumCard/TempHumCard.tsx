import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer.tsx";
import CardIconContainer from "../../ui/containers/CardIconContainer/CardIconContainer.tsx";
import StyledLink from "../../ui/StyledLink/StyledLink.tsx";
import InfoCard from "../../ui/InfoCard/InfoCard";
import styles from "./TempHumCard.module.css";
import { IDevice } from "../../../interfaces/IDevice";

// Extend IDevice locally to support temperature/humidity readings without touching global types
type TempHumDevice = IDevice & {
    temperature?: number;
    humidity?: number;
    timestamp?: string; // optional explicit last reading timestamp
};

function formatIsoSeconds(value?: string) {
    if (!value) return "N/A";
    return value.length >= 19 ? value.slice(11, 19) : value;
}

function formatNumber(value?: number) {
    if (value === undefined || value === null || Number.isNaN(value)) return "N/A";
    return value.toFixed(2);
}

export default function TempHumCard(tempHum: TempHumDevice) {
    const lastDate = formatIsoSeconds(tempHum.timestamp);
    const temperature = formatNumber((tempHum as any).temperature);
    const humidity = formatNumber((tempHum as any).humidity);

    return (
        <DeviceCardContainer
            isFavourite={tempHum.is_favourite}
            name={tempHum.name}
            wifiStrength={tempHum.wifi_strength}
            isOnline={tempHum.is_online}
            id={tempHum.id}
        >
            <CardIconContainer>
                <InfoCard  className={styles.infoCardTimestamp}>{lastDate}</InfoCard>
                <InfoCard  className={styles.infoCardValue}>{temperature} °C</InfoCard>
                <InfoCard  className={styles.infoCardValue}>{humidity} %</InfoCard>
            </CardIconContainer>
            <StyledLink type="fancy" to={`/temperature/${tempHum.id}/`}>
                Wybierz
            </StyledLink>
        </DeviceCardContainer>
    );
}
