import styles from "./StatusIndicator.module.css";

interface IStatusIndicatorProps {
  color: string;
  size?: "small" | "medium" | "large" | "xlarge";
}

export default function StatusIndicator({
    color,
    size="medium"
}: IStatusIndicatorProps) {
  return (
      <div
        className={`${styles.dot} ${styles[size]}`}
        style={{
          backgroundColor: color,
        }}
      ></div>
  );
}
