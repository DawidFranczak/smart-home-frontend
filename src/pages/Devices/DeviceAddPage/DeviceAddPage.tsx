import {useNavigate, useParams} from "react-router-dom";
import { Panel, Button, Message, toaster, List } from "rsuite";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation";
import useUnassignedDeviceQuery from "../../../hooks/queries/useUnassignedDeviceQuery.tsx";
import useUnassignedDeviceMutation from "../../../hooks/queries/useUnassignedDeviceMutation.tsx";
import { IDevice } from "../../../interfaces/IDevice.tsx";
import styles from "./DeviceAddPage.module.css";

export default function DeviceAddPage() {
    const params = useParams();
    const roomId = parseInt(params.id || "0");
    const { status, unassignedDeviceData } = useUnassignedDeviceQuery();
    const { selectDevice } = useUnassignedDeviceMutation();
    const mutation = selectDevice();
    const navigate = useNavigate();

    const handleAddDevice = async (deviceId: number, deviceName: string) => {
        try {
            await mutation.mutateAsync({ deviceId, roomId });
            toaster.push(
                <Message closable type="success" showIcon>
                    Urządzenie {deviceName} zostało przypisane do pokoju
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        } catch (error) {
            toaster.push(
                <Message closable type="error" showIcon>
                    Błąd podczas przypisywania urządzenia
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        }
    };

    if (!unassignedDeviceData) {
        return <LoadingAnimation size="xlarge" type="spinner" glow={true} />;
    }

    return (
        <PageContainer className={styles.container}>
            <PageHeader title="Przypisz urządzenie" className={styles.headers}>
                <div>
                    <Button appearance="default"  onClick={() => navigate(-1)}>
                        Wróć
                    </Button>
                </div>
            </PageHeader>
            <div className={styles.content}>
                {(status === 404 || unassignedDeviceData.length === 0) && <p className={styles.noDevices}>Brak nowo dodanych urządzeń</p>}
                {status === 200 && unassignedDeviceData?.length > 0 && (
                    <Panel
                        header={
                            <div className={styles.panelHeader}>
                                <span className={styles.panelIcon}>📱</span>
                                <span className={styles.panelTitle}>Dostępne urządzenia</span>
                            </div>
                        }
                        bordered
                        className={styles.panel}
                    >
                        <List>
                            {unassignedDeviceData.map((device: IDevice) => (
                                <List.Item key={device.id} className={styles.deviceItem}>
                                    <div className={styles.deviceRow}>
                                        <div className={styles.deviceInfo}>
                                            <span className={styles.deviceName}>{device.name}</span>
                                            <span className={styles.deviceFun}>{device.fun || "N/A"}</span>
                                            <span className={styles.deviceLastSeen}>
                                            {device.last_seen
                                                ? new Date(device.last_seen).toLocaleTimeString("pl-PL", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })
                                                : "Nigdy"}
                                          </span>
                                        </div>
                                        <Button
                                            appearance="primary"
                                            size="lg"
                                            onClick={() => handleAddDevice(device.id, device.name)}
                                            className={styles.assignButton}
                                        >
                                            Przypisz
                                        </Button>
                                    </div>
                                </List.Item>
                            ))}
                        </List>
                    </Panel>
                )}
            </div>
        </PageContainer>
    );
}