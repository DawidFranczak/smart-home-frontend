import { IRfid } from "../../../interfaces/IRfid";
import StyledLink from "../../ui/StyledLink/StyledLink";
import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer";
import CardIconContainer from "../../ui/containers/CardIconContainer/CardIconContainer.tsx";
import EventButton from "../../ui/Buttons/EventButton/EventButton.tsx";
import {useTranslation} from "react-i18next";

export default function RfidCard(rfid: IRfid) {
    const {t} = useTranslation();
    function handleHold() {
        console.log("hold");
    }
    function handleClick() {
        console.log("click");
    }
  return (
    <DeviceCardContainer
      isFavourite={rfid.is_favourite}
      name={rfid.name}
      wifiStrength={rfid.wifi_strength}
      isOnline={rfid.is_online}
      id={rfid.id}
    >
      <CardIconContainer>
        <EventButton onClick={handleHold} type="hold">{t("events.button.hold")}</EventButton>
        <EventButton onClick={handleClick} type="click">{t("events.button.click")}</EventButton>
      </CardIconContainer>
      <StyledLink type="fancy" to={`/rfid/${rfid.id}`}>
          {t("buttons.select")}
      </StyledLink>
    </DeviceCardContainer>
  );
}
