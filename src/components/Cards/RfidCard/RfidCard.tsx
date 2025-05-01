import { IRfid } from "../../../interfaces/IRfid";
import StyledLink from "../../../ui/StyledLink/StyledLink";
import DeviceCardContainer from "../../../ui/DeviceCardContainer/DeviceCardContainer";
import DeviceEventDisplay from "../../DeviceEventDisplay/DeviceEventDisplay";
import styles from "./RfidCard.module.css";
export default function RfidCard(rfid: IRfid) {
  return (
    <DeviceCardContainer
      isFavourite={rfid.is_favourite}
      name={rfid.name}
      wifiStrength={rfid.wifi_strength}
      isOnline={rfid.is_online}
      id={rfid.id}
    >
      <div className={styles.eventsContainer}>
        {rfid.events?.map((event) => (
          <DeviceEventDisplay
            key={event.id}
            action={event.action}
            device={event.device}
            event={event.event}
          />
        ))}
      </div>
      <p>Ilość kart: {rfid.cards.length}</p>
      <StyledLink type="button" to={`/rfid/${rfid.id}`}>
        Wybierz
      </StyledLink>
    </DeviceCardContainer>
  );
}
