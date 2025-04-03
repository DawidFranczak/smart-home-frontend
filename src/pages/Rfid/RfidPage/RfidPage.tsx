import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICard } from "../../../interfaces/IRfid";
import useRfidQuery from "../../../hooks/queries/useRfidQuery";
import CardCard from "../../../components/Cards/CardCard/CardCard";
import styles from "./RfidPage.module.css";
import Button from "../../../ui/Button/Button";
import AddCardForm from "../../../components/AddCardForm/AddCardForm";
import QueryInput from "../../../ui/QueryInput/QueryInput";
import DeviceContainer from "../../../ui/DeviceContainer/DeviceContainer";
import Message from "../../../ui/Message/Message";
import DeviceEvent from "../../../components/DeviceEvent/DeviceEvent";
import StyledLink from "../../../ui/StyledLink/StyledLink";

export default function RfidPage() {
  const [cards, setCards] = useState<ICard[]>([]);
  const params = useParams();
  const id = params.id ? parseInt(params.id) : 0;
  const { rfidData, status } = useRfidQuery(id);
  const [addCardForm, setAddCardForm] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (rfidData) setCards(rfidData.cards);
  }, [rfidData]);

  function handleAddCard(status: string) {
    setAddCardForm(false);
    if (status === "success") {
      setIsPending(true);
      setTimeout(() => {
        setIsPending(false);
      }, 20000);
    }
  }

  if (!rfidData) return null;
  function handleFilterCards(value: string) {
    const filter = value.toLowerCase();
    const filteredCards = rfidData.cards.filter((card) => {
      return card.name.toLowerCase().includes(filter);
    });
    setCards(filteredCards);
  }
  const errorMessage =
    status === 400 ? "Nie udało się dodać karty" : "Karta jest już dodana";
  console.log(rfidData);
  return (
    <DeviceContainer
      name={rfidData.name}
      wifi_strength={rfidData.wifi_strength}
      is_online={rfidData.is_online}
      id={rfidData.id}
      className={styles.container}
    >
      {rfidData.events?.map((event) => (
        <DeviceEvent
          key={event.id}
          action={event.action}
          device={event.device}
          event={event.event}
        />
      ))}
      <StyledLink type="button" to={`/rfid/${rfidData.id}/event/wizard/`}>
        Ustawienia zdarzenia
      </StyledLink>
      <div className={styles.div}>
        <Button
          callback={() => {
            setAddCardForm(true);
          }}
        >
          Dodaj Karte
        </Button>
        <QueryInput onChange={handleFilterCards} />
      </div>

      {addCardForm && (
        <AddCardForm handleAddFunction={handleAddCard} rfidID={rfidData.id} />
      )}
      <div className={styles.cards}>
        {rfidData.pending.includes("add_tag") && (
          <p>Prosze przyłożyć kartę do czytnika.</p>
        )}

        {status && status >= 400 && (
          <Message type="error">{errorMessage}</Message>
        )}

        {cards.map((card) => (
          <CardCard key={card.id} card={card} />
        ))}
      </div>
    </DeviceContainer>
  );
}
