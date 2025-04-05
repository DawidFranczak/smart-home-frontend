import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../const/api";
import { IRfid } from "../../interfaces/IRfid";

export default function useCardMutation() {
  const queryClient = useQueryClient();
  const { deleteData, createData } = useFetch();

  const getRfidData = (rfidId: number) => {
    return queryClient.getQueriesData({
      queryKey: ["rfid", rfidId],
    })[0][1] as { status: number; data: IRfid };
  };

  const updateQueryclient = (
    rfidId: number,
    data: { data: IRfid; status: number }
  ) => {
    queryClient.setQueryData(["rfid", rfidId], {
      data: data.data,
      status: data.status,
    });
  };

  function mutationDelete(cardId: number, rfidId: number) {
    return useMutation({
      mutationFn: () => deleteData(`${api.card}${cardId}/`),
      onSuccess: () => {
        const data = getRfidData(rfidId);
        const rfidData = data.data;
        const new_data = {
          ...rfidData,
          cards: rfidData.cards.filter((card) => card.id !== cardId),
        };
        updateQueryclient(rfidId, { data: new_data, status: data.status });
      },
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
