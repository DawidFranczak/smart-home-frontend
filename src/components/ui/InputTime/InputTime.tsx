import {useState, useEffect, useRef} from "react";
import styles from "./InputTime.module.css";

interface InputTimeProps {
  initialTime: string;
  onChange: (time: string) => void;
  label: string
  disabled?: boolean
}

const InputTime = ({
  initialTime,
  onChange,
  label,
  disabled=false
}: InputTimeProps) => {
  const [data, setData] = useState(initialTime);
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    onChange(data);
  }, [data]);

  const updateTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value.slice(0, 5));
  };

  const handleClick = () => {
    if(!ref.current) return;
    ref.current.showPicker();
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <label className={styles.label}>{label}</label>
        <input
            ref={ref}
            className={styles.input}
            type="time"
            step="60"
            onChange={updateTime}
            value={data.slice(0, 5)}
            disabled={disabled}
        />
    </div>
  );
};

export default InputTime;
