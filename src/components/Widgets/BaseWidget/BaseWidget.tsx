import styles from "./BaseWidget.module.css";

interface Props {
    children: React.ReactNode;
    name?: string;
    w?: number;
    h?: number;
    className?: string;
}

export default function BaseWidget({ name, children, w = 1, h = 1, className = '' }: Props) {
    return (
        <div
            className={`${styles.widget} ${name ? styles.hasName : ""} ${className}`}
            style={{
                '--col-span': w,
                '--row-span': h,
            } as React.CSSProperties}
        >
            {name && <p className={styles.name}>{name}</p>}
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}
