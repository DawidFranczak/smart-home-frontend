import styles from "./Tile.module.css"

interface ITileProps {
    children: React.ReactNode
    type?: "blue" | "danger"
    className?: string
}
export default function Tile ({children, type="blue",className}:ITileProps) {
    return <div className={`${styles.tile} ${styles[type]} ${className}`}>{children}</div>
}