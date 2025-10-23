import { useState } from "react";
import { Modal, Button, Input, Radio, Message, Divider } from "rsuite";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";
import { api } from "../../constant/api";
import { ICustomError } from "../../interfaces/ICustomError";
import styles from "./AddRoom.module.css";

interface AddRoomProps {
    show: boolean;
    onClose: () => void;
}

interface RoomData {
    name: string;
    visibility: string;
}

export default function AddRoom({ show, onClose }: AddRoomProps) {
    const queryClient = useQueryClient();
    const [roomData, setRoomData] = useState<RoomData>({ name: "", visibility: "public" });
    const { createData } = useFetch();

    const mutation = useMutation({
        mutationFn: (roomData: RoomData) => createData(api.room, roomData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            setRoomData({ name: "", visibility: "public" });
            onClose();
        },
    });

    const handleNameChange = (value: string) => {
        setRoomData({ ...roomData, name: value });
    };

    const handleVisibilityChange = (value: string) => {
        setRoomData({ ...roomData, visibility: value });
    };

    const handleAdd = () => {
        mutation.mutate(roomData);
    };

    const handleCancel = () => {
        mutation.reset();
        onClose();
    };

    const errors = mutation.error as ICustomError;

    return (
        <Modal
            open={show}
            onClose={handleCancel}
            size="sm"
            className={styles.modal}
            backdrop="static"
        >
            <Modal.Header>
                <Modal.Title className={styles.modalTitle}>🏠 Dodaj nowy pokój</Modal.Title>
            </Modal.Header>

            <Modal.Body className={styles.modalBody}>
                <Input
                    placeholder="Nazwa pokoju"
                    value={roomData.name}
                    onChange={handleNameChange}
                    size="lg"
                    className={styles.input}
                />

                {errors?.details?.name && (
                    <Message showIcon type="error">
                        {errors.details.name[0]}
                    </Message>
                )}

                <Divider className={styles.divider} />

                <Radio
                    name="visibility"
                    value="public"
                    checked={roomData.visibility === "public"}
                    onChange={() => handleVisibilityChange("public")}
                >
                    Ogólny
                </Radio>
                <Radio
                    name="visibility"
                    value="private"
                    checked={roomData.visibility === "private"}
                    onChange={() => handleVisibilityChange("private")}
                >
                    Prywatny
                </Radio>

                {errors?.details?.visibility && (
                    <Message showIcon type="error">
                        {errors.details.visibility[0]}
                    </Message>
                )}
            </Modal.Body>

            <Modal.Footer className={styles.modalFooter}>
                <Button onClick={handleCancel} appearance="subtle" size="lg">
                    Anuluj
                </Button>
                <Button onClick={handleAdd} appearance="primary" size="lg" >
                    Dodaj pokój
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
