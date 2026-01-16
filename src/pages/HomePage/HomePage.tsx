import {IRoom} from "../../interfaces/IRoom.tsx";
import RoomCard from "../../components/Cards/RoomCard/RoomCard.tsx";
import {IDevice} from "../../interfaces/IDevice.tsx";
import getDeviceComponent from "../../utils/getDeviceCard.tsx";
import useFavouriteQuery from "../../hooks/queries/useFavouriteQuery.tsx";
import PageContainer from "../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../components/ui/Headers/PageHeader/PageHeader.tsx";
import useDevicesQuery from "../../hooks/queries/device/useDevicesQuery.tsx";
import useRoomsQuery from "../../hooks/queries/room/useRoomsQuery.tsx";
import { useTranslation } from "react-i18next";
import styles from "./HomePage.module.css";
import useCameraQuery from "../../hooks/queries/useCameraQuery.tsx";
import CameraCard from "../../components/Cards/CameraCard/CameraCard.tsx";
import {ICamera} from "../../interfaces/ICamera.tsx";
import MEASUREMENT_DEVICE_FUN from "../../constant/MEASUREMENT_DEVICE_FUN.ts"
export default function HomePage() {
    const { t } = useTranslation();
    const { favouriteData } = useFavouriteQuery();
    const {cameraData} = useCameraQuery();
    const { devices } = useDevicesQuery(favouriteData?.devices || []);
    const { rooms } = useRoomsQuery(favouriteData?.rooms || []);

    if (!devices || !rooms || !cameraData) return null;

    const measuredDevice:IDevice[] = devices.filter(device => MEASUREMENT_DEVICE_FUN.includes(device.fun));
    const normalDevice:IDevice[] = devices.filter(device => !MEASUREMENT_DEVICE_FUN.includes(device.fun));
    return (
      <PageContainer>
        <div className={styles.grid}>
            <PageHeader className={styles.header} title={t("home.title")} subtitle={t("home.subtitle")}>
            </PageHeader>

            <div className={`${styles.deviceContainer} ${styles.background}`}>
                <p className={styles.deviceTitle}>Urządzenia</p>
                <div className={styles.devices}>
                    {normalDevice.map((device: IDevice) => getDeviceComponent(device))}
                </div>
            </div>
            <div className={`${styles.measurementContainer} ${styles.background}`}>
                <p className={styles.deviceTitle}>Urządzenia pomiarowe</p>
                <div className={styles.measurement}>
                    {measuredDevice.map((device: IDevice) => getDeviceComponent(device))}
                </div>
            </div>
            <div className={`${styles.roomContainer} ${styles.background}`}>
                <p className={styles.roomTitle}>Pokoje</p>
                <div className={styles.rooms}>
                    {rooms.map((room: IRoom) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
            <div className={styles.cameraContainer}>
                    {cameraData?.map((camera:ICamera) => (
                        <CameraCard className={styles.cameraCard} key={camera.id} id={camera.id} name={camera.name} />
                    ))}
            </div>
        </div>
      </PageContainer>
    );
}