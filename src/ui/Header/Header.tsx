import styles from "./Header.module.css";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}
export default function Header({ children, className }: HeaderProps) {
  return <h1 className={`${styles.basic} ${className}`}>{children}</h1>;
}
