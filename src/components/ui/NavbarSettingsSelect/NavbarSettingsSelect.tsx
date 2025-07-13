import { TSettings } from "../../../type/TSettings.ts";
import styles from "./NavbarSettingsSelect.module.css";
interface INavbarSettingsSelectProps {
  onClick: (name: TSettings) => void;
  value: string;
  name: string;
  children: React.ReactNode;
}
export default function NavbarSettingsSelect({
  onClick,
  value,
  name,
  children,
}: INavbarSettingsSelectProps) {
  const selected = value === name;
  return (
    <div
      className={`${styles.container} ${selected ? styles.selected : ""}`}
      onClick={() => onClick(name as TSettings)}
    >
      {children}
    </div>
  );
}
