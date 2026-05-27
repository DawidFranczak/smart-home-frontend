import OffIcon from "@rsuite/icons/Off";
import {PointerEventHandler} from "react";
import styles from "./PowerButtonControl.module.css";

interface PowerButtonControlProps {
    checked: boolean;
    label: string;
    disabled?: boolean;
    offline?: boolean;
    syncing?: boolean;
    onClick?: () => void;
    onPointerDown?: PointerEventHandler<HTMLButtonElement>;
    onPointerUp?: PointerEventHandler<HTMLButtonElement>;
    onPointerCancel?: PointerEventHandler<HTMLButtonElement>;
}

export default function PowerButtonControl({
    checked,
    label,
    disabled = false,
    offline = false,
    syncing = false,
    onClick,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
}: PowerButtonControlProps) {
    return (
        <button
            type="button"
            className={`${styles.button} ${checked ? styles.active : styles.inactive} ${syncing ? styles.syncing : ""} ${offline ? styles.offline : ""}`}
            onClick={onClick}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            disabled={disabled}
            role="switch"
            aria-checked={checked}
        >
            <span className={styles.pressSurface}>
                <OffIcon className={styles.icon} />
            </span>
            <span className={styles.stateText}>{label}</span>
        </button>
    );
}
