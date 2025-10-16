import {useNavigate, useParams} from "react-router-dom";
import useAvailableActionQuery from "../../hooks/queries/useAvailableActionQuery";
import PageContainer from "../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../components/ui/Headers/PageHeader/PageHeader.tsx";
import LoadingAnimation from "../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import SelectInput from "../../components/ui/SelectInput/SelectInput.tsx";
import {IDevice} from "../../interfaces/IDevice.tsx";
import Message from "../../components/ui/Message/Message.tsx";
import ButtonContainer from "../../components/ui/containers/ButtonContainer/ButtonContainer.tsx";
import Button from "../../components/ui/Buttons/Button/Button.tsx";
import {useEffect, useState} from "react";
import useDeviceByFunctionQuery from "../../hooks/queries/device/useDeviceByFunctionQuery.tsx";
import useActionByFunctionQuery from "../../hooks/queries/useActionByFunctionQuery.tsx";
import useEventMutation from "../../hooks/queries/useEventMutation.tsx";
import FormContainer from "../../components/ui/containers/FormContainer/FormContainer.tsx";

export default function DeviceEventWizard() {
  const params = useParams();
  const device_id = parseInt(params.id ? params.id : "0");
  const navigate = useNavigate()
  const [event, setEvent] = useState("");
  const [selectDevice, setSelectDevice] = useState(0);
  const [deviceFunction, setDeviceFunction] = useState("");
  const [action, setAction] = useState("");
  const [error, setError] = useState(false);
  const { deviceByFunction } = useDeviceByFunctionQuery(deviceFunction);
  const { actionByFunction } = useActionByFunctionQuery(deviceFunction);
  const { availableAction } = useAvailableActionQuery(
    device_id,
    params.deviceFun ? params.deviceFun : ""
  );
  console.log(availableAction);
  const { createEvent } = useEventMutation();
  const createMutation = createEvent(device_id);
  useEffect(() => {
    if (createMutation.isSuccess) {
      onSuccess();
    }
  }, [createMutation.isSuccess]);

  function onSuccess() {
    navigate(-1);
  }
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
  if (!availableAction) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
  return (
    <PageContainer>
      <PageHeader title="Dodawanie akcji"></PageHeader>
      <FormContainer>
        <SelectInput
            name={"Wybierz event"}
            iterable={availableAction.available_events?.map((event:string,index:number) => [event, index])}
            onChange={(e) => setEvent(e.target.value)}
        />

        <SelectInput
            name={"Wybierz typ"}
            iterable={availableAction.models?.map((model:string,index:number) => [model, index])}
            onChange={(e) => setDeviceFunction(e.target.value)}
        />
        <SelectInput
            name={"Wybierz urządzenie"}
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
        <Message show={error} type="error">Wypełnij wszystkie pola</Message>
        <ButtonContainer>
          <Button type="fancy" onClick={onSuccess}>Wróć</Button>
          <Button type="fancy" onClick={handleSubmit}>Dodaj</Button>
        </ButtonContainer>
      </FormContainer>
    </PageContainer>
  );
}
