import styles from "./Header.module.css";

interface HeaderProps {
  children: React.ReactNode;
}
export default function Header({ children }: HeaderProps) {
  return <p className={`${styles.basic}`}>{children}</p>;
}
