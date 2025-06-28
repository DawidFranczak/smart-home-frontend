import { useState } from "react";
import styles from "./SettingsPage.module.css";
import NavbarSettings from "../../components/NavbarSettings/NavbarSettings";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";
import { TSettings } from "../../type/TSettings";
import ChangeHomeForm from "../../components/ChangeHomeForm/ChangeHomeForm";
import HomeCode from "../../components/HomeCode/HomeCode";
import HomeLeave from "../../components/HomeLeave/HomeLeave";
export default function SettingsPage() {
  const [selectedSettings, setSelectedSettings] =
    useState<TSettings>("passowrdChange");

  const componentMap: Record<TSettings, React.ReactNode> = {
    passowrdChange: <ChangePasswordForm />,
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
