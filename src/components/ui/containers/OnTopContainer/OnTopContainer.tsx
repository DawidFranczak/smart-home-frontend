
import styles from './OnTopContainer.module.css';
export default function OnTopContainer({ children }:{children: React.ReactNode}) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}