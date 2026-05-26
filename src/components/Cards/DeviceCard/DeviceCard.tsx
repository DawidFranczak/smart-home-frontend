import ThreeDot from "../../ui/ThreeDot/ThreeDot.tsx";
import Header from "../../ui/Headers/Header/Header.tsx";
import SvgIcon from "../../ui/SvgIcon/SvgIcon.tsx";
import styles from "./DeviceCard.module.css";
interface IProps {
    id:number;
    name: string;
    isOnline: boolean;
    svgId:string;

}

export default function DeviceCard({id,isOnline,name,svgId,}:IProps){
    return<>
        <div className={`${styles.card} ${isOnline ? styles.online : styles.offline}`}>
            <span className={styles.status} aria-hidden="true" />
            <div className={styles.content}>
                <ThreeDot to={`/devices/${id}`} />
                <div className={styles.iconShell}>
                    <SvgIcon svgId={svgId} />
                </div>
                <Header disable={!isOnline}>{name}</Header>
                <span className={styles.meta}>{isOnline ? "Online" : "Offline"}</span>
            </div>
        </div>
    </>
}
