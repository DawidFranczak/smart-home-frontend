import style from "./Button.module.css";

import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  callback?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

function Button({ callback, className, children }: ButtonProps) {
  return (
    <button className={`${style.button} ${className}`} onClick={callback}>
      {children}
    </button>
  );
}

export default Button;
