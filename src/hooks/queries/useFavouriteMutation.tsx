import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../const/api";
import updateFavouriteData from "../../utils/updateFavouriteData";
import updateRoomData from "../../utils/updateRoomData";
import updateRoomDeviceData from "../../utils/updateRoomDeviceData";
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
    onSuccess: (response, data: IFavouriteData) => {
      updateFavouriteData(queryClient, response, data.type);
      if (data.type === "room") updateRoomData(queryClient, response);
      else updateRoomDeviceData(queryClient, response);
      onClick && onClick(!data.is_favourite);
    },
  });
  return mutation;
}
