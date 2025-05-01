import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../const/api";

export default function useCardMutation() {
  const queryClient = useQueryClient();
  const { deleteData, createData } = useFetch();

  function mutationDelete(cardId: number) {
    return useMutation({
      mutationFn: () => deleteData(`${api.card}${cardId}/`),
    });
  }
  function mutationCreate(rfidId: number) {
    return useMutation({
      mutationFn: (name: string) =>
        createData(`${api.card}`, { name, rfid: rfidId }),
      onSuccess: (cardData) => {
        queryClient.setQueryData(["rfid", rfidId], cardData);
      },
    });
  }
  return { mutationDelete, mutationCreate };
}
