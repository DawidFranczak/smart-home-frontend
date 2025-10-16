import { QueryClient } from "@tanstack/react-query";

export default function updateRouterData(queryClient: QueryClient, data: any, status:number) {
  const newData = {
    status: status,
    data: [data],
  };
  queryClient.setQueryData(["router"], newData);
}
