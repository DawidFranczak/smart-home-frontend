import {useEffect, useState} from "react";
import styles from "./SettingsDevice.module.css";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../../../components/ui/Buttons/Button/Button.tsx";
import TilesContainer from "../../../components/ui/containers/TilesContainer/TilesContainer.tsx";
import Tile from "../../../components/ui/Tile/Tile.tsx";
import ChangeName from "../../../components/ChangeName/ChangeName.tsx";
import Message from "../../../components/ui/Message/Message.tsx";
import ConfirmDelete from "../../../components/ConfirmDelete/ConfirmDelete.tsx";
import useDeviceMutation from "../../../hooks/queries/device/useDeviceMutation.tsx";

export default function SettingsDevice() {
    const params = useParams();
    const id = parseInt(params.id ? params.id : "0");
    const navigate = useNavigate()
    const [changeNameSuccess, setChangeNameSuccess] = useState(false)
    const [deleteFromRoom, setDeleteFromRoom] = useState(false)
    const [deleteDeviceForm, setDeleteDeviceForm] = useState(false)
    const {updateDevice, deleteDevice} = useDeviceMutation();
    const updateMutation = updateDevice(id);
    const deleteMutation = deleteDevice(id);

    useEffect(() => {
        if (updateMutation.isSuccess || deleteMutation.isSuccess) {
            navigate("/", {replace: true});
        }
    }, [updateMutation.isSuccess, deleteMutation.isSuccess, navigate]);

    function handleDeleteFromRoom() {
        updateMutation.mutate({room: null});
    }

    function handleDeleteDevice() {
        deleteMutation.mutate();
    }

    return (
        <PageContainer>
            <PageHeader title="Ustawienia urzadzenia">
                <Message type="success"
                         show={changeNameSuccess}
                         timeout={3000}
                         onTimeout={() => setChangeNameSuccess(false)}
                >
                    Zmiana nazwy powiodła się
                </Message>
                <Button type="fancy" onClick={() => navigate(-1)}>Wróć</Button>
            </PageHeader>
            <TilesContainer>
                <Tile className={styles.changeName}>
                    <ChangeName type="device" id={id} onSuccess={() => setChangeNameSuccess(true)}>Zmień nazwę</ChangeName>
                </Tile>
                <Tile className={styles.tile} type="danger">
                   <div className={styles.delete} onClick={() => setDeleteFromRoom(true)}>Usuń z pokoju</div>
                    <ConfirmDelete name="z pokoju" onConfirm={handleDeleteFromRoom} onCancel={() => setDeleteFromRoom(false)}
                                   show={deleteFromRoom}/>
                </Tile>
                <Tile className={styles.tile} type="danger">
                    <div className={styles.delete} onClick={() => setDeleteDeviceForm(true)}>Usuń urządzenie</div>
                    <ConfirmDelete name="urządzenie" onConfirm={handleDeleteDevice} onCancel={() => setDeleteDeviceForm(false)}
                                   show={deleteDeviceForm}/>
                </Tile>
            </TilesContainer>
        </PageContainer>
    );
}