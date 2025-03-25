import style from "./CardCard.module.css";
import deleteSvg from "/static/svg/delete.svg";
import { ICard } from "../../../interfaces/IRfid";
import Header from "../../../ui/Header/Header";
import formatDate from "../../../utils/formatDate";
import { useState } from "react";
import ConfirmDelete from "../../ConfirmDelete/ConfirmDelete";
import useCardMutation from "../../../hooks/queries/useCardMutation";
interface CardCardProps {
  card: ICard;
}

export default function CardCard({ card }: CardCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { mutationDelete } = useCardMutation();
  const mutation = mutationDelete(card.id, card.rfid);
  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div className={style.card}>
      <div className={style.header}>
        <Header className={style.headerName}>{card.name}</Header>
        <img
          src={deleteSvg}
          width={24}
          height={24}
          className={style.delete}
          onClick={() => setConfirmDelete(true)}
        />
      </div>
      <div className={style.lastUsed}>
        Ostatnie użycie:<p>{formatDate(card.last_used)}</p>
      </div>
      {confirmDelete && (
        <ConfirmDelete
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
}
