import {useParams} from "react-router-dom";
import useDeviceQuery from "../../hooks/queries/device/useDeviceQuery.tsx";
import ILight from "../../interfaces/ILight.ts";
import LoadingAnimation from "../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../components/ui/containers/PageContainer/PageContainer.tsx";
import styles from "../Button/ButtonPage/ButtonPage.module.css";
import PageHeader from "../../components/ui/Headers/PageHeader/PageHeader.tsx";
import DeviceActionPanel from "../../components/DeviceActionPanel/DeviceActionPanel.tsx";
import ChangeButtonTypeForm from "../../components/ChangeButtonTypeForm/ChangeButtonTypeForm.tsx";
import DeviceEventSection from "../../components/DeviceEventSection/DeviceEventSection.tsx";
import {useTranslation} from "react-i18next";
export default function LightPage() {
    const {t} = useTranslation()
    const params = useParams()
    const id = parseInt(params.id ?? "0");
    const { device } = useDeviceQuery(id);
    const lightData = device as ILight;

    if (!lightData) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
    return (
        <PageContainer className={styles.container}>
            <PageHeader title={lightData.name}>
                <DeviceActionPanel
                    buttons={[
                        { label: t("buttons.deviceEvent"), to: `/light/${lightData.id}/event/wizard/`, type: "primary", tooltip: t("buttons.deviceEventTooltip") },
                        { label: t("buttons.deviceSettings"), to: `/light/${lightData.id}/settings/`, type: "default", tooltip: t("buttons.deviceSettingsTooltip") }
                    ]}
                    wifiStrength={lightData.is_online ? lightData.wifi_strength : -100}
                    showWifi={true}
                />
            </PageHeader>
            <ChangeButtonTypeForm id={lightData.id} current_type={lightData.button_type} />
            <DeviceEventSection events={lightData.events} description={t("buttonPage.automaticEventsDescription")}/>
        </PageContainer>
    );
}