import { Modal, Button } from "rsuite";
import styles from "./ConfirmDelete.module.css";
import {useTranslation} from "react-i18next";

interface ConfirmDeleteModalProps {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    name?: string;
    description?: string;
    danger?: boolean;
}

export default function ConfirmDeleteModal({
                                                             show,
                                                             onConfirm,
                                                             onCancel,
                                                             name = "element",
                                                             description,
                                                             danger = true,
                                                         }:ConfirmDeleteModalProps){
    const {t}= useTranslation();
    return (
        <Modal open={show} onClose={onCancel} size="xs" className={danger ? styles.modalDanger : styles.modal}>
            <Modal.Header>
                <Modal.Title className={styles.modalTitle}>
                    ⚠️ {t("confirmDelete.title")}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={styles.modalBody}>
                <p>{t("confirmDelete.message")} <strong>{name}</strong> ?</p>
                {description && <p className={styles.modalNote}>{description}</p>}
            </Modal.Body>

            <Modal.Footer>
                <Button
                    appearance={danger ? "primary" : "default"}
                    color={danger ? "red" : undefined}
                    onClick={onConfirm}
                >
                    {t("confirmDelete.confirm")}
                </Button>
                <Button appearance="subtle" onClick={onCancel}>
                    {t("confirmDelete.cancel")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
