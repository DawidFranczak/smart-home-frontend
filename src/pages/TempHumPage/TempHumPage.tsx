import { useParams } from "react-router-dom";
import {SyntheticEvent, useState} from "react";

import useTemperatureHistoryQuery from "../../hooks/queries/useTemperatureHistoryQuery.tsx";

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
import {useTranslation} from "react-i18next";
import useHumidityHistoryQuery from "../../hooks/queries/useHumidityHistoryQuery.tsx";

export default function TempHumPage() {
    const {t} = useTranslation();
    const sensor_id: number = parseInt(useParams().id as string);
    const { device } = useDeviceQuery(sensor_id);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const { tempHistoryData } = useTemperatureHistoryQuery(sensor_id, startDate, endDate);
    const { humHistoryData } = useHumidityHistoryQuery(sensor_id, startDate, endDate);
    const tempHum = device as ITemperatureHumidity;

    function handleDateChange(value: DateRange | null, _: SyntheticEvent) {
        if (!value) return;
        setStartDate(formatDate(value[0] as Date, "YYYY-MM-DD"));
        setEndDate(formatDate(value[1] as Date, "YYYY-MM-DD"));
    }
    if (!tempHum) return <LoadingAnimation size="xlarge" type="spinner" glow={true} />;
    return (
        <PageContainer>
            <PageHeader title={tempHum.name}>
                <DeviceActionPanel
                    buttons={[
                        { label: t("buttons.deviceSettings"), to: `/temperature/${tempHum.id}/settings/`, type: "default", tooltip: t("buttons.deviceSettingsTooltip") },
                        { label: t("buttons.deviceEvent"), to: `/${tempHum.fun}/${tempHum.id}/event/wizard/`, type: "primary", tooltip: t("buttons.deviceEventTooltip") },
                    ]}
                    wifiStrength={tempHum.is_online ? tempHum.wifi_strength : -100}
                    showWifi={true}
                />
            </PageHeader>
            <TemperatureChart onDataChange={handleDateChange} temperatureData={tempHistoryData?.chart_data} humidityData={humHistoryData?.chart_data}/>
            <AggregationData temperature={tempHistoryData?.aggregation_data} humidity={humHistoryData?.aggregation_data}/>
            <DeviceEventSection events={tempHum.events} description={t("tempHumPage.eventsDescription")}/>
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
