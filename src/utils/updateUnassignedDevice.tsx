import { QueryClient } from "@tanstack/react-query";

export default function updateUnassignedDevice(
  queryClient: QueryClient,
  data: any,
  status: number
) {
  const oldData = queryClient.getQueryData(["unassignedDevice"]) as {
    status: number;
    data: any[];
  };
  if (!oldData) return;
  const newDataData = Array.isArray(oldData.data)
    ? [...oldData.data, data]
    : [data];
  const newData = {
    status: status,
    data: newDataData,
  };
  queryClient.setQueryData(["unassignedDevice"], newData);
}
