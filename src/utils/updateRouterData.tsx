import { QueryClient } from "@tanstack/react-query";

export default function updateRouterData(queryClient: QueryClient, data: any) {
  const newData = {
    status: data.data.status,
    data: [data.data.data],
  };
  queryClient.setQueryData(["router"], newData);
}
