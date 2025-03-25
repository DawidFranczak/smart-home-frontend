import styles from "./SelectInput.module.css";
interface SelectInputProps {
  name: string;
  onSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  checked?: boolean;
}
const SelectInput = ({ name, onSelect, value, checked }: SelectInputProps) => {
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

export default SelectInput;
