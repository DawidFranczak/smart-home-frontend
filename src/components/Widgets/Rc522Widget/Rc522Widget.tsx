import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {IRc522Widget} from "../../../interfaces/Widgets/IRc522.ts";
import CardManager from "./CardManager/CardManager.tsx";
import {useEffect, useMemo, useRef, useState} from "react";
import {Button} from "rsuite";
import DEVICE_PENDING from "../../../enums/device_pending.ts"
import useRfidCardQuery from "../../../hooks/queries/useRfidCardQuery.tsx";
import styles from "./Rc522Widget.module.css";
import {useTranslation} from "react-i18next";
import IdMappingIcon from "@rsuite/icons/IdMapping";
import TimeIcon from "@rsuite/icons/Time";
import WavePointIcon from "@rsuite/icons/WavePoint";

export default function Rc522Widget({id, config, pending, isOnline = true}:IRc522Widget){
    const { t } = useTranslation();
    const [showCardManager, setShowCardManager] = useState(false);
    const [shouldRollName, setShouldRollName] = useState(false);
    const nameRef = useRef<HTMLSpanElement>(null);
    const nameTextRef = useRef<HTMLSpanElement>(null);
    const isAddingCard = pending.includes(DEVICE_PENDING.ADD_TAG);
    const {cards, isLoading} = useRfidCardQuery(id)
    const cardCount = cards?.length ?? 0;

    const lastUsedCard = useMemo(() => {
        if (!cards || !cards.length) return null;
        return [...cards].sort((a, b) =>
            new Date(b.last_used).getTime() - new Date(a.last_used).getTime()
        )[0];
    }, [cards]);

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
    }, [lastUsedCard?.name]);

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], {day:'2-digit',month:'2-digit',year:'2-digit', hour: '2-digit', minute: '2-digit' });
    };

    const statusText = !isOnline
        ? t("widgetState.offline")
        : isAddingCard
            ? t("rfidCard.parsing")
            : isLoading
                ? t("widgetState.sync")
                : lastUsedCard
                    ? lastUsedCard.name
                    : t("rfidCard.noCard");

    return (
        <BaseWidget
            name={config?.name}
            className={`${styles.widget} ${!isOnline ? styles.offlineWidget : ""}`}
            w={3}
            h={2}
        >
            <div className={`${styles.container} ${isAddingCard ? styles.pairing : ""} ${!isOnline ? styles.offline : ""}`}>
                <div className={styles.header}>
                    <div>
                        <span className={styles.eyebrow}>RC522</span>
                        <p className={styles.heading}>{t("rfidCard.cardAmount")}: {cardCount}</p>
                    </div>
                    <span className={`${styles.statusBadge} ${isAddingCard ? styles.statusPairing : ""}`}>
                        {isAddingCard ? t("widgetState.sync") : isOnline ? "Live" : t("widgetState.offline")}
                    </span>
                </div>

                <div className={styles.readerPanel}>
                    <div className={styles.readerIcon} aria-hidden="true">
                        <span className={styles.readerCore}>
                            <IdMappingIcon />
                        </span>
                        <span className={styles.signalRing} />
                        <span className={styles.signalRing} />
                    </div>

                    <div className={styles.infoSection}>
                        <span
                            ref={nameRef}
                            className={`${styles.lastCardName} ${shouldRollName ? styles.nameRolling : ""}`}
                            title={statusText}
                        >
                            <span className={styles.nameTrack}>
                                <span ref={nameTextRef}>{statusText}</span>
                                <span aria-hidden="true">{statusText}</span>
                            </span>
                        </span>
                        <span className={styles.lastAccess}>
                            {lastUsedCard ? (
                                <>
                                    <TimeIcon />
                                    {formatTime(lastUsedCard.last_used)}
                                </>
                            ) : (
                                <>
                                    <WavePointIcon />
                                    {isAddingCard ? t("addCardForm.pendingMessage") : t("cardManager.searchPlaceholder")}
                                </>
                            )}
                        </span>
                    </div>
                </div>

                <div className={styles.footer}>
                    <Button
                        className={styles.managerButton}
                        appearance="subtle"
                        startIcon={<IdMappingIcon />}
                        onClick={() => setShowCardManager(true)}
                    >
                        {t("rfidCard.cardManagerButton")}
                    </Button>
                </div>
            </div>
            <CardManager
                id={id}
                pending={isAddingCard}
                open={showCardManager}
                onClose={() => setShowCardManager(false)}
            />
        </BaseWidget>
    );
}
