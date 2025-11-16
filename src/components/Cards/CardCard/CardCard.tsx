import { ICard } from "../../../interfaces/IRfid";
import { useState } from "react";
import ConfirmDelete from "../../ConfirmDelete/ConfirmDelete";
import useCardMutation from "../../../hooks/queries/useCardMutation";
import {Loader, Panel} from "rsuite";
import DeleteIcon from "/static/svg/delete.svg";
import styles from "./CardCard.module.css";
import formatDate from "../../../utils/formatDate.tsx";
import {useTranslation} from "react-i18next";

interface CardCardProps {
  card: ICard;
}

export default function CardCard({ card }: CardCardProps) {
    const {t} = useTranslation();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const {mutationDelete} = useCardMutation();
    const mutation = mutationDelete(card.id);

    return (
        <Panel shaded bordered className={styles.card}>
            <div className={styles.header}>
                <span className={styles.title}>
                  {card.name}
                </span>
                <img
                    src={DeleteIcon}
                    alt={t("cardCard.delete")}
                    className={styles.deleteIcon}
                    onClick={() => setConfirmDelete(true)}
                />
            </div>
            <div className={styles.lastUsed}>
                {t("cardCard.lastUsed")}:<p>{formatDate(card.last_used)}</p>
            </div>
            {mutation.isPending && (
                <Loader size="sm" content={t("cardCard.deleting")} className={styles.loader}/>
            )}
            <ConfirmDelete
                show={confirmDelete}
                name={t("cardCard.confirmDelete")}
                onCancel={() => setConfirmDelete(false)}
                onConfirm={() => {
                    mutation.mutate();
                    setConfirmDelete(false);
                }}
            />
        </Panel>
    );
}