import { IAquarium } from "../../../interfaces/IAquarium";
import StatusIndicator from "../../ui/StatusIndicator/StatusIndicator";
import StyledLink from "../../ui/StyledLink/StyledLink";
import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer";
import InfoCard from "../../ui/InfoCard/InfoCard";
import CardIconContainer from "../../ui/containers/CardIconContainer/CardIconContainer.tsx";
import TimeRange from "../../ui/TimeRange/TimeRange.tsx";
import {useTranslation} from "react-i18next";

export default function AquariumCard(aquarium: IAquarium) {
  const {t } = useTranslation();
    return (
      <DeviceCardContainer
          isFavourite={aquarium.is_favourite}
          isOnline={aquarium.is_online}
          wifiStrength={aquarium.wifi_strength}
          name={aquarium.name}
          id={aquarium.id}
      >
          {aquarium.mode ||(
            <CardIconContainer>
              <InfoCard icon="💡">
                {aquarium.led_mode ? "ON" : "OFF"}
              </InfoCard>
              <InfoCard icon="🔆">
                {aquarium.fluo_mode ? "ON" : "OFF"}
              </InfoCard>
              <InfoCard icon="🎨">
                <StatusIndicator
                    color={`rgb(${aquarium.color_r},${aquarium.color_g},${aquarium.color_b})`}
                />
              </InfoCard>
              <InfoCard icon="⚙️">
                {aquarium.mode ? "Automat" : "Manual"}
              </InfoCard>
          </CardIconContainer>
          )}
          {aquarium.mode && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                <InfoCard icon="💡">
                  <TimeRange start={aquarium.led_start} end={aquarium.led_stop}/>
                </InfoCard>
                <InfoCard icon="🔆">
                  <TimeRange start={aquarium.fluo_start} end={aquarium.fluo_stop}/>
                </InfoCard>
              </div>
          )}
        <StyledLink type="fancy" to={`/aquarium/${aquarium.id}/`}>
            {t("buttons.select")}
        </StyledLink>
      </DeviceCardContainer>
  );
}