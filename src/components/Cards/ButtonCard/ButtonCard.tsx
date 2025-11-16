import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer";
import StyledLink from "../../ui/StyledLink/StyledLink";
import CardIconContainer from "../../ui/containers/CardIconContainer/CardIconContainer.tsx";
import EventButton from "../../ui/Buttons/EventButton/EventButton.tsx";
import IButton from "../../../interfaces/IButton.tsx";
import { useTranslation } from "react-i18next";

export default function ButtonCard(button: IButton) {
  const { t } = useTranslation();
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
            {button.button_type === "BI" ? (
                <EventButton onClick={handleToggle} type="toggle">
                    {t("events.button.toggle")}
                </EventButton>
            ) : (
                <>
                    <EventButton onClick={handleHold} type="hold">
                        {t("events.button.hold")}
                    </EventButton>
                    <EventButton onClick={handleClick} type="click">
                        {t("events.button.click")}
                    </EventButton>
                </>
            )}
        </CardIconContainer>
        <StyledLink type="fancy" to={`/button/${button.id}/`}>
            {t("buttons.select")}
        </StyledLink>
    </DeviceCardContainer>
  );
}
