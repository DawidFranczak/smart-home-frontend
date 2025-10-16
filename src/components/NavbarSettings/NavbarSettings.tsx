import styles from "./NavbarSettings.module.css";
import { TSettings } from "../../type/TSettings";
import NavbarSettingsSelect from "../ui/NavbarSettingsSelect/NavbarSettingsSelect";
interface INavbarSettingsProps {
  onChange: (value: TSettings) => void;
  value: string;
}
export default function NavbarSettings({
  onChange,
  value,
}: INavbarSettingsProps) {
  return (
    <div className={styles.container}>
      <NavbarSettingsSelect
        onClick={onChange}
        value={value}
        name="passwordChange"
      >
        Zmiana hasła
      </NavbarSettingsSelect>
      <NavbarSettingsSelect onClick={onChange} value={value} name="homeChange">
        Zmiana domu
      </NavbarSettingsSelect>

      <NavbarSettingsSelect onClick={onChange} value={value} name="homeCode">
        Kod domu
      </NavbarSettingsSelect>
      <NavbarSettingsSelect onClick={onChange} value={value} name="homeLeave">
        Wyjdź z domu
      </NavbarSettingsSelect>
    </div>
  );
}
