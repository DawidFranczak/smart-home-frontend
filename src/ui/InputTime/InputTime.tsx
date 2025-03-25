import { useState, useEffect } from "react";
import styles from "./InputTime.module.css";

interface InputTimeProps {
  initialTime: string;
  onChange: (time: string) => void;
  className?: string;
}

const InputTime = ({
  initialTime,
  onChange: onChanege,
  className,
}: InputTimeProps) => {
  const [data, setData] = useState(initialTime);

  useEffect(() => {
    onChanege(data);
  }, [data]);

  const updateTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value.slice(0, 5));
  };

  return (
    <input
      className={`${styles.input} ${className}`}
      type="time"
      step="60"
      onChange={updateTime}
      value={data.slice(0, 5)}
    />
  );
};

export default InputTime;
