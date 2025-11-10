
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
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import InputTime from "../../../components/ui/InputTime/InputTime.tsx";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery.tsx";
import DeviceActionPanel from "../../../components/DeviceActionPanel/DeviceActionPanel.tsx";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation();

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
        if (mutation.isError){
            toaster.push(<Message showIcon closable type="error">{t("aquariumPage.communicationError")}</Message>)
        }else if (mutation.isSuccess){
            toaster.push(<Message showIcon closable type="success">{t("aquariumPage.savedMessage")}</Message>)
        }
    }, [mutation.isError,mutation.isSuccess]);

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
                <DeviceActionPanel
                    buttons={[
                        { label: t("buttons.deviceSettings"), to: `/aquarium/${state.aquariumData.id}/settings/`, type: "default", tooltip: t("buttons.deviceSettingsTooltip") }
                    ]}
                    wifiStrength={state.aquariumData.is_online ? state.aquariumData.wifi_strength : -100}
                    showWifi={true}
                />
            </PageHeader>

            <div className={styles.content}>
                <Panel
                    header={
                        <div className={styles.panelHeader}>
                            <span className={styles.panelIcon}>🎨</span>
                            <span className={styles.panelTitle}>{t("aquariumPage.ledColor")}</span>
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
                            <div className={styles.colorPreviewLabel}>{t("aquariumPage.currentColor")}</div>
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
                            <span className={styles.panelTitle}>{t("aquariumPage.lightingSchedule")}</span>
                            <Badge
                                content={state.aquariumData.mode ? t("aquariumPage.auto") : t("aquariumPage.manual")}
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
                                {t("aquariumPage.ledStart")}
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
                                {t("aquariumPage.ledStop")}
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
                                {t("aquariumPage.fluoStart")}
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
                                {t("aquariumPage.fluoStop")}
                            </label>
                            <InputTime
                                initialTime={state.aquariumData.fluo_stop}
                                onChange={(data) => dispatch({ type: "set/fluoStop", payload: data })}
                                disabled={!state.aquariumData.mode}
                            />
                        </div>
                    </div>
                </Panel>

                <Panel
                    header={
                        <div className={styles.panelHeader}>
                            <span className={styles.panelIcon}>🎛️</span>
                            <span className={styles.panelTitle}>{t("aquariumPage.controls")}</span>
                        </div>
                    }
                    bordered
                    className={styles.panel}
                >
                    <div className={styles.controlsGrid}>
                        <div className={styles.controlItem}>
                            <div className={styles.controlLabel}>
                                <span className={styles.controlIcon}>🔆</span>
                                <span>{t("aquariumPage.fluorescent")}</span>
                            </div>
                            <Toggle
                                checked={state.aquariumData.fluo_mode}
                                onChange={() => handleSaveSettings("fluo_mode")}
                                disabled={state.aquariumData.mode}
                                size="lg"
                                checkedChildren={t("aquariumPage.on")}
                                unCheckedChildren={t("aquariumPage.off")}
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
                                checkedChildren={t("aquariumPage.on")}
                                unCheckedChildren={t("aquariumPage.off")}
                            />
                        </div>

                        <Divider className={styles.divider}>{t("aquariumPage.mode")}</Divider>

                        <div className={styles.controlItem}>
                            <div className={styles.controlLabel}>
                                <span className={styles.controlIcon}>⚙️</span>
                                <span>{t("aquariumPage.mode")}</span>
                            </div>
                            <Toggle
                                checked={state.aquariumData.mode}
                                onChange={() => handleSaveSettings("mode")}
                                size="lg"
                                checkedChildren={t("aquariumPage.auto")}
                                unCheckedChildren={t("aquariumPage.manual")}
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
                    💾 {t("aquariumPage.saveSettings")}
                </Button>
            </div>
        </PageContainer>
    );
}