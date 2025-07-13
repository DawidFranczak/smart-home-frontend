import styles from "./RadioInput.module.css";

interface RadioInputProps {
    name: string;
    onSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    checked?: boolean;
    disabled?: boolean;
    error?: boolean;
    className?: string;
    groupName?: string;
}

export default function RadioInput (
    {
        name,onSelect,value,checked = false,disabled = false, error = false,className = "",groupName = "select"
    }: RadioInputProps){

    const containerClasses = `
    ${styles.container} 
    ${disabled ? styles.disabled : ""} 
    ${error ? styles.error : ""} 
    ${className}
  `.trim();

    return (
        <div className={containerClasses}>
            <input
                id={`${groupName}-${value}`}
                type="radio"
                name={groupName}
                value={value}
                className={styles.input}
                onChange={onSelect}
                defaultChecked={checked}
                disabled={disabled}
                aria-describedby={error ? `${groupName}-error` : undefined}
            />
            <label htmlFor={`${groupName}-${value}`}>{name}</label>
        </div>
    );
};
