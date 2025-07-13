import {useState} from "react";
import styles from "./AddCardForm.module.css";
import Button from "../ui/Buttons/Button/Button";
import Header from "../ui/Headers/Header/Header";
import ButtonContainer from "../ui/containers/ButtonContainer/ButtonContainer";
import FormField from "../ui/FormField/FormField";
import useCardMutation from "../../hooks/queries/useCardMutation";
import { ICustomError } from "../../interfaces/ICustomError";
import Message from "../ui/Message/Message";
import OnTopContainer from "../ui/containers/OnTopContainer/OnTopContainer.tsx";
import FormContainer from "../ui/containers/FormContainer/FormContainer.tsx";
import LoadingAnimation from "../ui/LoadingAnimation/LoadingAnimation.tsx";

interface AddCardFormProps {
  rfidID: number;
  handleAddFunction: () => void;
  show: boolean;
  pending: boolean;
}

export default function AddCardForm({
                                      rfidID,
                                      handleAddFunction,
                                      show,
                                      pending
}: AddCardFormProps) {
  const [name, setName] = useState("");
  const { mutationCreate } = useCardMutation();
  const mutation = mutationCreate(rfidID);

  function handleSubmit() {
    mutation.mutate(name);
  }
  function handleCancel() {
    mutation.reset();
    handleAddFunction();
  }
  const error = mutation.error as ICustomError;
  console.log(pending);

  if (!show) {
    return null;
  }

  return (
  <OnTopContainer>
    <FormContainer >
      <Header>
        Dodaj kartę
      </Header>
      {pending && (
        <>
          <div className={styles.pendingAnimation}>
            <LoadingAnimation size="small" type="spinner" glow={true}/>
          </div>
          <div className={styles.pendingMessage}>
            Zbliż kartę do czytnika...
          </div>
        </>
      )}
      <div className={styles.instructionText}>
        Wprowadź nazwę karty i zbliż ją do czytnika RFID
      </div>
       <FormField error={!!error} name="card" type="text" placeholder="Nazwa karty" onChange={(event) => setName(event.target.value)}/>
      <Message
          show={!!error?.details?.non_field_errors}
          type="error"
      >
        {error?.details?.non_field_errors}
      </Message>
      <Message
          show={!!error?.details?.name}
          type="error"
      >
        To pole jest wymagane
      </Message>
        <ButtonContainer>
          <Button type="form-secondary" onClick={handleCancel}>Anuluj</Button>
          <Button type="form-primary" onClick={handleSubmit}>Dodaj kartę</Button>
        </ButtonContainer>
    </FormContainer>
  </OnTopContainer>
  );
}
