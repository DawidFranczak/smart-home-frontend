import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../constant/api";
import { IAquarium } from "../../interfaces/IAquarium";

export default function useAquariumMutation(id: number) {
  const { updateData } = useFetch();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (aquariumData: IAquarium) =>
      updateData(`${api.aquarium}${id}/`, aquariumData),
    onSuccess: (data) => {
      queryClient.setQueryData(["aquarium", id], data);
      queryClient.invalidateQueries({ queryKey: ["room", data.data.room] });
    },
  });

  return mutation;
}
