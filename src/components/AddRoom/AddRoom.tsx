import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./AddRoom.module.css";
import Button from "../../ui/Button/Button";
import FormField from "../../ui/FormField/FormField";
import SelectInput from "../../ui/SelectInput/SelectInput";
import useFetch from "../../hooks/useFetch";
import { api } from "../../const/api";
import Header from "../../ui/Header/Header";
import ButtonContainer from "../../ui/ButtonContainer/ButtonContainer";
import { ICustomError } from "../../interfaces/ICustomError";
import Message from "../../ui/Message/Message";

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
      <form className={styles.form}>
        <Header>Dodaj nowy pokój</Header>
        <FormField
          name="nazwa"
          type="text"
          placeholder="Nazwa"
          onChange={handleName}
        />
        {errors?.details?.name && (
          <Message type="error">{errors.details.name[0]}</Message>
        )}

        <SelectInput
          name="Ogólny"
          value="public"
          onSelect={handleSelected}
          checked={true}
        />
        <SelectInput
          name="Prywatny"
          value="private"
          onSelect={handleSelected}
        />
        {errors?.details?.visibility && (
          <Message type="error">{errors.details.visibility[0]}</Message>
        )}
        <ButtonContainer>
          <Button callback={handleAdd}>Dodaj</Button>
          <Button callback={onClose}>Zamknij</Button>
        </ButtonContainer>
      </form>
    </section>
  );
}
