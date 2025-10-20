
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import {Panel, Toggle, Button, Divider, Badge, useToaster,Message} from "rsuite";
import Wheel from "@uiw/react-color-wheel";
import { rgbaToHsva } from "@uiw/color-convert";

import styles from "./AquariumPage.module.css";
import { IAquarium } from "../../../interfaces/IAquarium.tsx";
import useAquariumMutation from "../../../hooks/queries/useAquariumMutation.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import WifiStrength from "../../../components/ui/WiFiStrength/WiFiStrength.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import InputTime from "../../../components/ui/InputTime/InputTime.tsx";
import StyledLink from "../../../components/ui/StyledLink/StyledLink.tsx";
import ButtonContainer from "../../../components/ui/containers/ButtonContainer/ButtonContainer.tsx";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery.tsx";

interface IState {
    aquariumData: IAquarium;
    hsva: { h: number; s: number; v: number; a: number };
}

type IAction =
    | { type: any; payload: any }
    | {
    type: "set/color";
    payload: {
        hsva: { h: number; s: number; v: number; a: number };
        rgb: { r: number; g: number; b: number };
    };
}
    | {
    type: "set/init_value";
    payload: {
        aquariumData: IAquarium;
        hsva: { h: number; s: number; v: number; a: number };
    };
};

const initialState: IState = {
    aquariumData: {} as IAquarium,
    hsva: { h: 0, s: 0, v: 100, a: 1 },
};

function reducer(state: IState, action: IAction) {
    switch (action.type) {
        case "set/init_value":
            return { ...state, ...action.payload };
        case "set/color":
            return {
                ...state,
                aquariumData: {
                    ...state.aquariumData,
                    color_r: action.payload.rgb.r,
                    color_g: action.payload.rgb.g,
                    color_b: action.payload.rgb.b,
                },
                hsva: action.payload.hsva,
            };
        case "set/ledStart":
            return {
                ...state,
                aquariumData: { ...state.aquariumData, led_start: action.payload },
            };
        case "set/ledStop":
            return {
                ...state,
                aquariumData: { ...state.aquariumData, led_stop: action.payload },
            };
        case "set/fluoStart":
            return {
                ...state,
                aquariumData: { ...state.aquariumData, fluo_start: action.payload },
            };
        case "set/fluoStop":
            return {
                ...state,
                aquariumData: { ...state.aquariumData, fluo_stop: action.payload },
            };
        default:
            return state;
    }
}

