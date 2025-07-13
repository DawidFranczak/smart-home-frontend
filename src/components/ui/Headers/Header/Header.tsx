import styles from "./Header.module.css";

interface HeaderProps {
  children: React.ReactNode;
}
export default function Header({ children }: HeaderProps) {
  return <h1 className={`${styles.basic}`}>{children}</h1>;
}
