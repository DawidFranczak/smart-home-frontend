import { useState } from "react";
import styles from "./DeviceCardContainer.module.css";
import FavouriteStar from "../../../FavouriteStar/FavouriteStar.tsx";
import Header from "../../Headers/Header/Header.tsx";
import WifiStrength from "../../WiFiStrength/WiFiStrength.tsx";

interface IDeviceCardContainerProps {
  isFavourite: boolean;
  name: string;
  wifiStrength: number;
  isOnline: boolean;
  id: number;
  children?: React.ReactNode;
}

export default function DeviceCardContainer({
  isFavourite,
  name,
  wifiStrength,
  isOnline,
  id,
  children,
}: IDeviceCardContainerProps) {
  const [isFavouriteState, setIsFavouriteState] = useState(isFavourite);

  return (
    <div className={styles.card}>
      <Header>{name}</Header>
      <FavouriteStar
        isFavourite={isFavouriteState}
        onClick={() =>
          setIsFavouriteState((isFavouriteState) => !isFavouriteState)
        }
        className={styles.star}
        id={id}
        type="device"
      />
      <WifiStrength
        strength={isOnline ? wifiStrength : -100}
        className={styles.wifi}
      />
      {children}
    </div>
  );
}
