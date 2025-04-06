import { useEffect, useState } from "react";
import Button from "../../ui/Button/Button";
import styles from "./AddEventForm.module.css";
import useDeviceByFunctionQuery from "../../hooks/queries/useDeviceByFunctionQuery";
import { IDevice } from "../../interfaces/IDevice";
import useActionByFunctionQuery from "../../hooks/queries/useActionByFunctionQuery";
import useEventMutation from "../../hooks/queries/useEventMutation";
import ButtonContainer from "../../ui/ButtonContainer/ButtonContainer";
import Message from "../../ui/Message/Message";
interface AddEventFormProps {
  availableEvent: string[];
  availableDeviceModels: string[];
  device_id: number;
  onClose: () => void;
}
export default function AddEventForm({
  availableEvent,
  availableDeviceModels,
  device_id,
  onClose,
}: AddEventFormProps) {
  const [deviceFunction, setDeviceFunction] = useState("");
  const [event, setEvent] = useState("");
  const [action, setAction] = useState("");
  const [selectDevice, setSelectDevice] = useState(0);
  const [error, setError] = useState(false);
  const { deviceByFunction } = useDeviceByFunctionQuery(deviceFunction);
  const { actionByFunction } = useActionByFunctionQuery(deviceFunction);
  const { createEvent } = useEventMutation();
  const createMutation = createEvent(device_id);

  useEffect(() => {
    if (createMutation.isSuccess) {
      onClose();
    }
  }, [createMutation.isSuccess]);
  function handleSubmit() {
    if (!event || !deviceFunction || !selectDevice || !action) {
      setError(true);
      return;
    }
    const data = {
      target_device: selectDevice,
      action: action,
      device: device_id,
      event: event,
      extra_settings: {},
    };
    createMutation.mutate(data);
  }
  return (
    <div className={styles.container}>
      <div className={styles.addEventForm}>
        <select onChange={(e) => setEvent(e.target.value)}>
          <option>Wybierz event</option>
          {availableEvent.map((event, index) => (
            <option key={index}>{event}</option>
          ))}
        </select>
        <select onChange={(e) => setDeviceFunction(e.target.value)}>
          <option>Wybierz typ</option>
          {availableDeviceModels.map((device, index) => (
            <option key={index}>{device}</option>
          ))}
        </select>
        <select
          onChange={(e) =>
            setSelectDevice(parseInt(e.target.selectedOptions[0].id))
          }
        >
          <option>Wybierz urzadzenie</option>
          {deviceByFunction?.map((device: IDevice) => (
            <option key={device.id} id={device.id.toString()}>
              {device.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setAction(e.target.value)}>
          <option>Wybierz akcje</option>
          {actionByFunction?.map((action: string, index: number) => (
            <option key={index}>{action}</option>
          ))}
        </select>
        {error && <Message type="error">Wypełnij wszystkie pola</Message>}
        <ButtonContainer>
          <Button callback={onClose}>Anuluj</Button>
          <Button callback={handleSubmit}>Dodaj</Button>
        </ButtonContainer>
      </div>
    </div>
  );
}
