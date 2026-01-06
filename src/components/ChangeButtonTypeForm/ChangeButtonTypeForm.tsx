import {Button, Form, SelectPicker,} from "rsuite";
import {TButton} from "../../type/TButton.ts";
import {useEffect, useState} from "react";
import styles from "./ChangeButtonTypeForm.module.css"
import useButtonTypeMutation from "../../hooks/queries/useButtonTypeMutation.tsx";
import {useTranslation} from "react-i18next";
import displayToaster from "../../utils/displayToaster.tsx";

interface Props {
    id: number,
    current_type: TButton
    changeable?: boolean
}

interface IFormValue {
    button_type:TButton
}

export default function ChangeButtonTypeForm ({id, current_type, changeable=true}:Props){
    const {t} = useTranslation();
    const [formValue, setFormValue] = useState<IFormValue>({button_type:current_type});
    const mutation = useButtonTypeMutation(id);
    function handleSubmit(values:IFormValue){
        mutation.mutate(values)
    }

    useEffect(() => {
        if (mutation.isSuccess) {
            displayToaster(t("message.success"))
        }
        if (mutation.isError) {
            displayToaster(t("message.error"),"error")
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
