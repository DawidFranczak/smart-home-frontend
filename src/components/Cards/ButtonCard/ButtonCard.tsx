import { IDevice } from "../../../interfaces/IDevice";
import DeviceCardContainer from "../../../ui/DeviceCardContainer/DeviceCardContainer";
import StyledLink from "../../../ui/StyledLink/StyledLink";
import DeviceEventDisplay from "../../DeviceEventDisplay/DeviceEventDisplay";

export default function ButtonCard(button: IDevice) {
  return (
    <DeviceCardContainer
      isFavourite={button.is_favourite}
      name={button.name}
      wifiStrength={button.wifi_strength}
      isOnline={button.is_online}
      id={button.id}
    >
      {button.events?.map((event) => (
        <DeviceEventDisplay
          key={event.id}
          action={event.action}
          device={event.device}
          event={event.event}
        />
      ))}
      <StyledLink type="button" to={`/button/${button.id}/`}>
        Wybierz
      </StyledLink>
    </DeviceCardContainer>
  );
}
