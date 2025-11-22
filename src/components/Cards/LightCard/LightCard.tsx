import ILight from "../../../interfaces/ILight.ts";
import {useTranslation} from "react-i18next";
import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer.tsx";
import CardIconContainer from "../../ui/containers/CardIconContainer/CardIconContainer.tsx";
import EventButton from "../../ui/Buttons/EventButton/EventButton.tsx";
import StyledLink from "../../ui/StyledLink/StyledLink.tsx";

export default function LightCard(light: ILight ) {
    const { t } = useTranslation();
    return (
        <DeviceCardContainer
            isFavourite={light.is_favourite}
            name={light.name}
            wifiStrength={light.wifi_strength}
            isOnline={light.is_online}
            id={light.id}
        >
            <CardIconContainer>
                {light.button_type === "BI" ? (
                    <EventButton id={light.id} events={light.events} type="on_toggle">
                        {t("events.button.toggle")}
                    </EventButton>
                ) : (
                    <>
                        <EventButton id={light.id} events={light.events} type="on_hold">
                            {t("events.button.hold")}
                        </EventButton>
                        <EventButton id={light.id} events={light.events} type="on_click">
                            {t("events.button.click")}
                        </EventButton>
                    </>
                )}
            </CardIconContainer>
            <StyledLink type="fancy" to={`/light/${light.id}/`}>
                {t("buttons.select")}
            </StyledLink>
        </DeviceCardContainer>
    )

}