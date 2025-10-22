import { useEffect, useState } from "react";
import { Form, Button, ButtonToolbar, Panel, Message, useToaster } from "rsuite";
import useHomeMutation from "../../hooks/queries/useHomeMutation";
import { ICustomError } from "../../interfaces/ICustomError";
import styles from "./ChangeHomeForm.module.css";

export default function ChangeHomeForm() {
    const [formValue, setFormValue] = useState({ homeCode: "" });
    const [error, setError] = useState("");
    const { updateHome } = useHomeMutation();
    const mutation = updateHome();
    const toaster = useToaster();

    useEffect(() => {
        const err = mutation.error as ICustomError;
        if (err?.details) {
            const firstKey = Object.keys(err.details)[0];
            setError(err.details[firstKey]);
        }
    }, [mutation.error]);

    useEffect(() => {
        if (mutation.isSuccess) {
            toaster.push(
                <Message type="success" showIcon closable>
                    Dom został zmieniony pomyślnie 🎉
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
            setTimeout(() => window.location.reload(), 1500);
        }
    }, [mutation.isSuccess]);

    const handleSubmit = () => {
        setError("");
        if (!formValue.homeCode) {
            setError("Podaj kod domu");
            return;
        }
        mutation.mutate(formValue.homeCode);
    };

    return (
        <div className={styles.pageWrapper}>
            <Panel bordered shaded className={styles.panel}>
                <h3 className={styles.title}>Zmiana domu</h3>
                <p className={styles.subtitle}>
                    Po zmianie domu wszystkie urządzenia przypisane do obecnego zostaną usunięte.
                </p>

                <Form fluid formValue={formValue} onChange={setFormValue} onSubmit={handleSubmit}>
                    <Form.Group controlId="homeCode">
                        <Form.ControlLabel>Kod domu</Form.ControlLabel>
                        <Form.Control
                            name="homeCode"
                            type="text"
                            placeholder="Wpisz nowy kod domu"
                            errorMessage={error || undefined}
                        />
                    </Form.Group>

                    <ButtonToolbar className={styles.buttonToolbar}>
                        <Button
                            appearance="primary"
                            color="red"
                            type="submit"
                            loading={mutation.isPending}
                            block
                        >
                            Zmień dom
                        </Button>
                    </ButtonToolbar>
                </Form>
            </Panel>
        </div>
    );
}
