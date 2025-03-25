import { useState } from "react";
import Button from "../../ui/Button/Button";
import DeviceContainer from "../../ui/DeviceContainer/DeviceContainer";
import FormField from "../../ui/FormField/FormField";
import styles from "./AddRouter.module.css";
import useRouterMutation from "../../hooks/queries/useRouterMutation";
import Message from "../../ui/Message/Message";
import { ICustomError } from "../../interfaces/ICustomError";
export default function AddRouter() {
  const [mac, setMac] = useState("");
  const { createRouter } = useRouterMutation();
  const mutation = createRouter();
  function handleSaveRouter() {
    mutation.mutate(mac);
  }
  const error = mutation.error as ICustomError;
  return (
    <DeviceContainer
      name="Dodaj router"
      wifi_strength={-100}
      is_online={false}
      className={styles.container}
      id={0}
    >
      <FormField
        name="router"
        type="text"
        placeholder="Podaj adres mac"
        onChange={(event) => setMac(event.target.value)}
      />
      {error?.details && (
        <Message type="error">
          {error.details[Object.keys(error.details)[0]]}
        </Message>
      )}
      <Button callback={handleSaveRouter}>Dodaj</Button>
    </DeviceContainer>
  );
}
