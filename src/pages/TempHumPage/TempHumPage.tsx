import { useParams } from "react-router-dom";
import {SyntheticEvent, useState} from "react";

import useTempHumHistoryQuery from "../../hooks/queries/useTempHumHistoryQuery.tsx";

import LoadingAnimation from "../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../components/ui/Headers/PageHeader/PageHeader.tsx";
import DeviceActionPanel from "../../components/DeviceActionPanel/DeviceActionPanel.tsx";

import formatDate from "../../utils/formatDate.tsx";
import {DateRange} from "rsuite/DateRangePicker";
import DeviceEventSection from "../../components/DeviceEventSection/DeviceEventSection.tsx";
import AggregationData from "../../components/Temperature/AggregationData/AggregationData.tsx";
import TemperatureChart from "../../components/Temperature/TemperatureChart/TemperatureChart.tsx";
import SettingsPanel from "../../components/Temperature/SettingsPanel/SettingsPanel.tsx";
import useDeviceQuery from "../../hooks/queries/device/useDeviceQuery.tsx";
import ITemperatureHumidity from "../../interfaces/ITemperatureHumidity.tsx";

export default function TempHumPage() {
    const sensor_id: number = parseInt(useParams().id as string);
    const { device } = useDeviceQuery(sensor_id);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const { tempHumHistoryData } = useTempHumHistoryQuery(sensor_id, startDate, endDate);
    const tempHum = device as ITemperatureHumidity;

    function handleDateChange(value: DateRange | null, _: SyntheticEvent) {
        if (!value) return;
        setStartDate(formatDate(value[0] as Date, "YYYY-MM-DD"));
        setEndDate(formatDate(value[1] as Date, "YYYY-MM-DD"));
    }
    if (!tempHum) return <LoadingAnimation size="xlarge" type="spinner" glow={true} />;
    console.log(tempHum)
    return (
        <PageContainer>
            <PageHeader title={tempHum.name}>
                <DeviceActionPanel
                    buttons={[
                        { label: "Ustawienia urządzenia", to: `/temperature/${tempHum.id}/settings/`, type: "default", tooltip: "Zmień ustawienia przycisku" },
                        { label: "Ustawienia zdarzeń", to: `/${tempHum.fun}/${tempHum.id}/event/wizard/`, type: "primary", tooltip: "Skonfiguruj zdarzenia dla tego urządzenia" },
                    ]}
                    wifiStrength={tempHum.is_online ? tempHum.wifi_strength : -100}
                    showWifi={true}
                />
            </PageHeader>
            <TemperatureChart onDataChange={handleDateChange} temperatureData={tempHumHistoryData?.temperature.chart_data} humidityData={tempHumHistoryData?.humidity.chart_data}/>
            <AggregationData temperature={tempHumHistoryData?.temperature.aggregation_data} humidity={tempHumHistoryData?.humidity.aggregation_data}/>
            <DeviceEventSection events={tempHum.events} description="Zdarzenia automatyczne wyzwalane przez czujnik"/>
            <SettingsPanel
                id={tempHum.id}
                humidityHysteresis={tempHum?.humidity_hysteresis}
                temperatureHysteresis={tempHum?.temperature_hysteresis}
                triggerHumDown={tempHum?.trigger_hum_down}
                triggerHumUp={tempHum?.trigger_hum_up}
                triggerTempDown={tempHum?.trigger_temp_down}
                triggerTempUp={tempHum?.trigger_temp_up}
            />
        </PageContainer>
    );
}
