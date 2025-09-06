
import { ChangeEvent, useState } from "react";

import styles from "./FormField.module.css";
import Message from "../Message/Message.tsx";

interface FormFieldProps {
  name: string;
  error?: string;
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

export default function FormField ({
                                     onChange,
                                     error,
                                     type,
                                     name,
                                     placeholder,
                                     pattern,
                                     inputMode,
                                   }: FormFieldProps){
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const regex = new RegExp(pattern ? pattern : ".*");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setHasValue(inputValue.length > 0);

    if (regex.test(inputValue)) {
      onChange && onChange(event);
      return;
    }
    event.target.value = inputValue.slice(0, -1);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(event.target.value.length > 0);
  };

  return (
      <div className={styles.container}>
        <label
            className={`${styles.label} ${(isFocused || hasValue) ? styles.labelFloating : ''}`}
            htmlFor={name}
        >
          {placeholder}
        </label>
        <input
            id={name}
            onChange={onChange ? (event) => handleChange(event) : () => {}}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`${styles.field} ${error ? styles.error : ""}`}
            type={type}
            name={name}
            inputMode={inputMode}
        />
      <Message type="error" show={!!error}>{error}</Message>
      </div>
  );
};