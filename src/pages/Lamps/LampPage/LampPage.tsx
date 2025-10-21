import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { Panel, InputNumber, Slider, Button, Message, useToaster, Divider, Badge } from "rsuite";
import styles from "./LampPage.module.css";

import { ILamp } from "../../../interfaces/ILamp";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer";
import useLampMutation from "../../../hooks/queries/useLampMutation";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation";
import DeviceActionPanel from "../../../components/DeviceActionPanel/DeviceActionPanel.tsx";

function reducer(state: ILamp, action: { type: string; payload: any }) {
    switch (action.type) {
        case "INIT_DATA":
            return { ...state, ...action.payload };
        case "set/light_start":
            return { ...state, light_start: action.payload };
        case "set/light_stop":
            return { ...state, light_stop: action.payload };
        case "set/brightness":
            return { ...state, brightness: action.payload };
        case "set/lighting_time":
            return { ...state, lighting_time: action.payload };
        case "set/step":
            return { ...state, step: action.payload };
        default:
            return state;
    }
}

export default function LampPage() {
    const params = useParams();
    const lampId = parseInt(params.id ?? "0");
    const { device, isLoading } = useDeviceQuery(lampId);
    const { updateLamp } = useLampMutation();
    const updateMutate = updateLamp(lampId);
    const toaster = useToaster();
    const [state, dispatch] = useReducer(reducer, null);
    const lampData = device as ILamp;

    useEffect(() => {
        if (lampData) dispatch({ type: "INIT_DATA", payload: lampData });
    }, [lampData]);

    useEffect(() => {
        if (updateMutate.isSuccess)
            toaster.push(<Message type="success" closable>💾 Dane zapisane pomyślnie.</Message>);
        if (updateMutate.isError)
            toaster.push(<Message type="error" closable>❌ Błąd podczas zapisu danych.</Message>);
    }, [updateMutate.isSuccess, updateMutate.isError]);

    if (!state || isLoading) return <LoadingAnimation size="xlarge" type="spinner" glow={true} />;

    const handleSave = () => {
        updateMutate.mutate(state);
    };

    return (
        <PageContainer className={styles.container}>
            <PageHeader title={state.name}>
                <DeviceActionPanel
                    buttons={[
                        { label: "Ustawienia urządzenia", to: `/lamp/${state.id}/settings/`, type: "default", tooltip: "Zmień ustawienia przycisku" }
                    ]}
                    wifiStrength={state.is_online ? state.wifi_strength : -100}
                    showWifi={true}
                />
            </PageHeader>
            <div className={styles.content}>
                <Panel
                    header={
                        <div className={styles.panelHeader}>
                            <span className={styles.panelIcon}>💡</span>
                            <span className={styles.panelTitle}>Harmonogram lampy</span>
                            <Badge content={state.is_online ? "ONLINE" : "OFFLINE"} color={state.is_online ? "green" : "red"} />
                        </div>
                    }
                    bordered
                    className={styles.panel}
                >
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Godzina rozpoczęcia</label>
                        <input
                            type="time"
                            value={state.light_start}
                            onChange={(e) =>
                                dispatch({ type: "set/light_start", payload: e.target.value })
                            }
                            className={styles.timeInput}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Godzina zakończenia</label>
                        <input
                            type="time"
                            value={state.light_stop}
                            onChange={(e) =>
                                dispatch({ type: "set/light_stop", payload: e.target.value })
                            }
                            className={styles.timeInput}
                        />
                    </div>

                    <Divider>Parametry oświetlenia</Divider>

                    <div className={styles.rangeGroup}>
                        <label className={styles.label}>
                            Jasność: <strong>{state.brightness}%</strong>
                        </label>
                        <Slider
                            progress
                            min={0}
                            max={100}
                            value={state.brightness}
                            onChange={(val) => dispatch({ type: "set/brightness", payload: val })}
                        />
                    </div>

                    <div className={styles.rangeGroup}>
                        <label className={styles.label}>
                            Szybkość zmian: <strong>{state.step}%</strong>
                        </label>
                        <Slider
                            progress
                            min={0}
                            max={100}
                            value={state.step}
                            onChange={(val) => dispatch({ type: "set/step", payload: val })}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Czas świecenia (s)</label>
                        <InputNumber
                            min={0}
                            value={state.lighting_time}
                            onChange={(val) =>
                                dispatch({ type: "set/lighting_time", payload: val })
                            }
                            style={{ width: "100%" }}
                        />
                    </div>
                </Panel>
            </div>

            <div className={styles.actions}>
                <Button
                    appearance="primary"
                    size="lg"
                    loading={updateMutate.isPending}
                    onClick={handleSave}
                    className={styles.saveButton}
                >
                    💾 Zapisz ustawienia
                </Button>
            </div>
        </PageContainer>
    );
}
