import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./auth/AuthContext.tsx";
import routers from "./routers";
import "./index.css";
import 'rsuite/dist/rsuite.min.css';
import { CustomProvider } from 'rsuite';
import plPL from 'rsuite/locales/pl_PL';
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      <AuthProvider>
        <CustomProvider theme="dark" locale={plPL}>
            <RouterProvider router={routers} />
        </CustomProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
