import styles from "./StatusIndicator.module.css";

interface IStatusIndicatorProps {
  children: React.ReactNode;
  color: string;
}

export default function StatusIndicator({
  color,
  children,
}: IStatusIndicatorProps) {
  return (
    <div className={styles.container}>
      {children}
      <div
        className={styles.dot}
        style={{
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
}
