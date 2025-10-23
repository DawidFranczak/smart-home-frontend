import { useState, useEffect } from "react";
import { DatePicker } from "rsuite";
import styles from "./InputTime.module.css";

interface InputTimeProps {
    initialTime: string;
    onChange: (time: string) => void;
    label?: string;
    disabled?: boolean;
}

const InputTime = ({
                       initialTime,
                       onChange,
                       label,
                       disabled = false,
                   }: InputTimeProps) => {

    const parseTimeString = (timeStr: string): Date => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        const date = new Date();
        date.setHours(hours || 0);
        date.setMinutes(minutes || 0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    };

    const formatTimeString = (date: Date | null): string => {
        if (!date) return "00:00";
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const [timeValue, setTimeValue] = useState<Date | null>(
        parseTimeString(initialTime)
    );

    useEffect(() => {
        if (timeValue) {
            onChange(formatTimeString(timeValue));
        }
    }, [timeValue]);

    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <DatePicker
                format="HH:mm"
                value={timeValue}
                onChange={setTimeValue}
                disabled={disabled}
                placeholder="Wybierz godzinę"
                className={styles.timePicker}
                cleanable={false}
                ranges={[]}
                showMeridian={false}
                block
            />
        </div>
    );
};

export default InputTime;