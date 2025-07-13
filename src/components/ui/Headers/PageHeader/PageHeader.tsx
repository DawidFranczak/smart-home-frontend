import styles from "./PageHeader.module.css"
interface IPageHeaderProps {
    children?: React.ReactNode
    className?: string
    title?: string
    subtitle?: string
}
export default function PageHeader({children, className,title, subtitle}:IPageHeaderProps) {
    return (
        <div className={`${styles.pageHeader} ${className}`}>
        <div>
            { title && <h1 className={styles.title}>{title}</h1> }
            { subtitle && <p className={styles.subtitle}>{subtitle}</p> }
        </div>
            {children}
        </div>
    )
}