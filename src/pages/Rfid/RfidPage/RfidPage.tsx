
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Divider, Panel, Badge } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import CardCard from "../../../components/Cards/CardCard/CardCard.tsx";
import AddCardForm from "../../../components/AddCardForm/AddCardForm.tsx";
import DeviceActionPanel from "../../../components/DeviceActionPanel/DeviceActionPanel.tsx";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery.tsx";
import { ICard} from "../../../interfaces/IRfid.tsx";
import { IRfid } from "../../../interfaces/IRfid.tsx";
import styles from "./RfidPage.module.css";
import DeviceEventSection from "../../../components/DeviceEventSection/DeviceEventSection.tsx";
import QueryInput from "../../../components/ui/QueryInput/QueryInput.tsx";
import {useTranslation} from "react-i18next";
import ChangeButtonTypeForm from "../../../components/ChangeButtonTypeForm/ChangeButtonTypeForm.tsx";

export default function RfidPage() {
    const [cards, setCards] = useState<ICard[]>([]);
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    const params = useParams();
    const id = params.id ? parseInt(params.id) : 0;
    const { device, status } = useDeviceQuery(id);
    const rfidData = device as IRfid;
    const {t} = useTranslation();

    useEffect(() => {
        if (rfidData) setCards(rfidData.cards);
        if (status === 201) setShowAddCardForm(false);
    }, [rfidData, status]);

    if (!rfidData) return <LoadingAnimation size="xlarge" type="spinner" glow={true} />;

    function handleFilterCards(value: string) {
        const filter = value.toLowerCase();
        const filteredCards = rfidData.cards.filter((card) => {
            return card.name.toLowerCase().includes(filter);
        });
        setCards(filteredCards);
    }

    return (
        <PageContainer className={styles.container}>
            <PageHeader title={rfidData.name}>
                <DeviceActionPanel
                    buttons={[
                        {
                            label: t("buttons.deviceEvent"),
                            to: `/rfid/${rfidData.id}/event/wizard/`,
                            type: "primary",
                            tooltip: t("buttons.deviceEventTooltip"),
                        },
                        {
                            label: t("buttons.deviceSettings"),
                            to: `/rfid/${rfidData.id}/settings/`,
                            tooltip: t("buttons.deviceSettingsTooltip"),
                        },
                    ]}
                    wifiStrength={rfidData.is_online ? rfidData.wifi_strength : -100}
                    showWifi={true}
                >
                    <Button
                        appearance="primary"
                        startIcon={<PlusIcon />}
                        onClick={() => setShowAddCardForm(true)}
                        className={styles.addButton}
                    >
                        {t("rfidPage.addCard")}
                    </Button>
                </DeviceActionPanel>
            </PageHeader>
            <AddCardForm
                show={showAddCardForm}
                pending={rfidData.pending.includes("add_tag")}
                rfidID={rfidData.id}
                handleAddFunction={() => setShowAddCardForm(false)}
                status={status}
            />
            <ChangeButtonTypeForm id={rfidData.id} current_type={rfidData.button_type} changeable={false}/>
            <DeviceEventSection events={rfidData.events} description={t("rfidPage.automaticEventsDescription")}/>

            <Panel className={styles.section} bordered>
                <div className={styles.sectionHeader}>
                    <div>
                        <div className={styles.sectionTitle}>
                            <h3>{t("rfidPage.registeredCards")}</h3>
                            <Badge content={cards.length} color="cyan" />
                        </div>
                        <p className={styles.sectionDesc}>
                            {t("rfidPage.allCardsDescription")}
                        </p>
                    </div>
                    <QueryInput onChange={handleFilterCards}/>
                </div>

                <Divider className={styles.divider} />

                {cards.length > 0 ? (
                    <div className={styles.cardsGrid}>
                        {cards.map((card) => (
                            <CardCard key={card.id} card={card} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <span className={styles.emptyIcon}></span>
                        <h4 className={styles.emptyTitle}> {t("rfidPage.noCardsTitle")}</h4>
                        <p className={styles.emptyDesc}>
                            {t("rfidPage.noCardsDescription")}
                        </p>
                        <Button
                            appearance="primary"
                            startIcon={<PlusIcon />}
                            onClick={() => setShowAddCardForm(true)}
                            className={styles.emptyButton}
                        >
                            {t("rfidPage.addFirstCard")}
                        </Button>
                    </div>
                )}
            </Panel>
        </PageContainer>
    );
}