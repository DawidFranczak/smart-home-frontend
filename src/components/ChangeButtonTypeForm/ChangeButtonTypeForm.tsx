import {Button, Form, Message, SelectPicker, useToaster} from "rsuite";
import {TButton} from "../../type/TButton.ts";
import {useEffect, useState} from "react";
import styles from "./ChangeButtonTypeForm.module.css"
import useButtonTypeMutation from "../../hooks/queries/useButtonTypeMutation.tsx";
import {useTranslation} from "react-i18next";

interface Props {
    id: number,
    current_type: TButton
    changeable?: boolean
}

interface IFormValue {
    button_type:TButton
}

export default function ChangeButtonTypeForm ({id, current_type,changeable=true}:Props){
    const {t} = useTranslation();
    const [formValue, setFormValue] = useState<IFormValue>({button_type:current_type});
    const mutation = useButtonTypeMutation(id);
    const toaster = useToaster();
    function handleSubmit(values:IFormValue){
        mutation.mutate(values)
    }

    useEffect(() => {
        if (mutation.isSuccess) {
            toaster.push(
                <Message closable type="success" showIcon >
                    {t("message.success")}
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        }
        if (mutation.isError) {
            toaster.push(
                <Message closable type="error" showIcon >
                    {t("message.error")}
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        }
    }, [mutation.isError,mutation.isSuccess]);

    return <Form
         fluid
         formValue={formValue}
         onChange={setFormValue}
         onSubmit={handleSubmit}
         className={styles.form}>
        <Form.Group controlId="buttonType" className={styles.formGroup}>
            <Form.ControlLabel>{changeable?t("changeButtonTypeForm.selectLabel"):t("changeButtonTypeForm.selectLabelDisable")}</Form.ControlLabel>
            <Form.Control
                name="button_type"
                accepter={SelectPicker}
                data={["MONO","BI"].map(option =>({
                    label: t(`buttonTypes.${option}`),
                    value: option,
                }))}
                placeholder={current_type}
                block
                searchable={false}
                plaintext={!changeable}
            />
        </Form.Group>
        {changeable && <Button appearance="primary" type="submit">{t("buttons.saveButton")}</Button>}
    </Form>
}
