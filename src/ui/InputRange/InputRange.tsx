import styles from "./InputRange.module.css";
interface IInputRangeProps {
  min: string;
  max: string;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export default function InputRange({
  onChange,
  min,
  max,
  value,
  className,
}: IInputRangeProps) {
  return (
    <input
      className={`${styles.range} ${className}`}
      type="range"
      onChange={(e) => onChange && onChange(parseInt(e.target.value))}
      value={value}
      min={min}
      max={max}
    />
  );
}
