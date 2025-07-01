import styles from './SelectCameraPage.module.css'
import CameraCard from "../../../components/Cards/CameraCard/CameraCard.tsx";
import {baseURL} from "../../../const/urls.ts";

export default function SelectCameraPage() {
    return(
        <div className={styles.container}>
            <CameraCard url= {`${baseURL}/stream/balkon/channel/0/hls/live/index.m3u8`}/>
        </div>
    )
}
