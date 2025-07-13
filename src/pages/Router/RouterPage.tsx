import useRouterQuery from "../../hooks/queries/useRouterQuery";
import AddRouter from "../../components/AddRouter/AddRouter";
import PageContainer from "../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../components/ui/Headers/PageHeader/PageHeader.tsx";
import WifiStrength from "../../components/ui/WiFiStrength/WiFiStrength.tsx";
import TilesContainer from "../../components/ui/containers/TilesContainer/TilesContainer.tsx";
import Tile from "../../components/ui/Tile/Tile.tsx";
import LoadingAnimation from "../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import styles from "./RouterPage.module.css";
export default function RouterPage() {
  const { routerData, status } = useRouterQuery();
  if (!routerData) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
  const data = routerData[0];
  if (status === 404) return <AddRouter />;
  return (
      <PageContainer>
        <PageHeader title="Router">
          <WifiStrength strength={data.is_online ? 0 : -100} size="large" />
        </PageHeader>
        <TilesContainer>
          <Tile>
            <div className={styles.data}><p>IP:</p> {data.ip}</div>
          </Tile>
          <Tile>
            <div className={styles.data}><p>Mac:</p> {data.mac}</div>
          </Tile>
          <Tile>
            <div className={styles.data}><p>Przypisane urządzenia:</p> {data.connected_devices}</div>
          </Tile>
          <Tile>
            <div className={styles.data}><p>Urządzenia aktywne:</p> {data.online_device}</div>
          </Tile>
        </TilesContainer>
      </PageContainer>
    );
}
