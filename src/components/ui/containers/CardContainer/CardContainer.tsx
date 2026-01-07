import styles from "./CardContainer.module.css"
interface CardContainerProps {
    children: React.ReactNode;
    className?: string,
}
export default function CardContainer({children,className}: CardContainerProps) {
    return <div className={`${styles.cardContainer} ${className}`}>{children}</div>
}
