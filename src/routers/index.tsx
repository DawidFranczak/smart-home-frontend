import {createBrowserRouter} from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage.tsx";
import LoginPage from "../pages/LoginPage/LoginPage.tsx";
import RequireAuth from "../auth/RequireAuth.tsx";
import HomePage from "../pages/HomePage/HomePage.tsx";
import RouterPage from "../pages/Router/RouterPage.tsx";
import SelectRoom from "../pages/Rooms/SelectRoom/SelectRoom.tsx";
import Room from "../pages/Rooms/Room/Room.tsx";
import DeviceAddPage from "../pages/Devices/DeviceAddPage/DeviceAddPage.tsx";
import SelectAquariumPage from "../pages/Aquariums/SelectAquariumPage/SelectAquariumPage.tsx";
import AquariumPage from "../pages/Aquariums/AquariumPage/AquariumPage.tsx";
import RfidPage from "../pages/Rfid/RfidPage/RfidPage.tsx";
import SelectLampPage from "../pages/Lamps/SelectLampPage/SelectLampPage.tsx";
import LampPage from "../pages/Lamps/LampPage/LampPage.tsx";
import ButtonPage from "../pages/Button/ButtonPage/ButtonPage.tsx";
import DevicePage from "../pages/Devices/DevicePage/DevicePage.tsx";
import DeviceEventWizard from "../pages/DeviceEventWizard/DeviceEventWizard.tsx";
import SelectCameraPage from "../pages/Camera/SelectCameraPage/SelectCameraPage.tsx";
import SettingsPage from "../pages/Settings/SettingsPage/SettingsPage.tsx";
import SettingsDevice from "../pages/Settings/SettingsDevice/SettingsDevice.tsx";
import SettingsRoom from "../pages/Settings/SettingsRoom/SettingsRoom.tsx";
import AddCameraPage from "../pages/Camera/AddCameraPage/AddCameraPage.tsx";
import TempHumPage from "../pages/TempHumPage/TempHumPage.tsx";
import LightPage from "../pages/LightPage/LightPage.tsx";

export default createBrowserRouter([
    {
        path: "/login/",
        element: <LoginPage />,
    },
    {
        path: "/registration/",
        element: <RegistrationPage />,
    },
    {
        path: "/",
        element: <RequireAuth></RequireAuth>,
        children: [
            { path: "", element: <HomePage /> },
            { path: "/router/", element: <RouterPage /> },
            { path: "room/", element: <SelectRoom /> },
            { path: "room/:id/", element: <Room /> },
            { path: "room/:id/add/", element: <DeviceAddPage /> },
            { path: "room/:id/settings/", element: <SettingsRoom /> },
            { path: "aquarium/", element: <SelectAquariumPage /> },
            { path: "aquarium/:id/", element: <AquariumPage /> },
            { path: "rfid/:id/", element: <RfidPage /> },
            { path: "lamp/", element: <SelectLampPage /> },
            { path: "lamp/:id/", element: <LampPage /> },
            { path: "button/:id/", element: <ButtonPage /> },
            { path: "device/", element: <DevicePage /> },
            { path: ":deviceFun/:id/event/wizard/", element: <DeviceEventWizard /> },
            { path: ":deviceFun/:id/settings/", element: <SettingsDevice /> },
            { path: "camera/",element:<SelectCameraPage/> },
            { path: "camera/add/", element:<AddCameraPage/> },
            { path: "settings/", element: <SettingsPage /> },
            { path: "temperature/:id/", element:<TempHumPage/>},
            { path: "light/:id/", element:<LightPage/>}
        ],
    },
]);