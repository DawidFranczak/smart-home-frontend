import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../constant/api";
import { ILamp } from "../../interfaces/ILamp";
import useFetch from "../useFetch";
import updateDeviceData from "../../utils/updateDeviceData.tsx";

export default function useLampMutation() {
  const { updateData } = useFetch();
  const queryClient = useQueryClient();

  function updateLamp(id: number) {
    return useMutation({
      mutationFn: (newData: ILamp) => updateData(`${api.lamp}${id}/`, newData),
      onSuccess: (response) => {
        updateDeviceData(queryClient, response.data, response.status);
      },
    });
  }

  return { updateLamp };
}
