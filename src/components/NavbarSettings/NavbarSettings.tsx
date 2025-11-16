import { TSettings } from "../../type/TSettings";
import { Nav } from "rsuite";
import styles from "./NavbarSettings.module.css";
import {useTranslation} from "react-i18next";

interface INavbarSettingsProps {
    onChange: (value: TSettings) => void;
    value: TSettings;
}

export default function NavbarSettings({ onChange, value }: INavbarSettingsProps) {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <Nav
                appearance="subtle"
                activeKey={value}
                onSelect={(val) => onChange(val as TSettings)}
                vertical
            >
                <Nav.Item eventKey="passwordChange">{t("settingsNavbar.passwordChange")}</Nav.Item>
                <Nav.Item eventKey="homeChange">{t("settingsNavbar.homeChange")}</Nav.Item>
                <Nav.Item eventKey="homeCode">{t("settingsNavbar.homeCode")}</Nav.Item>
                <Nav.Item eventKey="homeLeave">{t("settingsNavbar.homeLeave")}</Nav.Item>
            </Nav>
        </div>
    );
}
