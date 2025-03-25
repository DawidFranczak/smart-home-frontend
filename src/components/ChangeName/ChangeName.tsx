import { useEffect, useState } from "react";
import styles from "./ChangeName.module.css";
import ChangeNameForm from "../ChangeNameForm/ChangeNameForm";
import useDeviceMutation from "../../hooks/queries/useDeviceMutation";
import { ICustomError } from "../../interfaces/ICustomError";
import Message from "../../ui/Message/Message";

interface ChangeNameProps {
  children: React.ReactNode;
  type: "device" | "room";
  id: number;
}
export default function ChangeName({ children, type, id }: ChangeNameProps) {
  const [displayForm, setDisplayForm] = useState(false);
  const { updateDevice } = useDeviceMutation();
  const mutation = updateDevice(id);
  useEffect(() => {
    if (mutation.isSuccess) {
      setDisplayForm(false);
    }
  }, [mutation.isSuccess]);

  function handleChangeName(name: string) {
    mutation.mutate({ name });
  }
  const error = mutation.error as ICustomError;
  return (
    <div
      className={styles.changeName}
      onClick={() => {
        setDisplayForm(true);
      }}
    >
      {displayForm && (
        <>
          <ChangeNameForm
            onClose={() => setDisplayForm(false)}
            onConfirm={handleChangeName}
          ></ChangeNameForm>
          {error?.details && (
            <Message type="error">{error.details?.non_field_errors}</Message>
          )}
        </>
      )}
      {!displayForm && children}
    </div>
  );
}
