import styles from "./Header.module.css";

interface HeaderProps {
  disable:boolean
  children: React.ReactNode;
  className?: string;
}
export default function Header({ children, disable, className}: HeaderProps) {
  return <p className={`${styles.basic} ${disable?styles.disabled:""} ${className}`}>{children}</p>;
}
