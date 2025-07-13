import styles from "./CardIconContainer.module.css";

export default function CardIconContainer({children}:{children: React.ReactNode}) {
    return <div className={styles.container}>{children}</div>;
}