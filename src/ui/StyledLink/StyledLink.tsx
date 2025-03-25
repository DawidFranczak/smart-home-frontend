import { Link } from "react-router-dom";
import styles from "./StyledLink.module.css";
interface IStyledLinkProps {
  children: React.ReactNode;
  className?: string;
  to: string;
  type?: string;
}

export default function StyledLink({
  children,
  className,
  to,
  type,
}: IStyledLinkProps) {
  return (
    <Link
      to={to}
      className={`${styles.link} ${className} ${type && styles[type]}`}
    >
      {children}
    </Link>
  );
}
