import { ICard } from "../../../interfaces/IRfidCard.tsx";
import { useEffect, useRef, useState } from "react";
import ConfirmDelete from "../../ConfirmDelete/ConfirmDelete";
import useCardMutation from "../../../hooks/queries/useCardMutation";
import {Card, IconButton, Text} from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import TagIcon from "@rsuite/icons/Tag";
import TimeIcon from "@rsuite/icons/Time";
import styles from "./CardCard.module.css";
import formatDate from "../../../utils/formatDate.tsx";
import {useTranslation} from "react-i18next";

interface CardCardProps {
  card: ICard;
  peripheralId:number
}

export default function CardCard({ card,peripheralId }: CardCardProps) {
    const {t} = useTranslation();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [shouldRollName, setShouldRollName] = useState(false);
    const nameRef = useRef<HTMLParagraphElement>(null);
    const nameTextRef = useRef<HTMLSpanElement>(null);
    const {mutationDelete} = useCardMutation();
    const mutation = mutationDelete(peripheralId, card.id);

    useEffect(() => {
        const measureName = () => {
            const container = nameRef.current;
            const text = nameTextRef.current;

            if (!container || !text) return;

            setShouldRollName(text.scrollWidth > container.clientWidth);
        };

        measureName();

        const resizeObserver = new ResizeObserver(measureName);

        if (nameRef.current) {
            resizeObserver.observe(nameRef.current);
        }

        window.addEventListener("resize", measureName);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", measureName);
        };
    }, [card.name]);

    function handleDelete() {
        mutation.mutate();
        setConfirmDelete(false);
    }

    return (
        <Card className={styles.card} shaded>
            <Card.Header className={styles.header}>
                <div className={styles.titleBlock}>
                    <span className={styles.iconWrap} aria-hidden="true">
                        <TagIcon />
                    </span>
                    <Text
                        ref={nameRef}
                        size="lg"
                        className={`${styles.title} ${shouldRollName ? styles.titleRolling : ""}`}
                        title={card.name}
                    >
                        <span className={styles.titleTrack}>
                            <span ref={nameTextRef}>{card.name}</span>
                            <span aria-hidden="true">{card.name}</span>
                        </span>
                    </Text>
                </div>
                <IconButton
                    appearance="subtle"
                    icon={<TrashIcon />}
                    aria-label={t("cardCard.delete")}
                    className={styles.deleteIcon}
                    onClick={() => setConfirmDelete(true)}
                />
            </Card.Header>
            <Card.Footer className={styles.footer}>
                <div className={styles.metaLabel}>
                    <TimeIcon />
                    <span>{t("cardCard.lastUsed")}</span>
                </div>
                <span className={styles.date}>{formatDate(card.last_used)}</span>
            </Card.Footer>
            <ConfirmDelete
                show={confirmDelete}
                name={t("cardCard.confirmDelete")}
                onCancel={() => setConfirmDelete(false)}
                onConfirm={handleDelete}
            />
        </Card>
    );
}
