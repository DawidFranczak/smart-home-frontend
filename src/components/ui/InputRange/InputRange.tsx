import styles from "./InputRange.module.css";

interface IInputRangeProps {
  name?: string;
  min: string;
  max: string;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
  step?: string;
  disabled?: boolean;
  error?: boolean;
  showValue?: boolean;
}

export default function InputRange({
                                     onChange,
                                     min,
                                     max,
                                     value,
                                     className,
                                     name,
                                     step = "1",
                                     disabled = false,
                                     error = false,
                                     showValue = false
                                   }: IInputRangeProps) {
  return (
      <div className={styles.container}>
        {name && (
            <span className={styles.label}>
          {name}
              {showValue && value !== undefined && ` ${value}${max === "100" ? "%" : ""}`}
        </span>
        )}
        <input
            className={`${styles.range} ${className || ""} ${error ? styles.error : ""}`}
            type="range"
            onChange={(e) => onChange && onChange(parseInt(e.target.value))}
            value={value || 0}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
        />
      </div>
  );
}