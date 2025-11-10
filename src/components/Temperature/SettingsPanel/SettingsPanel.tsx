import {useEffect, useState} from "react";
import {Button, Form, InputNumber, Message, useToaster} from "rsuite";
import styles from "./SettingsPanel.module.css";
import useTempHumMutation from "../../../hooks/queries/useTempHumMutation.ts";
import {useTranslation} from "react-i18next";
interface ISettings{
    id:number,
    humidityHysteresis?:number,
    temperatureHysteresis?:number,
    triggerHumDown?:number,
    triggerHumUp?:number,
    triggerTempDown?:number,
    triggerTempUp?:number,
}

interface ISensorData extends ISettings{
    id:number;
}


export default function SettingsPanel(sensorData:ISensorData){
    const {t} = useTranslation();
    const [data, setData] = useState<ISettings>(sensorData);
    const mutation = useTempHumMutation(sensorData.id)
    const toaster = useToaster();

    useEffect(()=>{
        if (mutation.isError){
            toaster.push(<Message showIcon closable type="error">{t("message.error")}</Message>)
        }else if (mutation.isSuccess){
            toaster.push(<Message showIcon closable type="success">{t("message.success")}</Message>)
        }
    },[mutation.isError,mutation.isSuccess])

    function handleSubmit(){
        const body ={
            temperature_hysteresis:data.temperatureHysteresis,
            humidity_hysteresis:data.humidityHysteresis,
            trigger_temp_up:data.triggerTempUp,
            trigger_temp_down:data.triggerTempDown,
            trigger_hum_up:data.triggerHumUp,
            trigger_hum_down:data.triggerHumDown
        }
        mutation.mutate(body)
    }

    return <Form
        fluid
        formValue={data}
        onSubmit={handleSubmit}
        onChange={setData}
        className={styles.form}
    >
        <div className={styles.wrapper}>
            <div className={styles.formSection}>
                <Form.Group controlId="temperature" className={styles.formGroup}>
                    <h4>{t("settingsPanel.temperatureSettings")}</h4>
                    <Form.ControlLabel>{t("settingsPanel.temperatureHysteresis")}</Form.ControlLabel>
                    <Form.Control
                        className={styles.formInput}
                        name="temperatureHysteresis"
                        accepter={InputNumber}
                        step={0.1}
                        min={0.5}
                    />
                    <Form.ControlLabel>{t("settingsPanel.triggerTempDown")}</Form.ControlLabel>
                    <Form.Control
                        className={styles.formInput}
                        name="triggerTempDown"
                        accepter={InputNumber}
                        step={0.1}
                    />
                    <Form.ControlLabel>{t("settingsPanel.triggerTempUp")}</Form.ControlLabel>
                    <Form.Control
                        className={styles.formInput}
                        name="triggerTempUp"
                        accepter={InputNumber}
                        step={0.1}
                    />
                </Form.Group>
            </div>
            <div className={styles.formSection}>
                <Form.Group controlId="humidity" className={styles.formGroup}>
                    <h4>{t("settingsPanel.humiditySettings")}</h4>
                    <Form.ControlLabel>{t("settingsPanel.humidityHysteresis")}</Form.ControlLabel>
                    <Form.Control
                        className={styles.formInput}
                        name="humidityHysteresis"
                        accepter={InputNumber}
                        step={0.1}
                        min={1.0}
                    />
                    <Form.ControlLabel>{t("settingsPanel.triggerHumDown")}</Form.ControlLabel>
                    <Form.Control
                        className={styles.formInput}
                        name="triggerHumDown"
                        accepter={InputNumber}
                        step={0.1}
                    />
                    <Form.ControlLabel>{t("settingsPanel.triggerHumUp")}</Form.ControlLabel>
                    <Form.Control
                        className={styles.formInput}
                        name="triggerHumUp"
                        accepter={InputNumber}
                        step={0.1}
                    />
                </Form.Group>
            </div>
        </div>
        <Button
            appearance="primary"
            size="lg"
            type="submit"
            className={styles.button}
            block
            loading={mutation.isPending}
        >
            {t("buttons.saveButton")}
        </Button>
    </Form>
}