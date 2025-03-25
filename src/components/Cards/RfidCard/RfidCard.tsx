import { IRfid } from "../../../interfaces/IRfid";
import StyledLink from "../../../ui/StyledLink/StyledLink";
import DeviceCardContainer from "../../../ui/DeviceCardContainer/DeviceCardContainer";

export default function RfidCard(rfid: IRfid) {
  return (
    <DeviceCardContainer
      isFavourite={rfid.is_favourite}
      name={rfid.name}
      wifiStrength={rfid.wifi_strength}
      isOnline={rfid.is_online}
      id={rfid.id}
    >
      {rfid.controlled_lamp ? (
        <p>
          Podłączone do:
          <StyledLink to={`/lamp/${rfid.controlled_lamp.id}/`}>
            {` ${rfid.controlled_lamp.name}`}
          </StyledLink>
        </p>
      ) : (
        <p>Nieprszypisano do lampy</p>
      )}
      <p>Ilość kart: {rfid.cards.length}</p>
      <StyledLink type="button" to={`/rfid/${rfid.id}`}>
        Wybierz
      </StyledLink>
    </DeviceCardContainer>
  );
}
