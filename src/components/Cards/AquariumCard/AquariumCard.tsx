import { IAquarium } from "../../../interfaces/IAquarium";
import StatusIndicator from "../../../ui/StatusIndicator/StatusIndicator";
import formatAquariumDate from "../../../utils/formatAquariumDate";
import StyledLink from "../../../ui/StyledLink/StyledLink";
import DeviceCardContainer from "../../../ui/DeviceCardContainer/DeviceCardContainer";

export default function AquariumCard(aquarium: IAquarium) {
  return (
    <DeviceCardContainer
      isFavourite={aquarium.is_favourite}
      isOnline={aquarium.is_online}
      wifiStrength={aquarium.wifi_strength}
      name={aquarium.name}
      id={aquarium.id}
    >
      <div>
        <StatusIndicator
          color={`rgb(${aquarium.color_r},${aquarium.color_g},${aquarium.color_b})`}
        >
          Kolor ledów
        </StatusIndicator>
        <StatusIndicator color={aquarium.led_mode ? "green" : "red"}>
          Ledy
        </StatusIndicator>
        <StatusIndicator color={aquarium.fluo_mode ? "green" : "red"}>
          Świetlówka
        </StatusIndicator>
      </div>
      <span>{aquarium.mode ? "Automat" : "Manual"}</span>
      {aquarium.mode && (
        <>
          <span>
            Ledy {formatAquariumDate(aquarium.led_start)} -
            {formatAquariumDate(aquarium.led_stop)}
          </span>
          <span>
            Świetlówka {formatAquariumDate(aquarium.fluo_start)} -
            {formatAquariumDate(aquarium.fluo_stop)}
          </span>
        </>
      )}
      <StyledLink type="button" to={`/aquarium/${aquarium.id}/`}>
        Wybierz
      </StyledLink>
    </DeviceCardContainer>
  );
}
