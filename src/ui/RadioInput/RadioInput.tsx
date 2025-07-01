import styles from "./RadioInput.module.css";
interface RadioInputProps {
  name: string;
  onSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  checked?: boolean;
}
const RadioInput = ({ name, onSelect, value, checked }: RadioInputProps) => {
  return (
    <div className={styles.container}>
      <input
        id={name}
        type="radio"
        name="select"
        value={value}
        className={styles.input}
        onChange={onSelect}
        defaultChecked={checked}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
};

export default RadioInput;
