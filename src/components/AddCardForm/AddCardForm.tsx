import { FormEvent, useEffect } from "react";
import styles from "./AddCardForm.module.css";
import Button from "../../ui/Button/Button";
import Header from "../../ui/Header/Header";
import ButtonContainer from "../../ui/ButtonContainer/ButtonContainer";
import FormField from "../../ui/FormField/FormField";
import useCardMutation from "../../hooks/queries/useCardMutation";
import { ICustomError } from "../../interfaces/ICustomError";
import Message from "../../ui/Message/Message";

interface AddCardFormProps {
  rfidID: number;
  handleAddFunction: (status: string) => void;
}

export default function AddCardForm({
  rfidID,
  handleAddFunction,
}: AddCardFormProps) {
  const { mutationCreate } = useCardMutation();
  const mutation = mutationCreate(rfidID);

  useEffect(() => {
    mutation.isSuccess && handleAddFunction("success");
  }, [mutation.isSuccess]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      card: { value: string };
    };
    const name = target.card.value;
    mutation.mutate(name);
  }
  const error = mutation.error as ICustomError;
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Header>Dodaj karte</Header>
        <FormField name="card" type="text" placeholder="Nazwa karty" />
        {error?.details && (
          <Message type="error">{error.details.non_field_errors}</Message>
        )}
        {error?.details?.name && (
          <Message type="error">To pole jest wymagane</Message>
        )}
        <ButtonContainer>
          <Button callback={() => {}}>Dodaj</Button>
          <Button
            callback={() => {
              handleAddFunction("closed");
            }}
          >
            Zamknij
          </Button>
        </ButtonContainer>
      </form>
    </div>
  );
}
