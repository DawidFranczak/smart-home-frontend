import usePrefetchDeviceQuery from "../../../hooks/queries/device/usePrefetchDeviceQuery.tsx";
import { IDevice } from "../../../interfaces/IDevice";
import getDeviceComponent from "../../../utils/getDeviceCard";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import {useTranslation} from "react-i18next";
import MEASUREMENT_DEVICE_FUN from "../../../constant/MEASUREMENT_DEVICE_FUN.ts"
import styles from "./DevicePage.module.css";
export default function Device() {
  const { deviceData } = usePrefetchDeviceQuery();
  const {t} = useTranslation();


  if (!deviceData) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
  const measuredDevice:IDevice[] = deviceData.filter(device => MEASUREMENT_DEVICE_FUN.includes(device.fun));
  const normalDevice:IDevice[] = deviceData.filter(device => !MEASUREMENT_DEVICE_FUN.includes(device.fun));
  return (
    <PageContainer>
      <PageHeader title={t("device.title")}>
      </PageHeader>
      <div className={styles.wrapper}>
        <div className={`${styles.measurementContainer} ${styles.background}`}>
          <p className={styles.deviceTitle}>Urządzenia pomiarowe</p>
          <div className={styles.measurement}>
            {measuredDevice.map((device: IDevice) => getDeviceComponent(device))}
          </div>
        </div>
        <div className={`${styles.deviceContainer} ${styles.background}`}>
          <p className={styles.deviceTitle}>Urządzenia</p>
          <div className={styles.devices}>
            {normalDevice.map((device: IDevice) => getDeviceComponent(device))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
