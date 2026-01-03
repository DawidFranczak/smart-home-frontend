import styles from "./Header.module.css";

interface HeaderProps {
  disable:boolean
  children: React.ReactNode;
}
export default function Header({ children, disable}: HeaderProps) {
  return <p className={`${styles.basic} ${disable?styles.disabled:""}`}>{children}</p>;
}
