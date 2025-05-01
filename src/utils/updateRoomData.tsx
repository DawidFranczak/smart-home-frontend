import { QueryClient } from "@tanstack/react-query";
import { IRoom } from "../interfaces/IRoom";

export default function updateRoomData(
  queryClient: QueryClient,
  response: { status: number; data: IRoom }
) {
  const oldData = queryClient.getQueryData(["rooms"]) as {
    status: number;
    data: IRoom[];
  };
  for (let i = 0; i < oldData.data.length; i++) {
    if (oldData.data[i].id === response.data.id)
      oldData.data[i] = response.data;
  }
  queryClient.setQueryData(["rooms"], oldData);
}
