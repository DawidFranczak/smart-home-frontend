import styles from "./DeviceContainer.module.css";
import Header from "../Header/Header";
import WifiStrength from "../WiFiStrength/WiFiStrength";
import BackArrow from "../BackArrow/BackArrow";
import ChangeName from "../../components/ChangeName/ChangeName";
import IEvent from "../../interfaces/IEvent";
import DeviceEventDisplay from "../../components/DeviceEventDisplay/DeviceEventDisplay";

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
  events,
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
      {events?.map((event) => (
        <DeviceEventDisplay
          key={event.id}
          action={event.action}
          device={event.device}
          event={event.event}
        />
      ))}
      {children}
    </div>
  );
}
