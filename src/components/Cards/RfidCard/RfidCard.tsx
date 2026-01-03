import { IRfid } from "../../../interfaces/IRfid";
import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer";
import EventButton from "../../ui/Buttons/EventButton/EventButton.tsx";
import {useTranslation} from "react-i18next";
export default function RfidCard(rfid: IRfid) {
  const {t} = useTranslation();
  return (
    <DeviceCardContainer
      name={rfid.name}
      isOnline={rfid.is_online}
      to={`/rfid/${rfid.id}`}
    >
      <EventButton id={rfid.id} buttonType={rfid.button_type} events={rfid.events}/>
      <p>{t("rfidCard.cardAmount")} <strong>{rfid.cards.length}</strong></p>
    </DeviceCardContainer>
  );
}
