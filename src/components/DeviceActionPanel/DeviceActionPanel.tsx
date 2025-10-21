import {Button, Tooltip, Whisper} from "rsuite";
import {Link} from "react-router-dom";
import WifiStrength from "../ui/WiFiStrength/WiFiStrength.tsx";
import styles from "./DeviceActionPanel.module.css";
interface ActionButton {
    label: string;
    to: string;
    type?: "default" | "primary" | "link" | "subtle" | "ghost";
    color?: "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "violet"
    tooltip?: string;

}

interface DeviceActionPanelProps {
    buttons: ActionButton[];
    wifiStrength?: number;
    showWifi?: boolean;
    children?: React.ReactNode;
}

export default function DeviceActionPanel({buttons, wifiStrength, children, showWifi = true}:DeviceActionPanelProps) {
    return (
        <div className={styles.container}>
            <div className={styles.buttonGroup}>
                {buttons.map((btn, idx) => (
                    <Whisper
                        key={idx}
                        placement="bottom"
                        trigger="hover"
                        speaker={btn.tooltip ? <Tooltip>{btn.tooltip}</Tooltip> : <></>}
                    >
                        <Button
                            key={`dap_button_${idx}`}
                            as={Link}
                            to={btn.to}
                            appearance={btn.type?btn.type:"primary"}
                            color={btn.color?btn.color:"blue"}
                            className={styles.button}
                        >
                            {btn.label}
                        </Button>
                    </Whisper>
                ))}
                {children}
            </div>
            {showWifi && wifiStrength !== undefined && (
                <div className={styles.wifi}>
                    <WifiStrength strength={wifiStrength} size="large"/>
                </div>
            )}
        </div>
    );
};
