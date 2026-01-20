import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../constant/api";
import useFetch from "../useFetch";
import updateDeviceData from "../../utils/updateDeviceData.tsx";
import {IStairs} from "../../interfaces/IStairs.tsx";

export default function useStairsMutation() {
  const { updateData } = useFetch();
  const queryClient = useQueryClient();

  function updateStairs(id: number) {
    return useMutation({
      mutationFn: (newData: IStairs) => updateData(`${api.stairs}${id}/`, newData),
      onSuccess: (response) => {
        updateDeviceData(queryClient, response.data, response.status);
      },
    });
  }

  return { updateStairs };
}
