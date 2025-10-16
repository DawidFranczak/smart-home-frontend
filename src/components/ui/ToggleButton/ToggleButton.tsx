import { useState, useEffect } from 'react';
import styles from './ToggleButton.module.css';

interface ToggleButtonProps {
    label: string;
    initialValue?: boolean;
    onChange: (value: boolean) => void;
    onLabel?: string;
    offLabel?: string;
    disabled?: boolean;
}

export default function ToggleButton({
                                         label,
                                         initialValue = false,
                                         onChange,
                                         onLabel = "Włącz",
                                         offLabel = "Wyłącz",
                                         disabled = false
                                     }: ToggleButtonProps) {
    const [isOn, setIsOn] = useState(initialValue);

    useEffect(() => {
        setIsOn(initialValue);
    }, [initialValue]);

    const handleToggle = () => {
        if (disabled) return;

        const newValue = !isOn;
        setIsOn(newValue);
        onChange(newValue);
    };

    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <button
                className={`${styles.toggleButton} ${isOn ? styles.on : styles.off} ${disabled ? styles.disabled : ''}`}
                onClick={handleToggle}
                disabled={disabled}
                type="button"
            >
                <div className={styles.slider}>
                    <span className={styles.text}>
                        {isOn ? onLabel : offLabel}
                    </span>
                </div>
            </button>
        </div>
    );
}