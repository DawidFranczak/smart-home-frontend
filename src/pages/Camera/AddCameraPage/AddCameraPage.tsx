import { useEffect, useState } from "react";
import { Form, Button, Panel, Message, useToaster } from "rsuite";
import useCameraMutation from "../../../hooks/queries/useCameraMutation.tsx";
import { ICameraCreate } from "../../../interfaces/ICamera.tsx";
import { ICustomError } from "../../../interfaces/ICustomError.tsx";
import styles from "./AddCameraPage.module.css";

interface IError {
    name?: string;
    ip_address?: string;
    port?: string;
    username?: string;
    password?: string;
    path?: string;
}

export default function AddCameraPage() {
    const [formValue, setFormValue] = useState<ICameraCreate>({
        name: "",
        ip_address: "",
        port: "",
        username: "",
        password: "",
        path: "",
    });
    const [error, setError] = useState<IError>({});
    const { createCamera } = useCameraMutation();
    const mutation = createCamera();
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
                        Kamera została dodana pomyślnie 🎉
                    </Message>,
                    { placement: "topCenter", duration: 3000 }
                );
                setFormValue({
                    name: "",
                    ip_address: "",
                    port: "",
                    username: "",
                    password: "",
                    path: "",
                });
            },
        });
    };

    return (
        <div className={styles.pageWrapper}>
            <Panel bordered shaded className={styles.panel}>
                <h3 className={styles.title}>Dodaj kamerę</h3>
                <p className={styles.subtitle}>
                    Wypełnij dane kamery, aby dodać ją do systemu. Upewnij się, że podajesz prawidłowy adres IP i port.
                </p>

                <Form fluid formValue={formValue} onChange={setFormValue} onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.ControlLabel>Nazwa</Form.ControlLabel>
                        <Form.Control
                            name="name"
                            type="text"
                            placeholder="Wpisz nazwę kamery"
                            errorMessage={error?.name || undefined}
                        />
                    </Form.Group>

                    <Form.Group controlId="ip_address">
                        <Form.ControlLabel>Adres IP</Form.ControlLabel>
                        <Form.Control
                            name="ip_address"
                            type="text"
                            placeholder="Wpisz adres IP (np. 192.168.1.100)"
                            errorMessage={error?.ip_address || undefined}
                        />
                    </Form.Group>

                    <Form.Group controlId="port">
                        <Form.ControlLabel>Port</Form.ControlLabel>
                        <Form.Control
                            name="port"
                            type="number"
                            placeholder="Wpisz port (np. 554)"
                            errorMessage={error?.port || undefined}
                        />
                    </Form.Group>

                    <Form.Group controlId="username">
                        <Form.ControlLabel>Nazwa użytkownika</Form.ControlLabel>
                        <Form.Control
                            name="username"
                            type="text"
                            placeholder="Wpisz nazwę użytkownika"
                            errorMessage={error?.username || undefined}
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.ControlLabel>Hasło</Form.ControlLabel>
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="Wpisz hasło"
                            errorMessage={error?.password || undefined}
                        />
                    </Form.Group>

                    <Form.Group controlId="path">
                        <Form.ControlLabel>Ścieżka</Form.ControlLabel>
                        <Form.Control
                            name="path"
                            type="text"
                            placeholder="Wpisz ścieżkę RTSP (np. /stream1)"
                            errorMessage={error?.path || undefined}
                        />
                    </Form.Group>

                    <Button
                        appearance="primary"
                        type="submit"
                        loading={mutation.isPending}
                        block
                        className={styles.submitButton}
                    >
                        Dodaj kamerę
                    </Button>
                </Form>
            </Panel>
        </div>
    );
}