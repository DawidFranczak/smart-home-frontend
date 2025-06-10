import { useEffect, useState } from "react";
import useDeviceQuery from "../../../hooks/queries/useDeviceQuery";
import { IDevice } from "../../../interfaces/IDevice";
import QueryInput from "../../../ui/QueryInput/QueryInput";
import getDeviceComponent from "../../../utils/getDeviceCard";
import styles from "./DevicePage.module.css";
export default function Device() {
  const { deviceData } = useDeviceQuery();
  const [query, setQuery] = useState<IDevice[]>([]);
  useEffect(() => {
    if (deviceData) {
      setQuery(deviceData);
    }
  }, [deviceData]);

  const handleDeviceQuery = (value: string) => {
    const filter = value.toLowerCase();
    const dataToDisplay = deviceData.filter((device: IDevice) => {
      return device.name.toLowerCase().includes(filter);
    });
    setQuery(dataToDisplay);
  };

  if (!query) return null;
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <QueryInput onChange={handleDeviceQuery} />
      </div>
      <div className={styles.deviceContainer}>
        {query.map((item: IDevice) => getDeviceComponent(item))}
      </div>
    </div>
  );
}
