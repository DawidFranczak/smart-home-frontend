import useRouterQuery from "../../hooks/queries/useRouterQuery";
import AddRouter from "../../components/AddRouter/AddRouter";
import DeviceContainer from "../../ui/DeviceContainer/DeviceContainer";
import styles from "./RouterPage.module.css";
export default function RouterPage() {
  const { routerData, status } = useRouterQuery();
  if (!routerData) return null;
  const data = routerData[0];
  if (status === 404) return <AddRouter />;
  return (
    <DeviceContainer
      name="Ruter"
      wifi_strength={data.wifi_strength}
      is_online={data.is_online}
      className={styles.container}
      id={data.id}
    >
      <p>IP: {data.ip}</p>
      <p>Mac: {data.mac}</p>
      <p>Przypisane urządzenia: {data.connected_devices}</p>
      <p>Urządzenia aktywne: {data.online_device}</p>
    </DeviceContainer>
  );
}
