import styles from './PageContainer.module.css'
interface PageContainerProps {
    children: React.ReactNode
    className?: string
}
export default function PageContainer({children, className}: PageContainerProps) {

    return (
        <div className={`${styles.container} ${className}`}>
            {children}
        </div>
    )
}