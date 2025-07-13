import { IDevice } from "../../../interfaces/IDevice";
import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer";
import StyledLink from "../../ui/StyledLink/StyledLink";
import CardIconContainer from "../../ui/containers/CardIconContainer/CardIconContainer.tsx";
import EventButton from "../../ui/Buttons/EventButton/EventButton.tsx";

export default function ButtonCard(button: IDevice) {

  function handleHold() {
    console.log("hold");
  }
  function handleClick() {
    console.log("click");
  }
  return (
    <DeviceCardContainer
      isFavourite={button.is_favourite}
      name={button.name}
      wifiStrength={button.wifi_strength}
      isOnline={button.is_online}
      id={button.id}
    >
      <CardIconContainer>
        <EventButton onClick={handleHold} type="hold">HOLD</EventButton>
        <EventButton onClick={handleClick} type="click">CLICK</EventButton>
      </CardIconContainer>
      <StyledLink type="fancy" to={`/button/${button.id}/`}>
        Wybierz
      </StyledLink>
    </DeviceCardContainer>
  );
}
