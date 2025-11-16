import { Panel } from "rsuite";
import useRouterQuery from "../../hooks/queries/useRouterQuery";
import LoadingAnimation from "../../components/ui/LoadingAnimation/LoadingAnimation";
import WifiStrength from "../../components/ui/WiFiStrength/WiFiStrength";
import styles from "./RouterPage.module.css";
import AddRouter from "../../components/AddRouter/AddRouter.tsx";
import PageHeader from "../../components/ui/Headers/PageHeader/PageHeader.tsx";
import PageContainer from "../../components/ui/containers/PageContainer/PageContainer.tsx";
import {useTranslation} from "react-i18next";

export default function RouterPage() {
    const { routerData, status } = useRouterQuery();
    const {t} = useTranslation();
    if (!routerData) return <LoadingAnimation size="xlarge" type="spinner" glow />;
    const data = routerData[0];

    if (status === 404) return <AddRouter />;
    return (
        <PageContainer>
            <PageHeader title={t("router.title")}>
                <WifiStrength strength={data.is_online ? 0 : -100} size="large" />
            </PageHeader>

            <Panel className={styles.infoPanel} bordered>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <span className={styles.infoIcon}>🌐</span>
                        <span className={styles.infoLabel}>{t("router.ip")}</span>
                        <span className={styles.infoValue}>{data.ip}</span>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoIcon}>💻</span>
                        <span className={styles.infoLabel}>{t("router.mac")}</span>
                        <span className={styles.infoValue}>{data.mac}</span>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoIcon}>📶</span>
                        <span className={styles.infoLabel}>{t("router.assignedDevices")}</span>
                        <span className={styles.infoValue}>{data.connected_devices}</span>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoIcon}>💡</span>
                        <span className={styles.infoLabel}>{t("router.activeDevices")}</span>
                        <span className={styles.infoValue}>{data.online_device}</span>
                    </div>
                </div>
            </Panel>
        </PageContainer>
    );
}
