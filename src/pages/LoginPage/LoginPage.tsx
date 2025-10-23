import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.tsx";
import { api } from "../../constant/api";
import { Form, Button, Message, Panel, FlexboxGrid, Schema, Loader } from "rsuite";
import styles from "./LoginPage.module.css";

const { StringType } = Schema.Types;

export default function LoginPage() {
    const { login, access } = useAuth();
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({ username: "", password: "" });
    const [loginError, setLoginError] = useState("");
    const [loading, setLoading] = useState(false);

    const model = Schema.Model({
        username: StringType().isRequired("Nazwa użytkownika jest wymagana."),
        password: StringType().isRequired("Hasło jest wymagane."),
    });

    useEffect(() => {
        if (access) navigate("/");
    }, [access, navigate]);

    const handleSubmit = async (_: React.FormEvent) => {
        setLoading(true);
        setLoginError("");
        try {
            const response = await fetch(api.login, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "1234",
                },
                body: JSON.stringify(formValue),
            });

            const data = await response.json();

            if (response.ok && data.access) {
                login(data.access);
            } else if (response.status === 400) {
                setLoginError(data.message)
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <FlexboxGrid justify="center" align="middle" className={styles.grid}>
                <FlexboxGrid.Item colspan={24} sm={18} md={10} lg={8} >
                    <Panel shaded bordered bodyFill className={styles.panel}>
                        <h2 className={styles.title}>Smart Home</h2>
                        <p className={styles.subtitle}>Zaloguj się do swojego konta</p>

                        <Form
                            fluid
                            model={model}
                            formValue={formValue}
                            onChange={setFormValue}
                            onSubmit={handleSubmit}
                            autoComplete="off"
                        >
                            <Form.Group controlId="username">
                                <Form.ControlLabel>Nazwa użytkownika</Form.ControlLabel>
                                <Form.Control
                                    name="username"
                                    type="text"
                                    placeholder="Wprowadź nazwę"
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.ControlLabel>Hasło</Form.ControlLabel>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                />
                            </Form.Group>

                            {loginError && (
                                <Message showIcon={true} type="error" >{loginError}</Message>
                            )}

                            <Button
                                appearance="primary"
                                size="lg"
                                className={styles.submitBtn}
                                block
                                disabled={loading}
                                type="submit"
                            >
                                {loading ? <Loader size="sm" /> : "Zaloguj się"}
                            </Button>
                            <div className={styles.linkWrapper}>
                                <a href="/registration" className={styles.link}>
                                    Utwórz nowe konto
                                </a>
                            </div>
                        </Form>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
}
