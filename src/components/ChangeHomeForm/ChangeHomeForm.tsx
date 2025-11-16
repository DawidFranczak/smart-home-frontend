import { useEffect, useState } from "react";
import { Form, Button, ButtonToolbar, Panel, Message, useToaster } from "rsuite";
import useHomeMutation from "../../hooks/queries/useHomeMutation";
import { ICustomError } from "../../interfaces/ICustomError";
import styles from "./ChangeHomeForm.module.css";
import {useTranslation} from "react-i18next";

export default function ChangeHomeForm() {
    const { t } = useTranslation();
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
                    {t("changeHome.successMessage")}
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
            setTimeout(() => window.location.reload(), 1500);
        }
    }, [mutation.isSuccess]);

    const handleSubmit = () => {
        setError("");
        if (!formValue.homeCode) {
            setError(t("changeHome.emptyError"));
            return;
        }
        mutation.mutate(formValue.homeCode);
    };

    return (
        <div className={styles.pageWrapper}>
            <Panel bordered shaded className={styles.panel}>
                <h3 className={styles.title}>{t("changeHome.title")}</h3>
                <p className={styles.subtitle}>{t("changeHome.subtitle")}</p>

                <Form fluid formValue={formValue} onChange={setFormValue} onSubmit={handleSubmit}>
                    <Form.Group controlId="homeCode">
                        <Form.ControlLabel>{t("changeHome.homeCodeLabel")}</Form.ControlLabel>
                        <Form.Control
                            name="homeCode"
                            type="text"
                            placeholder={t("changeHome.homeCodePlaceholder")}
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
                            {t("changeHome.submitButton")}
                        </Button>
                    </ButtonToolbar>
                </Form>
            </Panel>
        </div>
    );
}
