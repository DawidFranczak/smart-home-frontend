import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { Panel, NumberInput, Slider, Button, Message, useToaster, Badge } from "rsuite";
import styles from "./StairsPage.module.css";

import {useTranslation} from "react-i18next";
import {IStairs} from "../../interfaces/IStairs.tsx";
import useDeviceQuery from "../../hooks/queries/device/useDeviceQuery.tsx";
import LoadingAnimation from "../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../components/ui/Headers/PageHeader/PageHeader.tsx";
import DeviceActionPanel from "../../components/DeviceActionPanel/DeviceActionPanel.tsx";
import useStairsMutation from "../../hooks/queries/useStairsMutation.tsx";

function reducer(state: IStairs, action: { type: string; payload: any }) {
    switch (action.type) {
        case "INIT_DATA":
            return { ...state, ...action.payload };
        case "set/light_count":
            return { ...state, light_count: action.payload };
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

export default function StairsPage() {
    const { t } = useTranslation();
    const params = useParams();
    const stairsId = parseInt(params.id ?? "0");
    const { device, isLoading } = useDeviceQuery(stairsId);
    const toaster = useToaster();
    const [state, dispatch] = useReducer(reducer, null);
    const stairsData = device as IStairs;
    const { updateStairs } = useStairsMutation();
    const updateMutate = updateStairs(stairsId);

    useEffect(() => {
        if (stairsData) dispatch({ type: "INIT_DATA", payload: stairsData });
    }, [stairsData]);

    useEffect(() => {
        if (updateMutate.isSuccess)
            toaster.push(<Message type="success" closable>💾 {t("message.success")}</Message>);
        if (updateMutate.isError)
            toaster.push(<Message type="error" closable>{t("message.error")}</Message>);
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
                        { label: t("buttons.deviceSettings"), to: `/light/${state.id}/settings/`, type: "default", tooltip: t("buttons.deviceSettingsTooltip")}
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
                            <span className={styles.panelTitle}>{t("stairsPage.settings")}</span>
                            <Badge content={state.is_online ? "ONLINE" : "OFFLINE"} color={state.is_online ? "green" : "red"} />
                        </div>
                    }
                    bordered
                    className={styles.panel}
                >
                    <div className={styles.rangeGroup}>
                        <label className={styles.label}>
                            {t("lampPage.brightness")}: <strong>{state.brightness}%</strong>
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
                            {t("lampPage.speed")}: <strong>{state.step}%</strong>
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
                        <label className={styles.label}>{t("lampPage.lightingTime")}</label>
                        <NumberInput
                            min={0}
                            value={state.lighting_time}
                            onChange={(val) =>
                                dispatch({ type: "set/lighting_time", payload: val })
                            }
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>{t("stairsPage.lightCount")}</label>
                        <NumberInput
                            min={0}
                            max={16}
                            value={state.light_count}
                            onChange={(val) =>
                                dispatch({ type: "set/light_count", payload: val })
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
                    💾 {t("buttons.saveButton")}
                </Button>
            </div>
        </PageContainer>
    );
}
