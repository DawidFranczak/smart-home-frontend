import styles from "./DeviceContainer.module.css";
import Header from "../../Headers/Header/Header.tsx";
import WifiStrength from "../../WiFiStrength/WiFiStrength.tsx";
import BackArrow from "../../BackArrow/BackArrow.tsx";
import ChangeName from "../../../ChangeName/ChangeName.tsx";
import IEvent from "../../../../interfaces/IEvent.tsx";
import CenterContainer from "../CenterContainer/CenterContainer.tsx";

interface DeviceContainerProps {
  name: string;
  wifi_strength: number;
  is_online: boolean;
  children: React.ReactNode;
  id: number;
  className?: string;
  events?: IEvent[];
}

export default function DeviceContainer({
  name,
  wifi_strength,
  is_online,
  children,
  className,
  id,
}: DeviceContainerProps) {
  return (
      <CenterContainer>
        <div className={`${styles.container} ${className}`}>
          <WifiStrength
            className={styles.wifiIcon}
            strength={is_online ? wifi_strength : -100}
          />
          <BackArrow className={styles.backArrow} />
          <ChangeName type="device" id={id}>
            <Header>{name}</Header>
          </ChangeName>

          {children}
        </div>
      </CenterContainer>
  );
}
