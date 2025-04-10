import { QueryClient } from "@tanstack/react-query";

export default function updateRouterData(queryClient: QueryClient, data: any) {
  queryClient.setQueryData(["router"], data);
}