export default function AquariumPage() {
    const params = useParams();
    const id = params.id ? parseInt(params.id) : 0;
    const { device, isLoading } = useDeviceQuery(id);
    const mutation = useAquariumMutation(id);
    const [state, dispatch] = useReducer(reducer, initialState);
    const aquariumData = device as IAquarium;
    const toaster = useToaster();

    useEffect(() => {
        if (!isLoading && aquariumData)
            dispatch({
                type: "set/init_value",
                payload: {
                    aquariumData,
                    hsva: rgbaToHsva({
                        r: aquariumData.color_r,
                        g: aquariumData.color_g,
                        b: aquariumData.color_b,
                        a: 1,
                    }),
                },
            });
    }, [isLoading, aquariumData]);

    useEffect(() => {
        if (!!mutation.error){
            toaster.push(<Message showIcon closable type="error">Błąd w komunikacji z akwarium.</Message>)
        }else if (!!mutation?.data?.status){
            toaster.push(<Message showIcon closable type="success"> Zapisano dane.</Message>)
        }
    }, [mutation]);

    const handleSaveSettings = (type: string | undefined) => {
        if (type) {
            mutation.mutate({
                ...state.aquariumData,
                [type]: !state.aquariumData[type],
            });
            return;
        }
        mutation.mutate(state.aquariumData);
    };

    if (Object.keys(state.aquariumData).length === 0)
        return <LoadingAnimation size="xlarge" type="spinner" glow={true} />;

    const currentColor = `rgb(${state.aquariumData.color_r}, ${state.aquariumData.color_g}, ${state.aquariumData.color_b})`;

    return (
        <PageContainer className={styles.container}>
            <PageHeader title={state.aquariumData.name}>
                <ButtonContainer>
                    <StyledLink type="fancy" to={`/aquarium/${aquariumData.id}/settings/`}>
                        Ustawienia urządzenia
                    </StyledLink>
                    <WifiStrength
                        size="large"
                        strength={
                            state.aquariumData.is_online ? state.aquariumData.wifi_strength : -100
                        }
                    />
                </ButtonContainer>
            </PageHeader>

            <div className={styles.content}>
                <Panel
                    header={
                        <div className={styles.panelHeader}>
                            <span className={styles.panelIcon}>🎨</span>
                            <span className={styles.panelTitle}>Kolor LED</span>
                            <Badge
                                content={state.aquariumData.led_mode ? "ON" : "OFF"}
                                color={state.aquariumData.led_mode ? "green" : "red"}
                            />
                        </div>
                    }
                    bordered
                    className={styles.panel}
                >
                    <div className={styles.colorSection}>
                        <div className={styles.wheelContainer}>
                            <Wheel
                                color={state.hsva}
                                onChange={(color) => {
                                    dispatch({
                                        type: "set/color",
                                        payload: { hsva: color.hsva, rgb: color.rgb },
                                    });
                                }}
                            />
                        </div>
                        <div className={styles.colorPreview}>
                            <div className={styles.colorPreviewLabel}>Aktualny kolor</div>
                            <div
                                className={styles.colorBox}
                                style={{ backgroundColor: currentColor }}
                            />
                            <div className={styles.colorValues}>
                                <span>R: {state.aquariumData.color_r}</span>
                                <span>G: {state.aquariumData.color_g}</span>
                                <span>B: {state.aquariumData.color_b}</span>
                            </div>
                        </div>
                    </div>
                </Panel>

                <Panel
                    header={
                        <div className={styles.panelHeader}>
                            <span className={styles.panelIcon}>⏰</span>
                            <span className={styles.panelTitle}>Harmonogram oświetlenia</span>
                            <Badge
                                content={state.aquariumData.mode ? "AUTO" : "MANUAL"}
                                color={state.aquariumData.mode ? "blue" : "orange"}
                            />
                        </div>
                    }
                    bordered
                    className={styles.panel}
                >
                    <div className={styles.scheduleGrid}>
                        <div className={styles.scheduleItem}>
                            <label className={styles.scheduleLabel}>
                                <span className={styles.labelIcon}>💡</span>
                                LED - Start
                            </label>
                            <InputTime
                                initialTime={state.aquariumData.led_start}
                                onChange={(data) => dispatch({ type: "set/ledStart", payload: data })}
                                disabled={!state.aquariumData.mode}
                            />
                        </div>

                        <div className={styles.scheduleItem}>
                            <label className={styles.scheduleLabel}>
                                <span className={styles.labelIcon}>💡</span>
                                LED - Stop
                            </label>
                            <InputTime
                                initialTime={state.aquariumData.led_stop}
                                onChange={(data) => dispatch({ type: "set/ledStop", payload: data })}
                                disabled={!state.aquariumData.mode}
                            />
                        </div>

                        <div className={styles.scheduleItem}>
                            <label className={styles.scheduleLabel}>
                                <span className={styles.labelIcon}>🔆</span>
                                Świetlówka - Start
                            </label>
                            <InputTime
                                initialTime={state.aquariumData.fluo_start}
                                onChange={(data) => dispatch({ type: "set/fluoStart", payload: data })}
                                disabled={!state.aquariumData.mode}
                            />
                        </div>

                        <div className={styles.scheduleItem}>
                            <label className={styles.scheduleLabel}>
                                <span className={styles.labelIcon}>🔆</span>
                                Świetlówka - Stop
                            </label>
                            <InputTime
                                initialTime={state.aquariumData.fluo_stop}
                                onChange={(data) => dispatch({ type: "set/fluoStop", payload: data })}
                                disabled={!state.aquariumData.mode}
                            />
                        </div>
                    </div>
                </Panel>

                {/* Sekcja kontroli */}
                <Panel
                    header={
                        <div className={styles.panelHeader}>
                            <span className={styles.panelIcon}>🎛️</span>
                            <span className={styles.panelTitle}>Sterowanie</span>
                        </div>
                    }
                    bordered
                    className={styles.panel}
                >
                    <div className={styles.controlsGrid}>
                        <div className={styles.controlItem}>
                            <div className={styles.controlLabel}>
                                <span className={styles.controlIcon}>🔆</span>
                                <span>Świetlówka</span>
                            </div>
                            <Toggle
                                checked={state.aquariumData.fluo_mode}
                                onChange={() => handleSaveSettings("fluo_mode")}
                                disabled={state.aquariumData.mode}
                                size="lg"
                                checkedChildren="ON"
                                unCheckedChildren="OFF"
                            />
                        </div>

                        <div className={styles.controlItem}>
                            <div className={styles.controlLabel}>
                                <span className={styles.controlIcon}>💡</span>
                                <span>LED</span>
                            </div>
                            <Toggle
                                checked={state.aquariumData.led_mode}
                                onChange={() => handleSaveSettings("led_mode")}
                                disabled={state.aquariumData.mode}
                                size="lg"
                                checkedChildren="ON"
                                unCheckedChildren="OFF"
                            />
                        </div>

                        <Divider className={styles.divider}>Tryb pracy</Divider>

                        <div className={styles.controlItem}>
                            <div className={styles.controlLabel}>
                                <span className={styles.controlIcon}>⚙️</span>
                                <span>Tryb</span>
                            </div>
                            <Toggle
                                checked={state.aquariumData.mode}
                                onChange={() => handleSaveSettings("mode")}
                                size="lg"
                                checkedChildren="AUTO"
                                unCheckedChildren="MANUAL"
                            />
                        </div>
                    </div>
                </Panel>
            </div>

            <div className={styles.actions}>
                <Button
                    appearance="primary"
                    size="lg"
                    onClick={() => handleSaveSettings(undefined)}
                    loading={mutation.isPending}
                    className={styles.saveButton}
                >
                    💾 Zapisz ustawienia
                </Button>
            </div>
        </PageContainer>
    );
}