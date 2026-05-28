import {useState, useMemo} from "react";
import {Badge, Button, Input, InputGroup, Modal} from "rsuite";
import {useTranslation} from "react-i18next";
import styles from "./CardManager.module.css";
import CardCard from "../../../Cards/CardCard/CardCard.tsx";
import useRfidCardQuery from "../../../../hooks/queries/useRfidCardQuery.tsx";
import AddCardForm from "../AddCardForm/AddCardForm.tsx";
import {ICard} from "../../../../interfaces/IRfidCard.tsx";
import LoadingAnimation from "../../../ui/LoadingAnimation/LoadingAnimation.tsx";
import SearchIcon from '@rsuite/icons/Search';
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import IdMappingIcon from '@rsuite/icons/IdMapping';

interface IProps {
    id:number,
    pending:boolean,
    open:boolean,
    onClose:()=>void,
}

export default function CardManager({id, pending, onClose,open}: IProps) {
    const { t } = useTranslation();
    const [filter, setFilter] = useState("");
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    const {cards} = useRfidCardQuery(id)
    const normalizedFilter = filter.trim().toLowerCase();

    const filteredCards = useMemo(() => {
        if (!cards) return [];
        if (!normalizedFilter) return cards;

        return cards.filter((card: ICard) =>
            card.name.toLowerCase().includes(normalizedFilter)
        );
    }, [cards, normalizedFilter]);

    return (
        <Modal
            open={open}
            className={styles.section}
            onClose={onClose}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <div className={styles.sectionHeader}>
                        <div className={styles.titleIcon} aria-hidden="true">
                            <IdMappingIcon />
                        </div>
                        <div className={styles.titleContent}>
                           <div className={styles.titleContentHeader}>
                               <h3>{t("cardManager.registeredCards")}</h3>
                               <Badge content={cards?.length ?? 0} color="cyan" className={styles.countBadge} />
                           </div>
                            <p className={styles.sectionDesc}>
                                {t("cardManager.allCardsDescription")}
                            </p>
                        </div>
                    </div>
                    <div className={styles.toolbar}>
                        <InputGroup inside className={styles.searchInput}>
                            <Input
                                placeholder={t("cardManager.searchPlaceholder")}
                                value={filter}
                                onChange={setFilter}
                            />
                            <InputGroup.Addon>
                                <SearchIcon />
                            </InputGroup.Addon>
                        </InputGroup>

                        <Button
                            appearance="primary"
                            startIcon={<PlusRoundIcon />}
                            onClick={() => setShowAddCardForm(true)}
                        >
                            {t("cardManager.addCardButton")}
                        </Button>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                {!cards ? (
                    <div className={styles.loadingState}>
                        <LoadingAnimation size={"small"}/>
                    </div>
                ) : cards.length > 0 ? (
                    <div className={styles.cardsContainer}>
                        {filteredCards.length > 0 ? (
                            filteredCards.map((card:ICard) => (
                                <CardCard key={card.id} card={card} peripheralId={id} />
                            ))
                        ) : (
                            <div className={styles.emptyState}>
                                <SearchIcon className={styles.emptyIcon} />
                                <h4 className={styles.emptyTitle}>{t("cardManager.noCardsTitle")}</h4>
                                <p className={styles.emptyDesc}>{t("cardManager.searchPlaceholder")}: {filter}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <IdMappingIcon className={styles.emptyIcon} />
                        <h4 className={styles.emptyTitle}>{t("cardManager.noCardsTitle")}</h4>
                        <p className={styles.emptyDesc}>
                            {t("cardManager.noCardsDescription")}
                        </p>
                        <Button
                            appearance="primary"
                            startIcon={<PlusRoundIcon />}
                            onClick={() => setShowAddCardForm(true)}
                        >
                            {t("cardManager.addCardButton")}
                        </Button>
                    </div>
                )}
                <AddCardForm
                    show={showAddCardForm}
                    pending={pending}
                    id={id}
                    handleAddFunction={() => setShowAddCardForm(false)}
                />
            </Modal.Body>
        </Modal>
    )
}


