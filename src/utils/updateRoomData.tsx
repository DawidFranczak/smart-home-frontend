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
  let newData = oldData.data.filter(
    (room: IRoom) => room.id !== response.data.id
  );
  newData.push(response.data);
  queryClient.setQueryData(["rooms"], {
    status: oldData.status,
    data: newData,
  });
}
