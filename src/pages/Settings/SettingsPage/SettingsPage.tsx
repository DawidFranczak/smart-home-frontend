import { useState } from "react";
import styles from "./SettingsPage.module.css";
import NavbarSettings from "../../../components/NavbarSettings/NavbarSettings.tsx";
import ChangePasswordForm from "../../../components/ChangePasswordForm/ChangePasswordForm.tsx";
import { TSettings } from "../../../type/TSettings.ts";
import ChangeHomeForm from "../../../components/ChangeHomeForm/ChangeHomeForm.tsx";
import HomeCode from "../../../components/HomeCode/HomeCode.tsx";
import HomeLeave from "../../../components/HomeLeave/HomeLeave.tsx";
export default function SettingsPage() {
  const [selectedSettings, setSelectedSettings] =
    useState<TSettings>("passwordChange");

  const componentMap: Record<TSettings, React.ReactNode> = {
    passwordChange: <ChangePasswordForm />,
    homeChange: <ChangeHomeForm />,
    homeCode: <HomeCode />,
    homeLeave: <HomeLeave />,
  };

  const selectedSettingsComponent = componentMap[selectedSettings] || null;
  return (
    <div className={styles.container}>
      <NavbarSettings onChange={setSelectedSettings} value={selectedSettings} />
      {selectedSettingsComponent}
    </div>
  );
}
