import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../constant/api";
import { IAquarium } from "../../interfaces/IAquarium";
import updateDeviceData from "../../utils/updateDeviceData.tsx";

export default function useAquariumMutation(id: number) {
  const { updateData } = useFetch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (aquariumData: IAquarium) =>
      updateData(`${api.aquarium}${id}/`, aquariumData),
    onSuccess: (response) => {
      updateDeviceData(queryClient, response.data, response.status);
    },
  });
}
