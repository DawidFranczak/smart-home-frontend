import { useState } from "react";
import styles from "./SettingsPage.module.css";
import NavbarSettings from "../../components/NavbarSettings/NavbarSettings";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";
import { TSettings } from "../../type/TSettings";
import CameraCard from "../../components/Cards/CameraCard/CameraCard";
export default function SettingsPage() {
  const [selectedSettings, setSelectedSettings] =
    useState<TSettings>("passowrdChange");
  const componentMap: Record<TSettings, React.ReactNode> = {
    passowrdChange: <ChangePasswordForm />,
    homeChange: (
      <CameraCard url="http://127.0.0.1:8083/stream/balkon/channel/0/hls/live/index.m3u8" />
    ),
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
