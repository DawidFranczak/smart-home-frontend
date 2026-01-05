import { IRfid } from "../../../interfaces/IRfid";
import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer";
import EventButton from "../../ui/Buttons/EventButton/EventButton.tsx";
import {useTranslation} from "react-i18next";
import doorFront from "../../../../public/static/svg/doorFront.svg"
import styles from "./RfidCard.module.css"
export default function RfidCard(rfid: IRfid) {
  const {t} = useTranslation();
  return (
    <DeviceCardContainer
      name={rfid.name}
      isOnline={rfid.is_online}
      to={`/rfid/${rfid.id}`}
      svg={doorFront}
      alt={rfid.name}
    >
      <EventButton id={rfid.id} buttonType={rfid.button_type} events={rfid.events}/>
      <p className={styles.cardAmount}>{t("rfidCard.cardAmount")}: <strong>{rfid.cards.length}</strong></p>
    </DeviceCardContainer>
  );
}
