import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../const/api";
interface IFavouriteData {
  id: number;
  is_favourite: boolean;
  type: "room" | "device";
}
export default function useFavouriteMutation(
  onClick?: (is_favourite: boolean) => void
) {
  const queryClient = useQueryClient();
  const { updateData } = useFetch();
  const mutation = useMutation({
    mutationFn: (data: IFavouriteData) => updateData(api.favourite, data),
    onSuccess: (_, data: IFavouriteData) => {
      queryClient.invalidateQueries({ queryKey: ["favourite"] });
      onClick && onClick(!data.is_favourite);
    },
  });
  return mutation;
}
