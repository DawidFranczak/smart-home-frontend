import { useParams } from "react-router-dom";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery.tsx";
import IButton from "../../../interfaces/IButton.tsx";
import DeviceActionPanel from "../../../components/DeviceActionPanel/DeviceActionPanel.tsx";
import DeviceEventSection from "../../../components/DeviceEventSection/DeviceEventSection.tsx";
import styles from "./ButtonPage.module.css";
import ChangeButtonTypeForm from "../../../components/ChangeButtonTypeForm/ChangeButtonTypeForm.tsx";
import {useTranslation} from "react-i18next";

export default function ButtonPage() {
  const params = useParams();
  const id = parseInt(params.id ? params.id : "0");
  const { device } = useDeviceQuery(id);
  const buttonData = device as IButton;
    const {t} = useTranslation();

  if (!buttonData) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
  return (
      <PageContainer className={styles.container}>
        <PageHeader title={buttonData.name}>
          <DeviceActionPanel
              buttons={[
                  { label: t("buttons.deviceEvent"), to: `/button/${buttonData.id}/event/wizard/`, type: "primary", tooltip: t("buttons.deviceEventTooltip") },
                  { label: t("buttons.deviceSettings"), to: `/button/${buttonData.id}/settings/`, type: "default", tooltip: t("buttons.deviceSettingsTooltip") }
              ]}
              wifiStrength={buttonData.is_online ? buttonData.wifi_strength : -100}
              showWifi={true}
          />
        </PageHeader>
          <ChangeButtonTypeForm id={buttonData.id} current_type={buttonData.button_type} />
          <DeviceEventSection events={buttonData.events} description={t("buttonPage.automaticEventsDescription")}/>
      </PageContainer>
  );
}
