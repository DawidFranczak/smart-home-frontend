import styles from "./FormField.module.css";

import React, { ChangeEvent } from "react";

interface FormFieldProps {
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  pattern?: string;
  inputMode?:
    | "search"
    | "email"
    | "tel"
    | "text"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
}

const FormField: React.FC<FormFieldProps> = ({
  onChange,
  type,
  name,
  placeholder,
  pattern,
  inputMode,
}: FormFieldProps) => {
  const regex = new RegExp(pattern ? pattern : ".*");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (regex.test(inputValue)) {
      onChange && onChange(event);
      return;
    }
    event.target.value = inputValue.slice(0, -1);
  };

  return (
    <input
      onChange={onChange ? (event) => handleChange(event) : () => {}}
      placeholder={placeholder}
      className={styles.field}
      type={type}
      name={name}
      inputMode={inputMode}
    />
  );
};

export default FormField;
