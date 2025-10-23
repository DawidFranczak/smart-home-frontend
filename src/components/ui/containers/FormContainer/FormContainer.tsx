import styles from "./FormContainer.module.css"
interface FormContainerProps{
    children: React.ReactNode,
    onTop?: boolean
    className?: string
}
export default function FormContainer({children ,className, onTop=false}: FormContainerProps) {
    return <div className={`${styles.container} ${onTop && styles.onTop} ${className}`}>
        <div className={styles.topAccent}></div>
        {children}
    </div>
}
