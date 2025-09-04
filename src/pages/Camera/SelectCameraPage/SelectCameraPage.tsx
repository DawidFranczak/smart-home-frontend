import styles from './SelectCameraPage.module.css'
import CameraCard from "../../../components/Cards/CameraCard/CameraCard.tsx";

export default function SelectCameraPage() {
    return(
        <div className={styles.container}>
            <CameraCard id={1} name={"test"}/>
        </div>
    )
}
