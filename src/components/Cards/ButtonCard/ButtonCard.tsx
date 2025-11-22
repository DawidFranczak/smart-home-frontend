import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer";
import StyledLink from "../../ui/StyledLink/StyledLink";
import CardIconContainer from "../../ui/containers/CardIconContainer/CardIconContainer.tsx";
import EventButton from "../../ui/Buttons/EventButton/EventButton.tsx";
import IButton from "../../../interfaces/IButton.tsx";
import { useTranslation } from "react-i18next";

export default function ButtonCard(button: IButton) {
  const { t } = useTranslation();
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
                <EventButton id={button.id} events={button.events} type="on_toggle">
                    {t("events.button.toggle")}
                </EventButton>
            ) : (
                <>
                    <EventButton id={button.id} events={button.events} type="on_hold">
                        {t("events.button.hold")}
                    </EventButton>
                    <EventButton id={button.id} events={button.events} type="on_click">
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
