import {useEffect, useState} from "react";
import { Modal, Button, Input, Message, Loader, Divider } from "rsuite";
import TagIcon from "@rsuite/icons/Tag";
import styles from "./AddCardForm.module.css";
import {useTranslation} from "react-i18next";
import MessageType from "../../../../constant/message_type.ts";
import {MessageAction} from "../../../../enums/message_command.ts";
import useTriggerActionEventMutation from "../../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../../utils/commandBuilders.ts";

interface AddCardFormProps {
    id: number;
    handleAddFunction: () => void;
    show: boolean;
    pending: boolean;
}

type AddTagResultDetail = {
    intent_id: string;
    status: number;
};

export default function AddCardForm({id, handleAddFunction, show, pending}: AddCardFormProps) {
    const { t } = useTranslation();
    const mutation = useTriggerActionEventMutation()
    const [name, setName] = useState("");
    const [intentId, setIntentId] = useState(() => crypto.randomUUID());
    const [status, setStatus] = useState<number | null>(null);
    const [nameError, setNameError] = useState(false);
    const isSubmitting = pending || mutation.isPending;

    useEffect(() => {
        if (!show) return;

        setName("");
        setStatus(null);
        setNameError(false);
        setIntentId(crypto.randomUUID());
    }, [show]);

    useEffect(() => {
        const handleRfidEvent = (event: Event) => {
            const {detail} = event as CustomEvent<AddTagResultDetail>;
            if (!detail) return;

            const { intent_id, status } = detail;

            if (intent_id !== intentId) return;

            if (status === 201) {
                setName("");
            }

            setNameError(false);
            setStatus(status);
            setIntentId(crypto.randomUUID());
        };
        window.addEventListener(MessageType.ADD_TAG_RESULT, handleRfidEvent);
        return () => window.removeEventListener(MessageType.ADD_TAG_RESULT, handleRfidEvent);
    }, [intentId]);

    const handleSubmit = () => {
        const trimmedName = name.trim();

        if (!trimmedName) {
            setNameError(true);
            setStatus(null);
            return;
        }

        setNameError(false);
        setStatus(null);

        const data = peripheralAction(id, MessageAction.ADD_TAG, {"name": trimmedName, "intent_id": intentId});
        mutation.mutate(data)
    };

    const handleCancel = () => {
        setName("");
        setStatus(null);
        setNameError(false);
        handleAddFunction();
    };

    return (
        <Modal
            open={show}
            onClose={handleCancel}
            size="sm"
            className={styles.modal}
            backdrop="static"
        >
            <Modal.Header>
                <Modal.Title className={styles.modalTitle}>
                    <TagIcon />
                    <span>{t("addCardForm.addCardTitle")}</span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={styles.modalBody}>
                {isSubmitting ? (
                    <div className={styles.pendingContainer}>
                        <Loader size="md" content={t("addCardForm.pendingMessage")} vertical />
                    </div>
                ) : (
                    <>
                        <p className={styles.modalText}>
                            {t("addCardForm.instruction")}
                        </p>

                        <Input
                            placeholder={t("addCardForm.cardNamePlaceholder")}
                            value={name}
                            onChange={(value) => {
                                setName(value);
                                if (nameError && value.trim()) setNameError(false);
                            }}
                            size="lg"
                            className={styles.input}
                            aria-invalid={nameError}
                        />

                        <Divider className={styles.divider} />

                        {nameError && (
                            <Message showIcon type="error">
                                {t("addCardForm.errorNameRequired")}
                            </Message>
                        )}
                        {status === 201 && (
                            <Message showIcon type="success">
                                {t("addCardForm.success")}
                            </Message>
                        )}
                        {status === 400 && (
                            <Message showIcon type="error">
                                {t("addCardForm.error400")}
                            </Message>
                        )}
                        {status === 409 && (
                            <Message showIcon type="error">
                                {t("addCardForm.error409")}
                            </Message>
                        )}
                    </>
                )}
            </Modal.Body>

            <Modal.Footer className={styles.modalFooter}>
                <Button
                    onClick={handleCancel}
                    appearance="subtle"
                    size="lg"
                >
                    {t("button.cancel")}
                </Button>
                <Button
                    onClick={handleSubmit}
                    appearance="primary"
                    size="lg"
                    loading={mutation.isPending}
                    disabled={isSubmitting}
                >
                    {t("button.add")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
