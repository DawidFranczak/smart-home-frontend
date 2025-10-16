import Button from "../../../components/ui/Buttons/Button/Button.tsx";
import { useParams } from "react-router-dom";
import useUnassignedDeviceQuery from "../../../hooks/queries/useUnassignedDeviceQuery.tsx";
import { IDevice } from "../../../interfaces/IDevice.tsx";
import useUnassignedDeviceMutation from "../../../hooks/queries/useUnassignedDeviceMutation.tsx";
import styles from "./DeviceAddPage.module.css";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import TilesContainer from "../../../components/ui/containers/TilesContainer/TilesContainer.tsx";
import Tile from "../../../components/ui/Tile/Tile.tsx";

export default function DeviceAddPage() {
  const params = useParams();
  const roomId = parseInt(params.id ? params.id : "0");
  const { status, unassignedDeviceData } = useUnassignedDeviceQuery();
  const { selectDevice } = useUnassignedDeviceMutation();
  const mutation = selectDevice();

  function addDevice(deviceId: number) {
    mutation.mutate({ deviceId, roomId });
  }
  if (!unassignedDeviceData) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
  console.log(unassignedDeviceData)
  return (
    <PageContainer>
      <PageHeader title="Przypisz urządzenie"></PageHeader>
      {(status === 404 || unassignedDeviceData.length === 0) && <p className={styles.noDevices}>Brak nowo dodanych urządzeń</p>}
      {status === 200 && (
          <TilesContainer>
            {unassignedDeviceData.map((device: IDevice) => (
              <Tile key={device.id}>
                <div className={styles.row} key={device.id}>
                  <p>{device.name}</p>
                  <p>{device.fun}</p>
                  <p>{device.last_seen.split("T")[1].slice(0, 5)}</p>
                  <Button onClick={() => addDevice(device.id)}>Przypisz</Button>
                </div>
              </Tile>              )
            )}
          </TilesContainer>
      )}
    </PageContainer>
  );
}
