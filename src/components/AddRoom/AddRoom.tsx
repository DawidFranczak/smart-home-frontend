import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./AddRoom.module.css";
import Button from "../ui/Buttons/Button/Button";
import FormField from "../ui/FormField/FormField";
import RadioInput from "../ui/RadioInput/RadioInput.tsx";
import useFetch from "../../hooks/useFetch";
import { api } from "../../constant/api";
import Header from "../ui/Headers/Header/Header";
import ButtonContainer from "../ui/containers/ButtonContainer/ButtonContainer";
import { ICustomError } from "../../interfaces/ICustomError";
import Message from "../ui/Message/Message";
import FormContainer from "../ui/containers/FormContainer/FormContainer.tsx";

interface AddRoomProps {
  onClose: () => void;
}

interface RoomData {
  name: string;
  visibility: string;
}

export default function AddRoom({ onClose }: AddRoomProps) {
  const queryClient = useQueryClient();
  const [roomData, setRoomData] = useState({ name: "", visibility: "public" });
  const { createData } = useFetch();
  const mutation = useMutation({
    mutationFn: (roomData: RoomData) => createData(api.room, roomData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      onClose();
    },
  });

  function handleSelected(event: React.ChangeEvent<HTMLInputElement>) {
    setRoomData({ ...roomData, visibility: event.target.value });
  }

  function handleName(event: React.ChangeEvent<HTMLInputElement>) {
    setRoomData({ ...roomData, name: event.target.value });
  }

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate(roomData);
  };

  const errors = mutation.error as ICustomError;

  return (
    <section className={styles.container}>
      <FormContainer>
        <Header>Dodaj nowy pokój</Header>
        <FormField
          name="nazwa"
          type="text"
          placeholder="Nazwa"
          onChange={handleName}
        />
        <Message type="error" show={!!(errors?.details?.name && errors.details.name.length > 0)}>
          {errors?.details?.name?.[0]}
        </Message>
        <RadioInput
          name="Ogólny"
          value="public"
          onSelect={handleSelected}
          checked={true}
        />
        <RadioInput
          name="Prywatny"
          value="private"
          onSelect={handleSelected}
        />
        <Message type="error" show={!!(errors?.details?.visibility && errors.details.visibility.length > 0)}>
          {errors?.details?.visibility?.[0]}
        </Message>
        <ButtonContainer>
          <Button type="fancy" onClick={handleAdd}>Dodaj</Button>
          <Button type="fancy" onClick={onClose}>Zamknij</Button>
        </ButtonContainer>
      </FormContainer>
    </section>
  );
}
