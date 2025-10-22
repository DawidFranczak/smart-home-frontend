import { useEffect, useState } from "react";
import { Form, ButtonToolbar, Button, Panel, Message, useToaster } from "rsuite";
import useChangePasswordMutation from "../../hooks/queries/useChangePasswordMutation";
import { ICustomError } from "../../interfaces/ICustomError";
import styles from "./ChangePasswordForm.module.css";

interface IError {
    empty?: string;
    current_password?: string;
    new_password2?: string;
}

export default function ChangePasswordForm() {
    const [formValue, setFormValue] = useState({
        currentPassword: "",
        newPassword: "",
        newPassword2: "",
    });
    const [error, setError] = useState<IError>({});
    const mutation = useChangePasswordMutation();
    const toaster = useToaster();

    useEffect(() => {
        if (mutation.isError) {
            const customError = mutation.error as ICustomError;
            if (customError.details) {
                setError(customError.details);
            }
        }
    }, [mutation.error]);

    const handleSubmit = () => {
        setError({});
        mutation.mutate(formValue, {
            onSuccess: () => {
                toaster.push(
                    <Message type="success" showIcon closable>
                        Hasło zostało zmienione pomyślnie 🎉
                    </Message>,
                    { placement: "topCenter", duration: 3000 }
                );
                setFormValue({
                    currentPassword: "",
                    newPassword: "",
                    newPassword2: "",
                });
            },
        });
    };

    return (
        <div className={styles.pageWrapper}>
            <Panel bordered shaded className={styles.panel}>
                <h3 className={styles.title}>Zmiana hasła</h3>
                <p className={styles.subtitle}>
                    Upewnij się, że Twoje nowe hasło jest silne i różni się od poprzednich.
                </p>

                <Form fluid formValue={formValue} onChange={setFormValue} onSubmit={handleSubmit}>
                    <Form.Group controlId="currentPassword">
                        <Form.ControlLabel>Obecne hasło</Form.ControlLabel>
                        <Form.Control
                            name="currentPassword"
                            type="password"
                            placeholder="Wpisz obecne hasło"
                            errorMessage={error?.current_password || undefined}
                        />
                    </Form.Group>

                    <Form.Group controlId="newPassword">
                        <Form.ControlLabel>Nowe hasło</Form.ControlLabel>
                        <Form.Control
                            name="newPassword"
                            type="password"
                            placeholder="Wpisz nowe hasło"
                        />
                    </Form.Group>

                    <Form.Group controlId="newPassword2">
                        <Form.ControlLabel>Powtórz nowe hasło</Form.ControlLabel>
                        <Form.Control
                            name="newPassword2"
                            type="password"
                            placeholder="Powtórz nowe hasło"
                            errorMessage={error?.new_password2 || error?.empty || undefined}
                        />
                    </Form.Group>

                    <ButtonToolbar className={styles.buttonToolbar}>
                        <Button
                            appearance="primary"
                            type="submit"
                            loading={mutation.isPending}
                            block
                        >
                            Zapisz hasło
                        </Button>
                    </ButtonToolbar>
                </Form>
            </Panel>
        </div>
    );
}
