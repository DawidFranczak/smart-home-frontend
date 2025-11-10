import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer";
import StyledLink from "../../ui/StyledLink/StyledLink";
import CardIconContainer from "../../ui/containers/CardIconContainer/CardIconContainer.tsx";
import EventButton from "../../ui/Buttons/EventButton/EventButton.tsx";
import IButton from "../../../interfaces/IButton.tsx";

export default function ButtonCard(button: IButton) {

  function handleHold() {
    console.log("hold");
  }
  function handleClick() {
    console.log("click");
  }
  function handleToggle() {
    console.log("toggle");
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
          {button.button_type === "BI"?
              <EventButton onClick={handleToggle} type="toggle">TOGGLE</EventButton> :
              <>
              <EventButton onClick={handleHold} type="hold">HOLD</EventButton>
              <EventButton onClick={handleClick} type="click">CLICK</EventButton>
              </>
          }
      </CardIconContainer>
      <StyledLink type="fancy" to={`/button/${button.id}/`}>
        Wybierz
      </StyledLink>
    </DeviceCardContainer>
  );
}
