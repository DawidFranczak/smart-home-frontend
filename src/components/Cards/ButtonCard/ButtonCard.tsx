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
        <EventButton id={button.id} buttonType={button.button_type} events={button.events}/>
        <StyledLink type="fancy" to={`/button/${button.id}/`}>
            {t("buttons.select")}
        </StyledLink>
    </DeviceCardContainer>
  );
}
