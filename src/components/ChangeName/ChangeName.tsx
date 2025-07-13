import { useEffect, useState } from "react";
import styles from "./ChangeName.module.css";
import ChangeNameForm from "../ChangeNameForm/ChangeNameForm";
import useDeviceMutation from "../../hooks/queries/useDeviceMutation";
import { ICustomError } from "../../interfaces/ICustomError";
import Message from "../ui/Message/Message";
import useRoomMutation from "../../hooks/queries/useRoomMutation.tsx";

interface ChangeNameProps {
  children: React.ReactNode;
  type: "device" | "room";
  id: number;
  onSuccess?: () => void;
}
export default function ChangeName({ children, type, id,onSuccess }: ChangeNameProps) {
  const [displayForm, setDisplayForm] = useState(false);
  const { updateDevice } = useDeviceMutation();
  const deviceMutation = updateDevice(id);
  const { updateRoom } = useRoomMutation();
  const roomMutation = updateRoom(id);
  useEffect(() => {
    if (deviceMutation.isSuccess || roomMutation.isSuccess) {
      setDisplayForm(false);
      onSuccess?.();
    }
  }, [deviceMutation.isSuccess, roomMutation.isSuccess]);
  useEffect(() => {
    deviceMutation.reset();
    roomMutation.reset();
  }, [displayForm]);

  function handleChangeName(name: string) {
    if (type === "device") {
      deviceMutation.mutate({name});
    }else if (type === "room") {
      roomMutation.mutate({name});
    }
  }
  const deviceError = deviceMutation.error as ICustomError
  const roomError = roomMutation.error as ICustomError

  return (
    <div
      className={styles.changeName}
      onClick={() => {
        setDisplayForm(true);
      }}
    >
      {displayForm && (
        <div className={styles.formContainer}>
          <ChangeNameForm
            onClose={() => setDisplayForm(false)}
            onConfirm={handleChangeName}
          />
          <Message show={!!deviceError?.details} type="error">{deviceError?.details?.non_field_errors}</Message>
          <Message show={!!roomError?.details} type="error">{roomError?.details?.name}</Message>
        </div>
      )}
      {!displayForm && children}
    </div>
  );
}
