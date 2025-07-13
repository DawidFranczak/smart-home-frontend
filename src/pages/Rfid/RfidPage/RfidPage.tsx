import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICard } from "../../../interfaces/IRfid";
import useRfidQuery from "../../../hooks/queries/useRfidQuery";
import CardCard from "../../../components/Cards/CardCard/CardCard";
import QueryInput from "../../../components/ui/QueryInput/QueryInput";
import StyledLink from "../../../components/ui/StyledLink/StyledLink";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import WifiStrength from "../../../components/ui/WiFiStrength/WiFiStrength.tsx";
import ButtonContainer from "../../../components/ui/containers/ButtonContainer/ButtonContainer.tsx";
import TilesContainer from "../../../components/ui/containers/TilesContainer/TilesContainer.tsx";
import Tile from "../../../components/ui/Tile/Tile.tsx";
import DeviceEventDisplay from "../../../components/DeviceEventDisplay/DeviceEventDisplay.tsx";
import IEvent from "../../../interfaces/IEvent.tsx";
import Button from "../../../components/ui/Buttons/Button/Button.tsx";
import AddCardForm from "../../../components/AddCardForm/AddCardForm.tsx";

export default function RfidPage() {
  const [cards, setCards] = useState<ICard[]>([]);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const params = useParams();
  const id = params.id ? parseInt(params.id) : 0;
  const { rfidData } = useRfidQuery(id);

  useEffect(() => {
    if (rfidData) setCards(rfidData.cards);
  }, [rfidData]);

  if (!rfidData) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;

  function handleFilterCards(value: string) {
    const filter = value.toLowerCase();
    const filteredCards = rfidData.cards.filter((card) => {
      return card.name.toLowerCase().includes(filter);
    });
    setCards(filteredCards);
  }

  return (
      <PageContainer>
        <PageHeader title={rfidData.name}>
          <ButtonContainer>
            <QueryInput onChange={handleFilterCards} />
            <StyledLink type="fancy" to={`/rfid/${rfidData.id}/event/wizard/`}>
              Dodaj zadarzenie
            </StyledLink>
            <Button type="fancy" onClick={() => {setShowAddCardForm(true)}}>
              Dodaj karte
            </Button>
            <StyledLink type="fancy" to={`/rfid/${rfidData.id}/settings/`}>
              Ustawienia urządzenia
            </StyledLink>
            <WifiStrength strength={rfidData.is_online?rfidData.wifi_strength:-100} size="large"/>
          </ButtonContainer>
        </PageHeader>
        <AddCardForm
            show={showAddCardForm}
            pending={rfidData.pending.includes("add_tag")}
            rfidID={rfidData.id}
            handleAddFunction={() =>setShowAddCardForm(false)}
        />
        <TilesContainer>
          {rfidData.events?.map((event:IEvent) => (
              <Tile key={event.id}>
                <DeviceEventDisplay
                    key={`event-${event.id}`}
                    event={event}
                />
              </Tile>
          ))}
        </TilesContainer>
        <hr/>
        <TilesContainer>
          {cards?.map((card) => (
              <Tile key={card.id}>
                <CardCard key={card.id} card={card} />
              </Tile>
          ))}
        </TilesContainer>
      </PageContainer>
  );
}
