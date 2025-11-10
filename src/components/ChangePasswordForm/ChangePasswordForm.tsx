import { useEffect, useState } from "react";
import { Form, ButtonToolbar, Button, Panel, Message, useToaster } from "rsuite";
import useChangePasswordMutation from "../../hooks/queries/useChangePasswordMutation";
import { ICustomError } from "../../interfaces/ICustomError";
import styles from "./ChangePasswordForm.module.css";
import { useTranslation } from "react-i18next";
interface IError {
    empty?: string;
    current_password?: string;
    new_password2?: string;
}

export default function ChangePasswordForm() {
    const { t } = useTranslation();
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
                        {t("changePassword.successMessage")}
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
                <h3 className={styles.title}>{t("changePassword.title")}</h3>
                <p className={styles.subtitle}>{t("changePassword.subtitle")}</p>

                <Form fluid formValue={formValue} onChange={setFormValue} onSubmit={handleSubmit}>
                    <Form.Group controlId="currentPassword">
                        <Form.ControlLabel>{t("changePassword.currentPassword")}</Form.ControlLabel>
                        <Form.Control
                            name="currentPassword"
                            type="password"
                            placeholder={t("changePassword.currentPasswordPlaceholder")}
                            errorMessage={error?.current_password || undefined}
                        />
                    </Form.Group>

                    <Form.Group controlId="newPassword">
                        <Form.ControlLabel>{t("changePassword.newPassword")}</Form.ControlLabel>
                        <Form.Control
                            name="newPassword"
                            type="password"
                            placeholder={t("changePassword.newPasswordPlaceholder")}
                        />
                    </Form.Group>

                    <Form.Group controlId="newPassword2">
                        <Form.ControlLabel>{t("changePassword.newPassword2")}</Form.ControlLabel>
                        <Form.Control
                            name="newPassword2"
                            type="password"
                            placeholder={t("changePassword.newPassword2Placeholder")}
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
                            {t("changePassword.saveButton")}
                        </Button>
                    </ButtonToolbar>
                </Form>
            </Panel>
        </div>
    );
}
