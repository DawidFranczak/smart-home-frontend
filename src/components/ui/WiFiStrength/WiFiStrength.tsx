import styles from "./WifiStrength.module.css";
import wifi_perfect from "/static/svg/wifi_perfect.svg";
import wifi_medium from "/static/svg/wifi_medium.svg";
import wifi_low from "/static/svg/wifi_low.svg";
import wifi_no from "/static/svg/wifi_no.svg";

interface WifiStrengthProps {
  strength: number;
  size?: "small" | "medium" | "large";
  className?: string;
}

const getWifiIcons = (strength: number) => {
  if (strength <= -80) return wifi_no;
  if (strength <= -60) return wifi_low;
  if (strength <= -50) return wifi_medium;
  return wifi_perfect;
};

const getSignalClass = (strength: number) => {
  if (strength <= -80) return styles.offline;
  if (strength <= -60) return styles.weak;
  return "";
};

export default function WifiStrength({
                                       strength,
                                       size = "medium",
                                       className,
                                     }: WifiStrengthProps) {

  const wifiIcons = getWifiIcons(strength);
  const signalClass = getSignalClass(strength);

  return (
      <img
          src={wifiIcons}
          alt="Wifi"
          className={`${styles.icon} ${styles[size]} ${signalClass} ${className || ""}`}
      />
  );
}