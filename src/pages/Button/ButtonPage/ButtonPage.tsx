import { useParams } from "react-router-dom";
import StyledLink from "../../../components/ui/StyledLink/StyledLink";
import useButtonQuery from "../../../hooks/queries/useButtonQuery";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import WifiStrength from "../../../components/ui/WiFiStrength/WiFiStrength.tsx";
import ButtonContainer from "../../../components/ui/containers/ButtonContainer/ButtonContainer.tsx";
import TilesContainer from "../../../components/ui/containers/TilesContainer/TilesContainer.tsx";
import DeviceEventDisplay from "../../../components/DeviceEventDisplay/DeviceEventDisplay.tsx";
import Tile from "../../../components/ui/Tile/Tile.tsx";
export default function ButtonPage() {
  const params = useParams();
  const id = parseInt(params.id ? params.id : "0");
  const { buttonData } = useButtonQuery(id);
  if (!buttonData) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
  return (
      <PageContainer>
        <PageHeader title={buttonData.name}>
          <ButtonContainer>
            <StyledLink type="fancy" to={`/button/${buttonData.id}/event/wizard/`}>
              Ustawienia zdarzeń
            </StyledLink>
            <StyledLink type="fancy" to={`/button/${buttonData.id}/settings/`}>
              Ustawienia urządzenia
            </StyledLink>
            <WifiStrength strength={buttonData.is_online?buttonData.wifi_strength:-100} size="large"/>
          </ButtonContainer>
        </PageHeader>
        <TilesContainer>
          {buttonData.events?.map((event) => (
              <Tile key={event.id}>
                <DeviceEventDisplay
                    key={event.id}
                    event={event}
                />
              </Tile>
          ))}
        </TilesContainer>
      </PageContainer>
  );
}
