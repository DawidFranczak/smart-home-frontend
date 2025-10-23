import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Panel,
    Input,
    InputGroup,
    Button,
    Modal,
    toaster,
    Message,
    Divider,
    List,
    Toggle,
    SelectPicker
} from "rsuite";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation";
import WifiStrength from "../../../components/ui/WiFiStrength/WiFiStrength";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery";
import useDeviceMutation from "../../../hooks/queries/device/useDeviceMutation";
import styles from "./SettingsDevice.module.css";
import usePrefetchRoomQuery from "../../../hooks/queries/room/usePrefetchRoomQuery.tsx";
import useFavouriteMutation from "../../../hooks/queries/useFavouriteMutation.tsx";

export default function SettingsDevice() {
    const params = useParams();
    const navigate = useNavigate();
    const id = parseInt(params.id || "0");

    const { device, isLoading } = useDeviceQuery(id);
    const { updateDevice, deleteDevice } = useDeviceMutation();
    const { roomData } = usePrefetchRoomQuery();

    const updateMutation = updateDevice(id);
    const deleteMutation = deleteDevice(id);
    const favouriteMutation = useFavouriteMutation(()=>{console.log("favourite")});
    const [deviceName, setDeviceName] = useState(device?.name || "");
    const [selectedRoom, setSelectedRoom] = useState<number | null>(device?.room || null);
    const [isFavourite, setIsFavourite] = useState(device?.is_favourite || false);

    const [showRemoveFromRoomModal, setShowRemoveFromRoomModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // Update state when device data loads
    useState(() => {
        if (device) {
            setDeviceName(device.name);
            setSelectedRoom(device.room);
            setIsFavourite(device.is_favourite);
        }
    });

    const handleSaveName = async () => {
        if (!deviceName.trim()) {
            toaster.push(
                <Message closable type="warning" showIcon >
                    Nazwa nie może być pusta
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
            return;
        }

        setIsUpdating(true);
        try {
            await updateMutation.mutateAsync({ name: deviceName });
            toaster.push(
                <Message closable type="success" showIcon>
                    Nazwa urządzenia została zaktualizowana
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        } catch (error) {
            toaster.push(
                <Message closable type="error" showIcon>
                    Błąd podczas aktualizacji nazwy
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        } finally {
            setIsUpdating(false);
        }
    };

    const handleRoomChange = async (roomId: number | null) => {
        setSelectedRoom(roomId);
        try {
            await updateMutation.mutateAsync({ room: roomId });
            toaster.push(
                <Message closable type="success" showIcon>
                    {roomId ? "Przypisano do pokoju" : "Usunięto z pokoju"}
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        } catch (error) {
            toaster.push(
                <Message closable type="error" showIcon>
                    Błąd podczas zmiany pokoju
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
            setSelectedRoom(device?.room || null);
        }
    };

    const handleFavouriteToggle = async (checked: boolean) => {
        setIsFavourite(checked);
        console.log("favourite",checked)
        try {
            await favouriteMutation.mutateAsync({id: id, is_favourite: !checked, type:"device"});
            toaster.push(
                <Message closable type="success" showIcon>
                    {checked ? "Dodano do ulubionych" : "Usunięto z ulubionych"}
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        } catch (error) {
            toaster.push(
                <Message closable type="error" showIcon>
                    Błąd podczas zmiany ulubionych
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
            setIsFavourite(device?.is_favourite || false);
        }
    };

    const handleRemoveFromRoom = async () => {
        setShowRemoveFromRoomModal(false);
        try {
            await updateMutation.mutateAsync({ room: null });
            setSelectedRoom(null);
            toaster.push(
                <Message closable type="success" showIcon>
                    Urządzenie usunięte z pokoju
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
            navigate("/device");
        } catch (error) {
            toaster.push(
                <Message closable type="error" showIcon>
                    Błąd podczas usuwania z pokoju
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        }
    };

    const handleDeleteDevice = async () => {
        setShowDeleteModal(false);
        try {
            await deleteMutation.mutateAsync();
            toaster.push(
                <Message closable type="success" showIcon>
                    Urządzenie zostało usunięte
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
            navigate("/device");
        } catch (error) {
            toaster.push(
                <Message closable type="error" showIcon>
                    Błąd podczas usuwania urządzenia
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        }
    };

    if (isLoading || !device) {
        return <LoadingAnimation size="xlarge" type="spinner" glow={true} />;
    }

    const roomOptions = roomData?.map((room: any) => ({
        label: room.name,
        value: room.id,
    })) || [];

    const formatLastSeen = (dateString: string) => {
        if (!dateString) return "Nigdy";
        const date = new Date(dateString);
        return date.toLocaleString("pl-PL");
    };

    return (
        <PageContainer className={styles.container}>
            <PageHeader title="Ustawienia urządzenia">
                <WifiStrength
                    size="large"
                    strength={device.is_online ? device.wifi_strength : -100}
                />
            </PageHeader>

            <div className={styles.content}>
                <Panel
                    header={
                        <div className={styles.panelHeader}>
                            <span className={styles.panelIcon}>ℹ️</span>
                            <span className={styles.panelTitle}>Informacje podstawowe</span>
                        </div>
                    }
                    bordered
                    className={styles.panel}
                >
                    <List>
                        <List.Item className={styles.infoItem}>
                            <span className={styles.infoLabel}>Typ:</span>
                            <span className={styles.infoValue}>{device.fun || "N/A"}</span>
                        </List.Item>
                        <List.Item className={styles.infoItem}>
                            <span className={styles.infoLabel}>Status:</span>
                            <span className={`${styles.infoValue} ${device.is_online ? styles.online : styles.offline}`}>
                                {device.is_online ? "🟢 Online" : "🔴 Offline"}
                              </span>
                        </List.Item>
                        <List.Item className={styles.infoItem}>
                            <span className={styles.infoLabel}>Siła WiFi:</span>
                            <span className={styles.infoValue}>{device.wifi_strength || "N/A"} dBm</span>
                        </List.Item>
                        <List.Item className={styles.infoItem}>
                            <span className={styles.infoLabel}>Ostatnio widziane:</span>
                            <span className={styles.infoValue}>{formatLastSeen(device.last_seen)}</span>
                        </List.Item>
                    </List>
                </Panel>

                <Panel
                    header={
                        <div className={styles.panelHeader}>
                            <span className={styles.panelIcon}>⚙️</span>
                            <span className={styles.panelTitle}>Konfiguracja</span>
                        </div>
                    }
                    bordered
                    className={styles.panel}
                >
                    <div className={styles.configSection}>
                        <label className={styles.configLabel}>📝 Nazwa urządzenia</label>
                        <div className={styles.nameSection}>
                            <InputGroup className={styles.inputGroup}>
                                <Input
                                    value={deviceName}
                                    onChange={setDeviceName}
                                    placeholder="Wprowadź nazwę urządzenia"
                                    size="lg"
                                />
                            </InputGroup>
                            <Button
                                appearance="primary"
                                size="lg"
                                onClick={handleSaveName}
                                loading={isUpdating}
                                className={styles.saveButton}
                            >
                                Zapisz
                            </Button>
                        </div>
                    </div>

                    <Divider className={styles.divider} />

                    <div className={styles.configSection}>
                        <label className={styles.configLabel}>🏠 Przypisanie do pokoju</label>
                        <SelectPicker
                            data={roomOptions}
                            value={selectedRoom}
                            onChange={handleRoomChange}
                            placeholder="Wybierz pokój"
                            size="lg"
                            block
                            searchable={false}
                            cleanable
                            className={styles.roomPicker}
                        />
                    </div>

                    <Divider className={styles.divider} />

                    <div className={styles.configSection}>
                        <div className={styles.toggleSection}>
                            <div className={styles.toggleInfo}>
                                <label className={styles.configLabel}>⭐ Ulubione</label>
                                <p className={styles.configDesc}>
                                    Oznacz urządzenie jako ulubione, aby łatwiej je znaleźć
                                </p>
                            </div>
                            <Toggle
                                checked={isFavourite}
                                onChange={handleFavouriteToggle}
                                size="lg"
                                checkedChildren="TAK"
                                unCheckedChildren="NIE"
                            />
                        </div>
                    </div>
                </Panel>

                <Panel
                    header={
                        <div className={styles.panelHeader}>
                            <span className={styles.panelIcon}>🛠️</span>
                            <span className={styles.panelTitle}>Akcje zaawansowane</span>
                        </div>
                    }
                    bordered
                    className={styles.panel}
                >
                    <div className={styles.actionsSection}>
                        {device.room && (
                            <>
                                <div className={styles.actionItem}>
                                    <div className={styles.actionInfo}>
                                        <h4 className={styles.actionTitle}>🚪 Usuń z pokoju</h4>
                                        <p className={styles.actionDesc}>
                                            Usuń urządzenie z przypisanego pokoju
                                        </p>
                                    </div>
                                    <Button
                                        appearance="ghost"
                                        size="lg"
                                        onClick={() => setShowRemoveFromRoomModal(true)}
                                        className={styles.removeButton}
                                    >
                                        Usuń z pokoju
                                    </Button>
                                </div>
                                <Divider className={styles.divider} />
                            </>
                        )}

                        <div className={styles.actionItem}>
                            <div className={styles.actionInfo}>
                                <h4 className={styles.actionTitle}>🗑️ Usuń urządzenie</h4>
                                <p className={styles.actionDesc}>
                                    Trwale usuń urządzenie z systemu. Tej operacji nie można cofnąć.
                                </p>
                            </div>
                            <Button
                                appearance="ghost"
                                color="red"
                                size="lg"
                                onClick={() => setShowDeleteModal(true)}
                                className={styles.deleteButton}
                            >
                                Usuń urządzenie
                            </Button>
                        </div>
                    </div>
                </Panel>
            </div>

            <Modal
                open={showRemoveFromRoomModal}
                onClose={() => setShowRemoveFromRoomModal(false)}
                size="xs"
                className={styles.modal}
            >
                <Modal.Header>
                    <Modal.Title className={styles.modalTitle}>
                        🚪 Potwierdź usunięcie z pokoju
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <p>Czy na pewno chcesz usunąć urządzenie <strong>{device.name}</strong> z pokoju?</p>
                    <p className={styles.modalNote}>Będziesz mógł przypisać je ponownie później.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleRemoveFromRoom} appearance="primary">
                        Tak, usuń z pokoju
                    </Button>
                    <Button onClick={() => setShowRemoveFromRoomModal(false)} appearance="subtle">
                        Anuluj
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                size="xs"
                className={styles.modalDanger}
            >
                <Modal.Header>
                    <Modal.Title className={styles.modalTitle}>
                        ⚠️ Potwierdź usunięcie
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <p>Czy na pewno chcesz usunąć urządzenie <strong>{device.name}</strong>?</p>
                    <p className={styles.modalWarning}>
                        ⚠️ Ta operacja jest <strong>nieodwracalna</strong>. Wszystkie dane urządzenia zostaną trwale usunięte.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDeleteDevice} appearance="primary" color="red">
                        Tak, usuń urządzenie
                    </Button>
                    <Button onClick={() => setShowDeleteModal(false)} appearance="subtle">
                        Anuluj
                    </Button>
                </Modal.Footer>
            </Modal>
        </PageContainer>
    );
}