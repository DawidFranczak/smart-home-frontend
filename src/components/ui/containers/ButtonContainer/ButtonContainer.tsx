import styles from "./ButtonContainer.module.css";

interface ButtonContainerProps {
  children: React.ReactNode;
}

export default function ButtonContainer({ children }: ButtonContainerProps) {
  return <div className={styles.buttonContainer}>{children}</div>;
}
