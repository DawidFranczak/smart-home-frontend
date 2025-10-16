import styles from "./QueryInput.module.css";
import searchIcon from "/static/svg/search.svg";
import { useRef, useState } from "react";
interface IQueryInputProps {
  onChange: (value: string) => void;
  className?: string;
}
export default function QueryInput({ onChange, className }: IQueryInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleIconClick() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsExpanded((prev) => !prev);
  }

  return (
    <div className={`${styles.container} ${isExpanded && styles.expanded}`}>
      <img
        src={searchIcon}
        className={styles.searchIcon}
        onClick={handleIconClick}
      />
      <input
        ref={inputRef}
        type="text"
        onChange={(event) => onChange(event.target.value)}
        className={`${styles.input} ${
          isExpanded && styles.expanded
        } ${className}`}
      />
    </div>
  );
}
