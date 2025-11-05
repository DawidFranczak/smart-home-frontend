import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FlexboxGrid, Panel, Form, Button, SelectPicker, Message, Schema } from "rsuite";
import useAvailableActionQuery from "../../hooks/queries/useAvailableActionQuery";
import useDeviceByFunctionQuery from "../../hooks/queries/device/useDeviceByFunctionQuery";
import useActionSettingsByFunctionQuery from "../../hooks/queries/useActionSettingsByFunctionQuery.tsx";
import useEventMutation from "../../hooks/queries/useEventMutation";
import { IDevice } from "../../interfaces/IDevice.tsx";
import styles from "./DeviceEventWizard.module.css";
import PageHeader from "../../components/ui/Headers/PageHeader/PageHeader.tsx";
import PageContainer from "../../components/ui/containers/PageContainer/PageContainer.tsx";
import LoadingAnimation from "../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import renderInputFieldByType from "../../utils/getInputFieldByType.tsx";

const { StringType, NumberType } = Schema.Types;
export type SettingType = 'bool' | 'int' | 'text' | 'select';

interface IActionSettings {
    [key: string]: SettingType;
}

export default function DeviceEventWizard() {
    const params = useParams();
    const device_id = parseInt(params.id ? params.id : "0");
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        event: "",
        deviceFunction: "",
        selectDevice: 0,
        action: "",
    });
    const [extraSettingsForm, setExtraSettingsForm] = useState({});

    const [errorMsg, setErrorMsg] = useState("");
    const { availableAction } = useAvailableActionQuery(device_id, params.deviceFun ?? "");
    const { deviceByFunction } = useDeviceByFunctionQuery(formValue.deviceFunction);
    const { actionSettingsByFunction } = useActionSettingsByFunctionQuery(formValue.deviceFunction);
    const { createEvent } = useEventMutation();
    const createMutation = createEvent(device_id);
    const model = Schema.Model({
        event: StringType().isRequired("Wybierz event."),
        deviceFunction: StringType().isRequired("Wybierz typ urządzenia."),
        selectDevice: NumberType().isRequired("Wybierz urządzenie."),
        action: StringType().isRequired("Wybierz akcję."),
    });
    const settings = actionSettingsByFunction?.settings as IActionSettings || {}
    useEffect(() => {
        if (createMutation.isSuccess) navigate(-1);
    }, [createMutation.isSuccess, navigate]);
    const handleSubmit = () => {
        if (!model.check(formValue)) {
            setErrorMsg("Wypełnij wszystkie pola formularza.");
            return;
        }
        setErrorMsg("");
        const data = {
            target_device: formValue.selectDevice,
            action: formValue.action,
            device: device_id,
            event: formValue.event,
            extra_settings: extraSettingsForm,
        };
        createMutation.mutate(data);
    };

    if (!availableAction) {
        return <LoadingAnimation size="xlarge"/>
    }
    console.log(actionSettingsByFunction)
    return (
        <PageContainer>
        <PageHeader title="Dodawanie akcji"></PageHeader>
        <div className={styles.pageWrapper}>
            <FlexboxGrid justify="center" align="middle" className={styles.grid}>
                <FlexboxGrid.Item colspan={24} sm={18} md={12} lg={8}>
                    <Panel bordered shaded className={styles.panel}>
                        <h2 className={styles.title}>Dodaj akcję</h2>
                        <p className={styles.subtitle}>Skonfiguruj zdarzenie dla swojego urządzenia</p>

                        <Form
                            fluid
                            model={model}
                            formValue={formValue}
                            onChange={setFormValue}
                            onSubmit={handleSubmit}
                        >
                            <Form.Group controlId="event">
                                <Form.ControlLabel>Wybierz event</Form.ControlLabel>
                                <Form.Control
                                    name="event"
                                    accepter={SelectPicker}
                                    data={availableAction.available_events?.map((e: string) => ({
                                        label: e,
                                        value: e,
                                    })) ?? []}
                                    placeholder="Wybierz event"
                                    block
                                    searchable={false}
                                />
                            </Form.Group>

                            <Form.Group controlId="deviceFunction">
                                <Form.ControlLabel>Wybierz typ</Form.ControlLabel>
                                <Form.Control
                                    name="deviceFunction"
                                    accepter={SelectPicker}
                                    data={availableAction.models?.map((m: string) => ({
                                        label: m,
                                        value: m,
                                    })) ?? []}
                                    placeholder="Wybierz typ urządzenia"
                                    block
                                />
                            </Form.Group>

                            <Form.Group controlId="selectDevice">
                                <Form.ControlLabel>Wybierz urządzenie</Form.ControlLabel>
                                <Form.Control
                                    name="selectDevice"
                                    accepter={SelectPicker}
                                    data={deviceByFunction?.map((d: IDevice) => ({
                                        label: d.name,
                                        value: d.id,
                                    })) ?? []}
                                    placeholder="Wybierz urządzenie"
                                    block
                                />
                            </Form.Group>

                            <Form.Group controlId="action">
                                <Form.ControlLabel>Wybierz akcję</Form.ControlLabel>
                                <Form.Control
                                    name="action"
                                    accepter={SelectPicker}
                                    data={actionSettingsByFunction?.actions.map((a: string) => ({
                                        label: a,
                                        value: a,
                                    })) ?? []}
                                    placeholder="Wybierz akcję"
                                    block
                                />
                            </Form.Group>
                            { !!settings &&
                                <Form.Group controlId="extra_settings">
                                    <Form.ControlLabel>Opcje dodatkowe</Form.ControlLabel>
                                    {Object.entries(settings).map(([key, type]) =>
                                        (renderInputFieldByType(key, type, extraSettingsForm, setExtraSettingsForm)))}
                                </Form.Group>
                            }

                            {errorMsg && (
                                <Message showIcon type="error" className={styles.message}>
                                    {errorMsg}
                                </Message>
                            )}

                            <div className={styles.btnContainer}>
                                <Button
                                    appearance="ghost"
                                    size="lg"
                                    onClick={() => navigate(-1)}
                                    className={styles.btnSecondary}
                                >
                                    Wróć
                                </Button>
                                <Button
                                    appearance="primary"
                                    size="lg"
                                    type="submit"
                                    loading={createMutation.isPending}
                                    className={styles.btnPrimary}
                                    block
                                >
                                    Dodaj akcję
                                </Button>
                            </div>
                        </Form>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
        </PageContainer>
    );
}
