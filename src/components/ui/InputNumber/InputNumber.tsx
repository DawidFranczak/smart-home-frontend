import styles from "./InputNumber.module.css";

interface InputNumberProps {
  name: string;
  onChange?: (value: number) => void;
  value?: number;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  error?: boolean;
}

export default function InputNumber({
                                      value,
                                      onChange,
                                      name,
                                      placeholder,
                                      min,
                                      max,
                                      step = 1,
                                      disabled = false,
                                      error = false,
                                    }: InputNumberProps) {
  return (
      <div className={styles.container}>
        <label className={styles.label}>{name}</label>
        <input
            className={`${styles.input} ${error ? styles.error : ''}`}
            type="number"
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) =>
                onChange ? onChange(parseInt(e.target.value) || 0) : () => {}
            }
            value={value || ''}
        />
      </div>
  );
}