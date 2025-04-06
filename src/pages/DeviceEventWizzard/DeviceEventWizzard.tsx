import { useParams } from "react-router-dom";
import useAvailableActionQuery from "../../hooks/queries/useAvailableActionQuery";
import DeviceEventDisplay from "../../components/DeviceEventDisplay/DeviceEventDisplay";
import styles from "./DeviceEventWizzard.module.css";
import { useState } from "react";
import Button from "../../ui/Button/Button";
import AddEventForm from "../../components/AddEventForm/AddEventForm";
import IEvent from "../../interfaces/IEvent";
import Delete from "/static/svg/delete.svg";
import ConfirmDelete from "../../components/ConfirmDelete/ConfirmDelete";
import useEventMutation from "../../hooks/queries/useEventMutation";
import BackArrow from "../../ui/BackArrow/BackArrow";

export default function DeviceEventWizzard() {
  const params = useParams();
  const device_id = parseInt(params.id ? params.id : "0");
  const [displayAddForm, setDisplayAddForm] = useState(false);
  const [displayDeleteConfirm, setDisplayDeleteConfirm] = useState(false);
  const [eventId, setEventId] = useState(0);
  const { availableAction } = useAvailableActionQuery(
    device_id,
    params.deviceFun ? params.deviceFun : ""
  );
  const { deleteEvent } = useEventMutation();
  const deleteMutation = deleteEvent(device_id, eventId);

  if (!availableAction) return null;
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <BackArrow className={styles.backArrow} />
        {availableAction.active_events?.length === 0 && <p>Brak akcji</p>}
        {availableAction.active_events?.map((event: IEvent) => (
          <div key={`${event.id} div`} className={styles.eventBox}>
            <DeviceEventDisplay
              key={`${event.id} DE`}
              action={event.action}
              device={event.device}
              event={event.event}
            />
            <img
              key={`${event.id} img`}
              src={Delete}
              alt="Wifi"
              width="24"
              height="24"
              className={styles.deleteIcon}
              onClick={() => {
                setDisplayDeleteConfirm(true);
                setEventId(event.id);
              }}
            />
          </div>
        ))}
        {displayDeleteConfirm && (
          <ConfirmDelete
            onCancel={() => setDisplayDeleteConfirm(false)}
            onConfirm={() => {
              deleteMutation.mutate();
              setDisplayDeleteConfirm(false);
            }}
            className={styles.confirmDelete}
            name="akcje"
          />
        )}
        <Button
          callback={() => {
            setDisplayAddForm(true);
          }}
        >
          Dodaj akcje
        </Button>
        {displayAddForm && (
          <AddEventForm
            availableEvent={availableAction.available_events}
            availableDeviceModels={availableAction.models}
            device_id={device_id}
            onClose={() => {
              setDisplayAddForm(false);
            }}
          />
        )}
      </section>
    </div>
  );
}
