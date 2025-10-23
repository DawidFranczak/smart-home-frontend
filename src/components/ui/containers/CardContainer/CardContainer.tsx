import styles from "./CardContainer.module.css"
export default function CardContainer({children}: {children: React.ReactNode}) {
    return <div className={styles.cardContainer}>{children}</div>
}
