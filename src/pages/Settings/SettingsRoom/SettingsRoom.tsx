import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import Button from "../../../components/ui/Buttons/Button/Button.tsx";
import {useNavigate, useParams} from "react-router-dom";
import Message from "../../../components/ui/Message/Message.tsx";
import TilesContainer from "../../../components/ui/containers/TilesContainer/TilesContainer.tsx";
import Tile from "../../../components/ui/Tile/Tile.tsx";
import styles from "./SettingsRoom.module.css";
import ChangeName from "../../../components/ChangeName/ChangeName.tsx";
import ConfirmDelete from "../../../components/ConfirmDelete/ConfirmDelete.tsx";
import {useState} from "react";
import useRoomMutation from "../../../hooks/queries/room/useRoomMutation.tsx";
import useRoomQuery from "../../../hooks/queries/room/useRoomQuery.tsx";

export default function SettingsRoom() {
    const params = useParams();
    const id = parseInt(params.id ? params.id : "0");
    const {roomData} = useRoomQuery(id);
    const [changeNameSuccess, setChangeNameSuccess] = useState(false)
    const [deleteRoomForm, setDeleteRoomForm] = useState(false)
    const {deleteRoom , updateRoom} = useRoomMutation();
    const deleteMutation = deleteRoom(id);
    const updateMutation = updateRoom(id);

    const navigate = useNavigate();

    function handleDeleteRoom(){
        deleteMutation.mutate();
    }
    function handleChangeVisibility(){
        const visibility = roomData.visibility === "private" ? "PU" : "PR"
        updateMutation.mutate({visibility});
    }

    return (
        <PageContainer>
            <PageHeader title="Ustawienia pokoju">
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
                    <ChangeName type="room" id={id} onSuccess={() => setChangeNameSuccess(true)}>Zmień nazwę</ChangeName>
                </Tile>
                <Tile className={styles.tile}>
                    <div className={styles.visibility}>
                        <div className={styles.delete} onClick={handleChangeVisibility}>Zmień widoczność</div>
                        <Message show={updateMutation.isSuccess}>Zmieniono widoczność pokoju</Message>
                    </div>
                </Tile>
                <Tile className={styles.tile} type="danger">
                    <div className={styles.delete} onClick={() => setDeleteRoomForm(true)}>Usuń pokój</div>
                    <ConfirmDelete name="z pokoju" onConfirm={handleDeleteRoom} onCancel={() => setDeleteRoomForm(false)}
                                   show={deleteRoomForm}/>
                </Tile>
            </TilesContainer>
        </PageContainer>
    )
}