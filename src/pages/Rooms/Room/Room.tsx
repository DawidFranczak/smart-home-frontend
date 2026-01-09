import { useParams } from "react-router-dom";
import {useMemo} from "react";
import getDeviceComponent from "../../../utils/getDeviceCard";
import { IDevice } from "../../../interfaces/IDevice";
import styles from "./Room.module.css";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import useDevicesQuery from "../../../hooks/queries/device/useDevicesQuery.tsx";
import useRoomQuery from "../../../hooks/queries/room/useRoomQuery.tsx";
import DeviceActionPanel from "../../../components/DeviceActionPanel/DeviceActionPanel.tsx";
import { useTranslation } from "react-i18next";
import MEASUREMENT_DEVICE_FUN from "../../../constant/MEASUREMENT_DEVICE_FUN.ts";

export default function Room() {
    const { t } = useTranslation();
    const state = useParams();
    const { room } = useRoomQuery(state.id ? parseInt(state.id) : 0);
    const deviceIds = useMemo(() => room?.device || [], [room?.device]);
    const { devices } = useDevicesQuery(deviceIds);

    if (!room || !devices) {
        return <LoadingAnimation size="xlarge" type="spinner" glow={true} />;
    }
    const measuredDevice:IDevice[] = devices.filter(device => MEASUREMENT_DEVICE_FUN.includes(device.fun));
    const normalDevice:IDevice[] = devices.filter(device => !MEASUREMENT_DEVICE_FUN.includes(device.fun));
    return (
        <PageContainer>
            <PageHeader title={room.name}>
                <div className={styles.buttonContainer}>
                    <DeviceActionPanel
                        buttons={[
                            { label: t("room.editButton"), to: `/room/${state.id}/settings`, type: "primary", tooltip: t("room.editTooltip") },
                            { label: t("room.addDeviceButton"), to: `/room/${state.id}/add`, type: "default", tooltip: t("room.addDeviceTooltip") },
                        ]}
                        showWifi={false}
                    />
                </div>
            </PageHeader>

            {devices?.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>{t("room.emptyState")}</p>
                </div>
            ) : (
                <div className={styles.wrapper}>
                    <div className={`${styles.measurementContainer} ${styles.background}`}>
                        <p className={styles.deviceTitle}>Urządzenia pomiarowe</p>
                        <div className={styles.measurement}>
                            {measuredDevice.map((device: IDevice) => getDeviceComponent(device))}
                        </div>
                    </div>
                    <div className={`${styles.deviceContainer} ${styles.background}`}>
                        <p className={styles.deviceTitle}>Urządzenia</p>
                        <div className={styles.devices}>
                            {normalDevice.map((device: IDevice) => getDeviceComponent(device))}
                        </div>
                    </div>
                </div>
            )}
        </PageContainer>
    );
}