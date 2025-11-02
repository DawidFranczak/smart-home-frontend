import { useMutation } from "@tanstack/react-query";
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
  function createEvent(id: number) {
    return useMutation({
      mutationFn: (data: any) => createData(`${api.event}${id}/`, data),
    });
  }
  function deleteEvent(deviceId: number, eventId: number) {
    return useMutation({
      mutationFn: () => deleteData(`${api.event}${eventId}/`),
    });
  }
  return { createEvent, deleteEvent };
}
