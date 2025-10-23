import { Modal, Button } from "rsuite";
import styles from "./ConfirmDelete.module.css";

interface ConfirmDeleteModalProps {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    name?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean;
}

export default function ConfirmDeleteModal({
                                                             show,
                                                             onConfirm,
                                                             onCancel,
                                                             name = "element",
                                                             description,
                                                             confirmText = "Tak, usuń",
                                                             cancelText = "Anuluj",
                                                             danger = true,
                                                         }:ConfirmDeleteModalProps){
    return (
        <Modal open={show} onClose={onCancel} size="xs" className={danger ? styles.modalDanger : styles.modal}>
            <Modal.Header>
                <Modal.Title className={styles.modalTitle}>
                    ⚠️ Potwierdź usunięcie
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={styles.modalBody}>
                <p>Czy na pewno chcesz usunąć <strong>{name}</strong> ?</p>
                {description && <p className={styles.modalNote}>{description}</p>}
            </Modal.Body>

            <Modal.Footer>
                <Button
                    appearance={danger ? "primary" : "default"}
                    color={danger ? "red" : undefined}
                    onClick={onConfirm}
                >
                    {confirmText}
                </Button>
                <Button appearance="subtle" onClick={onCancel}>
                    {cancelText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
