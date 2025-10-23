import styles from './InfoCard.module.css'
interface IInfoCardProps{
    children: React.ReactNode;
    icon?: string;
    className?: string
}
export default function InfoCard({icon, children, className}: IInfoCardProps) {
    return (
        <div className={`${styles.statMini} ${className}`}>
            <span className={styles.icon}>{icon}</span>
            <span className={styles.value}>{children}</span>
        </div>
    )
}