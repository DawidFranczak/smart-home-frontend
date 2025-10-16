import { QueryClient } from "@tanstack/react-query";

export default function updateInstanceData(
  queryClient: QueryClient,
  response: any
) {
  const fun = response.data.fun;
  const id = response.data.id;
  queryClient.setQueryData([fun, id], response);
}
