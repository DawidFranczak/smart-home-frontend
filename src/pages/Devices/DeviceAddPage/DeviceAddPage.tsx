import BackArrow from "../../../ui/BackArrow/BackArrow.tsx";
import Button from "../../../ui/Button/Button.tsx";
import Header from "../../../ui/Header/Header.tsx";
import { useParams } from "react-router-dom";
import useUnassignedDeviceQuery from "../../../hooks/queries/useUnassignedDeviceQuery.tsx";
import { IDevice } from "../../../interfaces/IDevice.tsx";
import useUnassignedDeviceMutation from "../../../hooks/queries/useUnassignedDeviceMutation.tsx";
import styles from "./DeviceAddPage.module.css";

export default function DeviceAddPage() {
  const params = useParams();
  const { status, unassignedDeviceData } = useUnassignedDeviceQuery();
  const { selectDevice } = useUnassignedDeviceMutation();
  const mutation = selectDevice();
  const roomId = parseInt(params.id ? params.id : "0");

  function addDevice(deviceId: number) {
    mutation.mutate({ deviceId, roomId });
  }
  return (
    <div className={styles.container}>
      <BackArrow className={styles.backArrow} />
      <Header className={styles.header}>Przypisz urządzenie</Header>
      {status === 404 && <p>Brak nowo dodanych urządzeń</p>}
      {status === 200 &&
        unassignedDeviceData.map((device: IDevice) => (
          <div className={styles.row} key={device.id}>
            <p>{device.fun}</p>
            <p>{device.last_seen.split("T")[1].slice(0, 5)}</p>
            <Button callback={() => addDevice(device.id)}>Przypisz</Button>
          </div>
        ))}
    </div>
  );
}
