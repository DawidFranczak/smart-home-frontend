import { useState } from "react";
import { Modal, Button, Input, Message, Loader, Divider } from "rsuite";
import useCardMutation from "../../hooks/queries/useCardMutation";
import { ICustomError } from "../../interfaces/ICustomError";
import styles from "./AddCardForm.module.css";

interface AddCardFormProps {
    rfidID: number;
    handleAddFunction: () => void;
    show: boolean;
    pending: boolean;
    status?: number;
}

export default function AddCardForm({
                                        rfidID,
                                        handleAddFunction,
                                        show,
                                        pending,
                                        status
                                    }: AddCardFormProps) {
    const [name, setName] = useState("");
    const { mutationCreate } = useCardMutation();
    const mutation = mutationCreate(rfidID);
    const error = mutation.error as ICustomError;
    const handleSubmit = () => {
        if (name.trim()) {
            mutation.mutate(name);
        }
    };

    const handleCancel = () => {
        mutation.reset();
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
                <Modal.Title className={styles.modalTitle}>💳 Dodaj nową kartę</Modal.Title>
            </Modal.Header>

            <Modal.Body className={styles.modalBody}>
                {pending ? (
                    <div className={styles.pendingContainer}>
                        <Loader size="md" content="Zbliż kartę do czytnika..." vertical />
                    </div>
                ) : (
                    <>
                        <p className={styles.modalText}>
                            Wprowadź nazwę karty i zbliż ją do czytnika RFID.
                        </p>

                        <Input
                            placeholder="Nazwa karty"
                            value={name}
                            onChange={setName}
                            size="lg"
                            className={styles.input}
                        />

                        <Divider className={styles.divider} />

                        {error?.details?.non_field_errors && (
                            <Message showIcon type="error">
                                {error.details.non_field_errors}
                            </Message>
                        )}
                        {error?.details?.name && (
                            <Message showIcon type="error">
                                To pole jest wymagane
                            </Message>
                        )}
                        {status === 400 && (
                            <Message showIcon type="error">
                                Nie udało się dodać karty, spróbuj ponownie.
                            </Message>
                        )}
                        {status === 409 && (
                            <Message showIcon type="error">
                                Ta karta jest już zapisana.
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
                    Anuluj
                </Button>
                <Button
                    onClick={handleSubmit}
                    appearance="primary"
                    size="lg"
                    disabled={pending}
                >
                    Dodaj kartę
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
