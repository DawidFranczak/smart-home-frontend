import {StrictMode, useState} from "react";
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
import enGB from 'rsuite/locales/en_GB';
import "./i18n.ts"
import {useTranslation} from "react-i18next";

const queryClient = new QueryClient();

const AppWrapper = () => {
    const { i18n } = useTranslation();
    const [locale, setLocale] = useState(i18n.language === "pl" ? plPL : enGB);

    i18n.on("languageChanged", (lng) => {
        setLocale(lng === "pl" ? plPL : enGB);
    });

    return (
        <CustomProvider theme="dark" locale={locale}>
            <RouterProvider router={routers} />
        </CustomProvider>
    );
};
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      <AuthProvider>
        <AppWrapper/>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
