import { useState } from "react";
import styles from "./SettingsPage.module.css";
import NavbarSettings from "../../components/NavbarSettings/NavbarSettings";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";
import { TSettings } from "../../type/TSettings";
export default function SettingsPage() {
  const [selectedSettings, setSelectedSettings] =
    useState<TSettings>("passowrdChange");
  const componentMap: Record<TSettings, React.ReactNode> = {
    passowrdChange: <ChangePasswordForm />,
    homeChange: <div>Ustawienia</div>,
    homeCode: <div>Ustawienia2</div>,
    homeLeave: <div>Ustawienia3</div>,
  };
  const selectedSettingsComponent = componentMap[selectedSettings] || null;
  return (
    <div className={styles.container}>
      <NavbarSettings onChange={setSelectedSettings} value={selectedSettings} />
      {selectedSettingsComponent}
    </div>
  );
}
