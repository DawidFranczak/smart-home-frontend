import styles from "./SvgIcon.module.css";
interface SvgIconProps {
  svg: string;
  alt: string;
  onClick?: () => void;
  className?: string;
}
export default function SvgIcon({
  onClick,
  svg,
  className,
  alt
}: SvgIconProps) {
  return (
      <div className={styles.bubble}>
        <img
          src={svg}
          alt={alt}
          onClick={onClick}
          width="42"
          height="42"
          className={`${styles.icon} ${className}`}
        />
      </div>
  );
}
