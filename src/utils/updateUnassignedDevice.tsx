import { QueryClient } from "@tanstack/react-query";

export default function updateUnassignedDevice(
  queryClient: QueryClient,
  response: { status: number; data: any }
) {
  const oldData = queryClient.getQueryData(["unassignedDevice"]) as {
    status: number;
    data: any[];
  };
  const newDataData = Array.isArray(oldData.data)
    ? [...oldData.data, response.data]
    : [response.data];
  const newData = {
    status: response.status,
    data: newDataData,
  };
  queryClient.setQueryData(["unassignedDevice"], newData);
}
