import styles from "./LampCard.module.css";
import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer";
import StyledLink from "../../ui/StyledLink/StyledLink";
import { ILamp } from "../../../interfaces/ILamp";
import InfoCard from "../../ui/InfoCard/InfoCard.tsx";
import CardIconContainer from "../../ui/containers/CardIconContainer/CardIconContainer.tsx";
import TimeRange from "../../ui/TimeRange/TimeRange.tsx";

export default function LampCard(lamp: ILamp) {
  return (
      <DeviceCardContainer
          isFavourite={lamp.is_favourite}
          name={lamp.name}
          wifiStrength={lamp.brightness}
          isOnline={lamp.is_online}
          id={lamp.id}
      >
        <CardIconContainer>
          <InfoCard icon="💡" >{lamp.brightness}%</InfoCard>
          <InfoCard icon="⏱️" >{lamp.lighting_time} s</InfoCard>
          <InfoCard icon="📅"  className={styles.scheduleCard}>
            <TimeRange start={lamp.light_start} end={lamp.light_stop} />
          </InfoCard>
        </CardIconContainer>
        <StyledLink type="fancy" to={`/lamp/${lamp.id}/`}>
          Szczegóły
        </StyledLink>
      </DeviceCardContainer>
  );
}