import {Button, Tooltip, Whisper} from "rsuite";
import {Link} from "react-router-dom";
import WifiStrength from "../ui/WiFiStrength/WiFiStrength.tsx";
import styles from "./DeviceActionPanel.module.css";
interface ActionButton {
    label: string;
    to: string;
    type?: "primary" | "default" | "fancy";
    tooltip?: string;
}

interface DeviceActionPanelProps {
    buttons: ActionButton[];
    wifiStrength?: number;
    showWifi?: boolean;
}

export default function DeviceActionPanel({buttons, wifiStrength, showWifi = true}:DeviceActionPanelProps) {
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
                            appearance={btn.type === "primary" ? "primary" : "default"}
                            className={styles.button}
                        >
                            {btn.label}
                        </Button>
                    </Whisper>
                ))}
            </div>
            {showWifi && wifiStrength !== undefined && (
                <div className={styles.wifi}>
                    <WifiStrength strength={wifiStrength} size="large"/>
                </div>
            )}
        </div>
    );
};
