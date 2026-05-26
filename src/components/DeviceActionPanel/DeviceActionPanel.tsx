import { Button, Stack, Whisper, Tooltip } from "rsuite";
import { Link } from "react-router-dom";
import WifiStrength from "../ui/WiFiStrength/WiFiStrength.tsx";
import styles from "./DeviceActionPanel.module.css";

interface ActionButton {
    label: string;
    to: string;
    type?: "default" | "primary" | "link" | "subtle" | "ghost";
    color?: "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "violet";
    tooltip?: string;
    icon?: React.ReactNode;
}

interface DeviceActionPanelProps {
    buttons?: ActionButton[];
    wifiStrength?: number;
    showWifi?: boolean;
    children?: React.ReactNode;
}

export default function DeviceActionPanel({ buttons, wifiStrength, children, showWifi = true }: DeviceActionPanelProps) {
    const isOffline = wifiStrength !== undefined && wifiStrength <= -100;
    const signalState = isOffline
        ? styles.offline
        : wifiStrength !== undefined && wifiStrength <= -60
            ? styles.weak
            : styles.online;

    return (
        <div className={styles.wrapper}>
            <Stack
                className={styles.container}
                justifyContent="space-between"
                wrap
                spacing={20}
            >
                <Stack spacing={10} wrap className={styles.actionGroup}>
                    {buttons?.map((btn, idx) => {
                        const buttonElement = (
                            <Button
                                key={`dap_button_${idx}`}
                                as={Link}
                                to={btn.to}
                                appearance={btn.type || "subtle"}
                                color={btn.color}
                                startIcon={btn.icon}
                                className={styles.actionButton}
                            >
                                {btn.label}
                            </Button>
                        );

                        return btn.tooltip ? (
                            <Whisper
                                key={idx}
                                placement="top"
                                trigger="hover"
                                speaker={<Tooltip>{btn.tooltip}</Tooltip>}
                            >
                                {buttonElement}
                            </Whisper>
                        ) : (
                            buttonElement
                        );
                    })}
                    {children}
                </Stack>

                {showWifi && wifiStrength !== undefined && (
                    <Stack spacing={10} className={styles.statusSection}>
                        <div className={`${styles.wifiWrapper} ${signalState}`}>
                            <div className={styles.wifiIconBox}>
                                <WifiStrength strength={wifiStrength} size="medium" />
                            </div>
                            <div className={styles.wifiText}>
                                <span className={styles.wifiTitle}>
                                    {isOffline ? "Offline" : "WiFi signal"}
                                </span>
                                <span className={styles.wifiLabel}>
                                    {wifiStrength > -100 ? `${wifiStrength} dBm` : "No connection"}
                                </span>
                            </div>
                        </div>
                    </Stack>
                )}
            </Stack>
        </div>
    );
}
