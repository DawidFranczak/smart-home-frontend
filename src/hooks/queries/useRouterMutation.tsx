import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../constant/api";

export default function useRouterMutation() {
  const { createData } = useFetch();
  const queryClient = useQueryClient();
  function createRouter() {
    return useMutation({
      mutationFn: (mac: string) => createData(api.router, { mac }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["router"] });
      },
    });
  }
  return { createRouter };
}
