import { useParams } from "react-router-dom";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import DeviceEventDisplay from "../../../components/DeviceEventDisplay/DeviceEventDisplay.tsx";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery.tsx";
import IButton from "../../../interfaces/IButton.tsx";
import {FlexboxGrid} from "rsuite";
import styles from "./ButtonPage.module.css";
import DeviceActionPanel from "../../../components/DeviceActionPanel/DeviceActionPanel.tsx";


export default function ButtonPage() {
  const params = useParams();
  const id = parseInt(params.id ? params.id : "0");
  const { device } = useDeviceQuery(id);
  const buttonData = device as IButton;

  if (!buttonData) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
  return (
      <PageContainer>
        <PageHeader title={buttonData.name}>
          <DeviceActionPanel
              buttons={[
                  { label: "Ustawienia zdarzeń", to: `/button/${buttonData.id}/event/wizard/`, type: "primary", tooltip: "Skonfiguruj zdarzenia dla tego przycisku" },
                  { label: "Ustawienia urządzenia", to: `/button/${buttonData.id}/settings/`, type: "default", tooltip: "Zmień ustawienia przycisku" }
              ]}
              wifiStrength={buttonData.is_online ? buttonData.wifi_strength : -100}
              showWifi={true}
          />
        </PageHeader>
          <FlexboxGrid justify="center" align="middle" className={styles.eventContainer}>
              {buttonData.events?.map((event,idx) => (
                  <FlexboxGrid.Item key={`BP_${idx}`}>
                        <DeviceEventDisplay
                            key={event.id}
                            event={event}
                        />
                  </FlexboxGrid.Item>
              ))}
          </FlexboxGrid>
      </PageContainer>
  );
}
