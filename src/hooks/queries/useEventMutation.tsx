import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../constant/api";
import IEvent from "../../interfaces/IEvent";
interface IAvailableAction {
  active_events: IEvent[];
  device_id: number;
  device_fun: string;
}
export default function useEventMutation() {
  const { createData, deleteData } = useFetch();
  const queryClient = useQueryClient();
  function createEvent(id: number) {
    return useMutation({
      mutationFn: (data: any) => createData(`${api.event}${id}/`, data),
      onSuccess: (data) => {
        const oldData: { status: number; data: IAvailableAction } | undefined =
          queryClient.getQueryData(["availableAction", id]);
        if (oldData) {
          const newData = {
            ...oldData,
            data: {
              ...oldData.data,
              active_events: [...oldData.data.active_events, data.data],
            },
          };
          queryClient.setQueryData(["availableAction", id], newData);
        }
      },
    });
  }
  function deleteEvent(deviceId: number, eventId: number) {
    return useMutation({
      mutationFn: () => deleteData(`${api.event}${eventId}/`),
      onSuccess: () => {
        const oldData: { status: number; data: IAvailableAction } | undefined =
          queryClient.getQueryData(["availableAction", deviceId]);
        if (oldData) {
          const newData = {
            ...oldData,
            data: {
              ...oldData.data,
              active_events: oldData.data.active_events.filter(
                (event: IEvent) => event.id !== eventId
              ),
            },
          };
          queryClient.setQueryData(["availableAction", deviceId], newData);
        }
      },
    });
  }
  return { createEvent, deleteEvent };
}
