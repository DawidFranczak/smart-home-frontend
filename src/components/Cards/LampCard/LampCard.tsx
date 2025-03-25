import styles from "./LampCard.module.css";
import DeviceCardContainer from "../../../ui/DeviceCardContainer/DeviceCardContainer";
import StyledLink from "../../../ui/StyledLink/StyledLink";
import { ILamp } from "../../../interfaces/ILamp";

function formatDate(date: string): string {
  return date.slice(0, 5);
}

export default function LampCard(lamp: ILamp) {
  return (
    <DeviceCardContainer
      isFavourite={lamp.is_favourite}
      name={lamp.name}
      wifiStrength={lamp.brightness}
      isOnline={lamp.is_online}
      id={lamp.id}
    >
      <span>
        Jasność: <strong>{lamp.brightness}%</strong>
      </span>
      <span>
        Czas świecenia: <strong>{lamp.lighting_time}s</strong>
      </span>
      <span className={styles.time}>
        <p className={styles.p}>Czas świecenia:</p>
        <strong>
          {formatDate(lamp.light_start)} - {formatDate(lamp.light_stop)}
        </strong>
      </span>
      <StyledLink type="button" to={`/lamp/${lamp.id}/`}>
        Wybierz
      </StyledLink>
    </DeviceCardContainer>
  );
}
