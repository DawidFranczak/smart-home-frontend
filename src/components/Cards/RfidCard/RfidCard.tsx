import { IRfid } from "../../../interfaces/IRfid";
import StyledLink from "../../ui/StyledLink/StyledLink";
import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer";
import CardIconContainer from "../../ui/containers/CardIconContainer/CardIconContainer.tsx";
import EventButton from "../../ui/Buttons/EventButton/EventButton.tsx";
export default function RfidCard(rfid: IRfid) {
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
        <EventButton onClick={handleHold} type="hold">HOLD</EventButton>
        <EventButton onClick={handleClick} type="click">CLICK</EventButton>
      </CardIconContainer>
      <StyledLink type="fancy" to={`/rfid/${rfid.id}`}>
        Wybierz
      </StyledLink>
    </DeviceCardContainer>
  );
}
