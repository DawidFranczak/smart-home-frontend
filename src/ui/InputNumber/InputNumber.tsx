import styles from "./InputNumber.module.css";
interface InputNumberProps {
  className?: string;
  onChange?: (value: number) => void;
  value?: number;
}
export default function InputNumber({
  value,
  onChange,
  className,
}: InputNumberProps) {
  return (
    <input
      className={`${styles.input} ${className}`}
      type="number"
      onChange={(e) =>
        onChange ? onChange(parseInt(e.target.value)) : () => {}
      }
      value={value}
    />
  );
}
