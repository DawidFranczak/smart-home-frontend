import styles from "./DeviceContainer.module.css";
import Header from "../Header/Header";
import WifiStrength from "../WiFiStrength/WiFiStrength";
import BackArrow from "../BackArrow/BackArrow";
import ChangeName from "../../components/ChangeName/ChangeName";

interface DeviceContainerProps {
  name: string;
  wifi_strength: number;
  is_online: boolean;
  children: React.ReactNode;
  id: number;
  className?: string;
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
  );
}
