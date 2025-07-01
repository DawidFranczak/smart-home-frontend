import { useEffect, useState } from "react";
import Button from "../../ui/Button/Button";
import styles from "./AddEventForm.module.css";
import useDeviceByFunctionQuery from "../../hooks/queries/useDeviceByFunctionQuery";
import useActionByFunctionQuery from "../../hooks/queries/useActionByFunctionQuery";
import useEventMutation from "../../hooks/queries/useEventMutation";
import ButtonContainer from "../../ui/ButtonContainer/ButtonContainer";
import Message from "../../ui/Message/Message";
import SelectInput from "../../ui/SelectInput/SelectInput.tsx";
import {IDevice} from "../../interfaces/IDevice.tsx";
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
        <SelectInput
            name={"Wybierz event"}
            iterable={availableEvent?.map((event:string,index:number) => [event, index])}
            onChange={(e) => setEvent(e.target.value)}
          />

        <SelectInput
            name={"Wybierz typ"}
            iterable={availableDeviceModels?.map((model:string,index:number) => [model, index])}
            onChange={(e) => setDeviceFunction(e.target.value)}
        />
        <SelectInput
            name={"Wybierz urzadzenie"}
            iterable={deviceByFunction?.map((device:IDevice) => [device.name, device.id])}
            onChange={(e) =>
                setSelectDevice(parseInt(e.target.selectedOptions[0].id))
            }
        />
        <SelectInput
            name={"Wybierz akcje"}
            iterable={actionByFunction?.map((action:string,index:number) => [action, index])}
            onChange={(e) => setAction(e.target.value)}
        />
        {error && <Message type="error">Wypełnij wszystkie pola</Message>}
        <ButtonContainer>
          <Button callback={onClose}>Anuluj</Button>
          <Button callback={handleSubmit}>Dodaj</Button>
        </ButtonContainer>
      </div>
    </div>
  );
}
