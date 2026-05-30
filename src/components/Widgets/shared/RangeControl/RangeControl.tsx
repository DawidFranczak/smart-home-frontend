import {ChangeEvent, CSSProperties, KeyboardEvent} from "react";
import styles from "./RangeControl.module.css";

interface RangeMark {
    value: number;
    label: string;
}

interface RangeControlProps {
    value: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    offline?: boolean;
    className?: string;
    ariaLabel: string;
    marks?: RangeMark[];
    toneStart?: string;
    toneEnd?: string;
    onChange: (value: number) => void;
    onCommit?: (value: number) => void;
}

const defaultMarks = [
    {value: 0, label: "0"},
    {value: 25, label: "25"},
    {value: 50, label: "50"},
    {value: 75, label: "75"},
    {value: 100, label: "100"},
];

export default function RangeControl({
    value,
    min = 0,
    max = 100,
    disabled = false,
    offline = false,
    className = "",
    ariaLabel,
    marks = defaultMarks,
    toneStart,
    toneEnd,
    onChange,
    onCommit,
}: RangeControlProps) {
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        onChange(Number(event.target.value));
    }

    function handleCommit() {
        onCommit?.(value);
    }

    function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "ArrowUp" ||
            event.key === "ArrowDown" ||
            event.key === "Home" ||
            event.key === "End"
        ) {
            handleCommit();
        }
    }

    return (
        <div
            className={`${styles.fader} ${offline ? styles.offline : ""} ${className}`}
            style={{
                "--range-value": value,
                "--range-start": toneStart,
                "--range-end": toneEnd,
            } as CSSProperties}
        >
            <input
                className={styles.range}
                type="range"
                min={min}
                max={max}
                value={value}
                disabled={disabled}
                aria-label={ariaLabel}
                onChange={handleChange}
                onPointerUp={handleCommit}
                onKeyUp={handleKeyUp}
                onBlur={handleCommit}
            />
            <div className={styles.scale} aria-hidden="true">
                {marks.map(mark => (
                    <span key={mark.value}>{mark.label}</span>
                ))}
            </div>
        </div>
    );
}
