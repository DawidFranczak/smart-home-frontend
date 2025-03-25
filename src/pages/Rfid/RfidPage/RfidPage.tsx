import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICard } from "../../../interfaces/IRfid";
import useRfidQuery from "../../../hooks/queries/useRfidQuery";
import CardCard from "../../../components/Cards/CardCard/CardCard";
import styles from "./RfidPage.module.css";
import Button from "../../../ui/Button/Button";
import AddCardForm from "../../../components/AddCardForm/AddCardForm";
import QueryInput from "../../../ui/QueryInput/QueryInput";
import StyledLink from "../../../ui/StyledLink/StyledLink";
import DeviceContainer from "../../../ui/DeviceContainer/DeviceContainer";

export default function RfidPage() {
  const [cards, setCards] = useState<ICard[]>([]);
  const params = useParams();
  const id = params.id ? parseInt(params.id) : 0;
  const { rfidData } = useRfidQuery(id);
  const [addCardForm, setAddCardForm] = useState(false);

  useEffect(() => {
    if (rfidData) setCards(rfidData.cards);
  }, [rfidData]);

  if (!rfidData) return null;
  function handleFilterCards(value: string) {
    const filter = value.toLowerCase();
    const filteredCards = rfidData.cards.filter((card) => {
      return card.name.toLowerCase().includes(filter);
    });
    setCards(filteredCards);
  }
  return (
    <DeviceContainer
      name={rfidData.name}
      wifi_strength={rfidData.wifi_strength}
      is_online={rfidData.is_online}
    >
      <span>
        Podłączone lampy:
        <StyledLink to={`/lamp/${rfidData.controlled_lamp.id}/`}>
          <strong>{` ${rfidData.controlled_lamp.name}`}</strong>
        </StyledLink>
      </span>
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
        <AddCardForm
          closeFn={() => setAddCardForm(false)}
          rfidID={rfidData.id}
        />
      )}
      <div className={styles.cards}>
        {cards.map((card) => (
          <CardCard key={card.id} card={card} />
        ))}
      </div>
    </DeviceContainer>
  );
}
