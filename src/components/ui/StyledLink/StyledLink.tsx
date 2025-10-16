import { Link } from "react-router-dom";
import styles from "./StyledLink.module.css";

interface IStyledLinkProps {
  children: React.ReactNode;
  to: string;
  type?: "primary" | "secondary" | "success" | "danger"| "fancy";
}

export default function StyledLink({
  children,
  to,
  type="primary"
}: IStyledLinkProps) {
  return (
    <Link
      to={to}
      className={`${styles.button} ${styles[type]}`}
    >
      {children}
    </Link>
  );
}
