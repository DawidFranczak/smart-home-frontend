import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./context/AuthContext.tsx";
import LoginPage, {
  action as LoginAction,
} from "./pages/LoginPage/LoginPage.tsx";
import RegistrationPage, {
  action as RegistrationAction,
} from "./pages/RegistrationPage/RegistrationPage.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";
import DeviceAddPage from "./pages/Devices/DeviceAddPage/DeviceAddPage.tsx";
import SelectAquariumPage from "./pages/Aquariums/SelectAquariumPage/SelectAquariumPage.tsx";
import AquariumPage from "./pages/Aquariums/AquariumPage/AquariumPage.tsx";
import RequireAuth from "./RequireAuth.tsx";
import SelectLampPage from "./pages/Lamps/SelectLampPage/SelectLampPage.tsx";
import LampPage from "./pages/Lamps/LampPage/LampPage.tsx";
import DevicePage from "./pages/Devices/DevicePage/DevicePage.tsx";
import SelectRoom from "./pages/Rooms/SelectRoom/SelectRoom.tsx";

import "./index.css";
import Room from "./pages/Rooms/Room/Room.tsx";
import RfidPage from "./pages/Rfid/RfidPage/RfidPage.tsx";
import RouterPage from "./pages/Router/RouterPage.tsx";
import DeviceEventWizzard from "./pages/DeviceEventWizzard/DeviceEventWizzard.tsx";
import ButtonPage from "./pages/Button/ButtonPage/ButtonPage.tsx";
import SettingsPage from "./pages/SettingsPage/SettingsPage.tsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/login/",
    element: <LoginPage />,
    action: LoginAction,
  },
  {
    path: "/registartion/",
    element: <RegistrationPage />,
    action: RegistrationAction,
  },
  {
    path: "/",
    element: <RequireAuth></RequireAuth>,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/router/",
        element: <RouterPage />,
      },
      {
        path: "room/",
        element: <SelectRoom />,
      },
      {
        path: "room/:id/",
        element: <Room />,
      },
      {
        path: "room/:id/add/",
        element: <DeviceAddPage />,
      },
      {
        path: "aquarium/",
        element: <SelectAquariumPage />,
      },
      {
        path: "aquarium/:id/",
        element: <AquariumPage />,
      },
      {
        path: "rfid/:id/",
        element: <RfidPage />,
      },
      {
        path: "lamp/",
        element: <SelectLampPage />,
      },
      {
        path: "lamp/:id/",
        element: <LampPage />,
      },
      {
        path: "button/:id/",
        element: <ButtonPage />,
      },
      {
        path: "device/",
        element: <DevicePage />,
      },
      { path: ":deviceFun/:id/event/wizard/", element: <DeviceEventWizzard /> },
      {
        path: "settings/",
        element: <SettingsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
