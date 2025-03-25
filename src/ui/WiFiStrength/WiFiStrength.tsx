import wifi_perfect from "/static/svg/wifi_perfect.svg";
import wifi_medium from "/static/svg/wifi_medium.svg";
import wifi_low from "/static/svg/wifi_low.svg";
import wifi_no from "/static/svg/wifi_no.svg";

interface WifiStrengthProps {
  strength: number;
  className: string;
}

const getWifiIcons = (strength: number) => {
  if (strength <= -80) return wifi_no;
  if (strength <= -60) return wifi_low;
  if (strength <= -50) return wifi_medium;
  return wifi_perfect;
};

export default function WifiStrength({
  strength,
  className,
}: WifiStrengthProps) {
  const wifiIcons = getWifiIcons(strength);
  return (
    <>
      <img
        src={wifiIcons}
        alt="Wifi"
        width="24"
        height="24"
        className={className}
      />
    </>
  );
}
