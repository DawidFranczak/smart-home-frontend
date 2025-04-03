import { useMutation } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../const/api";

export default function useActionMutation() {
  const { createData } = useFetch();

  function createAction(id: number) {
    return useMutation({
      mutationFn: (data: any) =>
        createData(`${api.actionAndEvent}${id}/`, data),
    });
  }
  return { createAction };
}
