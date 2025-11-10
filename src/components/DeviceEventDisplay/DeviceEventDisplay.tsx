import { useState } from "react";
import { Panel, Loader } from "rsuite";
import DeleteIcon from "/static/svg/delete.svg";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import IEvent from "../../interfaces/IEvent";
import useEventMutation from "../../hooks/queries/useEventMutation";
import styles from "./DeviceEventDisplay.module.css";

interface IDeviceEventProps {
    event: IEvent;
}

export default function DeviceEventCard({ event }: IDeviceEventProps) {
    const [displayDeleteConfirm, setDisplayDeleteConfirm] = useState(false);
    const { deleteEvent } = useEventMutation();
    const deleteMutation = deleteEvent(1, event.id);
    return (
        <Panel shaded bordered className={styles.card}>
            <div className={styles.header}>
                <span className={styles.title}>
                  {event.event} - {event.action} - {event.device}
                </span>
                {Object.entries(event.extra_settings)
                    .map(([key, value]:[string,any]) => (
                        <span className={styles.extraSettings}>
                            {key}: {value.toString()}
                        </span>
                    ))}
                <img
                    src={DeleteIcon}
                    alt="Usuń"
                    className={styles.deleteIcon}
                    onClick={() => setDisplayDeleteConfirm(true)}
                />
            </div>

            {deleteMutation.isPending && (
                <Loader size="sm" content="Usuwanie..." className={styles.loader} />
            )}
            <ConfirmDelete
                show={displayDeleteConfirm}
                name="akcję"
                onCancel={() => setDisplayDeleteConfirm(false)}
                onConfirm={() => {
                    deleteMutation.mutate();
                    setDisplayDeleteConfirm(false);
                }}
            />
        </Panel>
    );
}
