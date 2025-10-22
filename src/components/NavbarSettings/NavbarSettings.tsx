import { TSettings } from "../../type/TSettings";
import { Nav } from "rsuite";
import styles from "./NavbarSettings.module.css";

interface INavbarSettingsProps {
    onChange: (value: TSettings) => void;
    value: TSettings;
}

export default function NavbarSettings({ onChange, value }: INavbarSettingsProps) {
    return (
        <div className={styles.container}>
            <Nav
                appearance="subtle"
                activeKey={value}
                onSelect={(val) => onChange(val as TSettings)}
                vertical
            >
                <Nav.Item eventKey="passwordChange">Zmiana hasła</Nav.Item>
                <Nav.Item eventKey="homeChange">Zmiana domu</Nav.Item>
                <Nav.Item eventKey="homeCode">Kod domu</Nav.Item>
                <Nav.Item eventKey="homeLeave">Wyjdź z domu</Nav.Item>
            </Nav>
        </div>
    );
}
