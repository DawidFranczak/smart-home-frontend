import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.tsx";
import { api } from "../../constant/api";
import { Form, Button, Message, Panel, FlexboxGrid, Schema, Loader } from "rsuite";
import styles from "./RegistrationPage.module.css";
import { useTranslation } from "react-i18next";

const { StringType } = Schema.Types;

export default function RegistrationPage() {
    const { access } = useAuth();
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        username: "",
        password: "",
        password2: ""
    });

    const [formError, setFormError] = useState({
        username: "",
        password: "",
        password2: ""
    });

    const [globalError, setGlobalError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const model = Schema.Model({
        username: StringType().isRequired(t("registration.usernameRequired")),
        password: StringType().isRequired(t("registration.passwordRequired")),
        password2: StringType().isRequired(t("registration.password2Required")),
    });

    useEffect(() => {
        if (access) navigate("/");
    }, [access, navigate]);

    const handleSubmit = async (_: React.FormEvent) => {
        setLoading(true);
        setFormError({ username: "", password: "", password2: "" });
        setGlobalError("");

        const result = model.check(formValue);
        const errors: typeof formError = { username: "", password: "", password2: "" };

        for (const key in result) {
            if (result[key as keyof typeof result].hasError) {
                errors[key as keyof typeof errors] = result[key as keyof typeof result].errorMessage || "";
            }
        }

        const hasErrors = Object.values(errors).some(msg => msg !== "");

        if (hasErrors) {
            setFormError(errors);
            setLoading(false);
            return;
        }
        if (formValue.password !== formValue.password2) {
            setFormError(prev => ({ ...prev, password2: t("registration.passwordsMismatch") }));
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(api.registration, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "1234",
                },
                body: JSON.stringify({
                    username: formValue.username,
                    password: formValue.password,
                    password2: formValue.password2,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => navigate("/login"), 2000);
            } else if (response.status === 400) {
                // mapowanie błędów z backendu
                setFormError(prev => ({
                    ...prev,
                    username: data.username || "",
                    password: data.password || "",
                    password2: data.password2 || ""
                }));
                setGlobalError(data.empty || "");
            } else {
                setGlobalError(t("registration.unexpectedError"));
            }
        } catch (err) {
            setGlobalError(t("registration.networkError"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <FlexboxGrid justify="center" align="middle" className={styles.grid}>
                <FlexboxGrid.Item colspan={24} sm={18} md={10} lg={8}>
                    <Panel shaded bordered bodyFill className={styles.panel}>
                        <h2 className={styles.title}>{t("registration.title")}</h2>
                        <p className={styles.subtitle}>{t("registration.subtitle")}</p>

                        <Form
                            fluid
                            model={model}
                            formError={formError}
                            formValue={formValue}
                            onChange={setFormValue}
                            autoComplete="off"
                        >
                            <Form.Group controlId={"username"}>
                                <Form.ControlLabel>{t("registration.username")}</Form.ControlLabel>
                                <Form.Control name="username" type="text" placeholder={t("registration.usernamePlaceholder")} />
                            </Form.Group>

                            <Form.Group>
                                <Form.ControlLabel>{t("registration.password")}</Form.ControlLabel>
                                <Form.Control name="password" type="password" placeholder={t("registration.passwordPlaceholder")} />
                            </Form.Group>

                            <Form.Group>
                                <Form.ControlLabel>{t("registration.password2")}</Form.ControlLabel>
                                <Form.Control name="password2" type="password" placeholder={t("registration.password2Placeholder")} />
                            </Form.Group>

                            {globalError && <Message showIcon type="error" className={styles.message}>{globalError}</Message>}

                            {success && (
                                <Message type="success" className={styles.message}>
                                    {t("registration.registrationSuccess")}
                                </Message>
                            )}
                            <Button appearance="primary" block disabled={loading} type="submit" onClick={handleSubmit}>
                                {loading ? <Loader size="sm" /> : t("registration.registrationButton")}
                            </Button>
                        </Form>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
}
