import {Badge, Divider, Panel} from "rsuite";
import styles from "./DeviceEventSection.module.css";
import DeviceEventDisplay from "../DeviceEventDisplay/DeviceEventDisplay";
import IEvent from "../../interfaces/IEvent.tsx";
interface IDeviceEventSectionProps {
    events: IEvent[]|undefined;
    description?: string;
}
export default function DeviceEventSection({events, description}: IDeviceEventSectionProps) {
    return(
        <Panel className={styles.section} bordered>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>
                    <h3>⚡ Aktywne zdarzenia</h3>
                    <Badge content={events?.length} color="blue" />
                </div>
                <p className={styles.sectionDesc}>
                    {description}
                </p>
            </div>
            <Divider className={styles.divider} />
            {events && events.length > 0 && (
                <div className={styles.eventsGrid}>
                    {events.map((event) => (
                        <DeviceEventDisplay
                            key={event.id}
                            event={event}
                        />
                    ))}
                </div>
            )}
        </Panel>
    )
}