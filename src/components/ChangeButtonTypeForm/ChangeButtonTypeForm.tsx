import {Button, Form, Message, SelectPicker, toaster, useToaster} from "rsuite";
import {TButton} from "../../type/TButton.ts";
import {useEffect, useState} from "react";
import styles from "./ChangeButtonTypeForm.module.css"
import useButtonTypeMutation from "../../hooks/queries/useButtonTypeMutation.tsx";

interface Props {
    id: number,
    current_type: TButton
}

interface IFormValue {
    button_type:TButton
}

export default function ChangeButtonTypeForm ({id, current_type}:Props){
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
                    Zapisano
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        }
        if (mutation.isError) {
            toaster.push(
                <Message closable type="error" showIcon >
                    Nie udało się zapisać
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
            <Form.ControlLabel>Wybierz typ przycisku</Form.ControlLabel>
            <Form.Control
                name="button_type"
                accepter={SelectPicker}
                data={["MONO","BI"].map(option =>({
                    label: option,
                    value: option,
                }))}
                placeholder={current_type}
                block
                searchable={false}
            />
        </Form.Group>
        <Button appearance="primary" type="submit">Zapisz</Button>
    </Form>
}
