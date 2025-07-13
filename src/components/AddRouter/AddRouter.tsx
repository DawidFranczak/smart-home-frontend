import { useState } from "react";
import Button from "../ui/Buttons/Button/Button";
import FormField from "../ui/FormField/FormField";
import styles from "./AddRouter.module.css";
import useRouterMutation from "../../hooks/queries/useRouterMutation";
import Message from "../ui/Message/Message";
import { ICustomError } from "../../interfaces/ICustomError";
import PageContainer from "../ui/containers/PageContainer/PageContainer.tsx";
import Header from "../ui/Headers/Header/Header.tsx";
import FormContainer from "../ui/containers/FormContainer/FormContainer.tsx";

export default function AddRouter() {
  const [mac, setMac] = useState("");
  const { createRouter } = useRouterMutation();
  const mutation = createRouter();
  function handleSaveRouter() {
    mutation.mutate(mac);
  }
  const error = mutation.error as ICustomError;
  return (
    <PageContainer className={styles.container}>
      <FormContainer>
        <Header>Dodaj nowy router</Header>
        <FormField
          name="router"
          type="text"
          placeholder="Podaj adres mac"
          onChange={(event) => setMac(event.target.value)}
        />
          <Message type="error" show={error?.details}>
            {error.details[Object.keys(error.details)[0]]}
          </Message>
        <Button type="fancy" onClick={handleSaveRouter}>Dodaj</Button>
      </FormContainer>
    </PageContainer>
  );
}
