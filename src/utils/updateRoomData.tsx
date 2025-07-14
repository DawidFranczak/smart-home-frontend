import { QueryClient } from "@tanstack/react-query";
import { IRoom } from "../interfaces/IRoom";

export default function updateRoomData(
  queryClient: QueryClient,
  response: { status: number; data: IRoom }
) {
  console.log(response);
  queryClient.setQueryData(["room",response.data.id], response);
}
