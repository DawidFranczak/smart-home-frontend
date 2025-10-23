import styles from "./NavbarIcon.module.css";
interface NavbarIconProps {
  onClick?: () => void;
  svg: string;
  className?: string;
}
export default function NavbarIcon({
  onClick,
  svg,
  className,
}: NavbarIconProps) {
  return (
    <img
      src={svg}
      onClick={onClick}
      width="42"
      height="42"
      className={`${styles.icon} ${className}`}
    />
  );
}
