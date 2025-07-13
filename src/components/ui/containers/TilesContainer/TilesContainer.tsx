import styles from "./TilesContainer.module.css";

export default function TilesContainer({ children }: { children: React.ReactNode }) {
    return <div className={styles.tilesContainer}>{children}</div>;
}