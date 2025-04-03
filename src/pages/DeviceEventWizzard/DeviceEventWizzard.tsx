import { useParams } from "react-router-dom";
import useAvailableActionQuery from "../../hooks/queries/useAvailableActionQuery";
import DeviceEventDisplay from "../../components/DeviceEventDisplay/DeviceEventDisplay";
import styles from "./DeviceEventWizzard.module.css";
import { useState } from "react";
import Button from "../../ui/Button/Button";
import AddEventForm from "../../components/AddEventForm/AddEventForm";
export default function DeviceEventWizzard() {
  const params = useParams();
  const device_id = parseInt(params.id ? params.id : "0");
  const [displayAddForm, setDisplayAddForm] = useState(false);
  const { availableAction } = useAvailableActionQuery(
    device_id,
    params.deviceFun ? params.deviceFun : ""
  );
  console.log(availableAction);
  if (!availableAction) return null;
  return (
    <div className={styles.container}>
      {availableAction.active_events?.map((event) => (
        <DeviceEventDisplay
          key={event.id}
          action={event.action}
          device={event.device}
          event={event.event}
        />
      ))}
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
        />
      )}
    </div>
  );
}
