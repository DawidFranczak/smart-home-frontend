import style from "./Button.module.css";

import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "primary" | "secondary" | "success" | "danger"| "fancy" | "form-primary" | "form-secondary";
  className?: string
}

export default function Button({ onClick, children, className, type = "primary" }: ButtonProps) {
  return (
    <button className={`${style.button} ${style[type]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

