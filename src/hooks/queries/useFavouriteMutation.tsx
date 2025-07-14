import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../constant/api";
import updateFavouriteData from "../../utils/updateFavouriteData";
import updateRoomData from "../../utils/updateRoomData";
import updateDeviceData from "../../utils/updateDeviceData.tsx";
import IFavouriteData from "../../interfaces/IFavouriteData.tsx";

export default function useFavouriteMutation(
  onClick?: (is_favourite: boolean) => void
) {
  const queryClient = useQueryClient();
  const { updateData } = useFetch();
  return useMutation({
    mutationFn: (data: IFavouriteData) => updateData(api.favourite, data),
    onSuccess: (response, data: IFavouriteData) => {
      updateFavouriteData(queryClient, data, response.status);
      if (data.type === "room") updateRoomData(queryClient, response);
      else if (data.type === "device") updateDeviceData(queryClient, response);
      onClick && onClick(!data.is_favourite);
    },
  });
}
