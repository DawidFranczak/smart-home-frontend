import IPeripheral from "../../../interfaces/IPeripheral.ts";
import peripheralFactory from "../../../utils/peripheralFactory.tsx";
import styles from "./DevicePage.module.css"
interface IProps {
    peripherals: IPeripheral[];
    isOnline: boolean;

}
export default function DevicePeripheralWrapper({peripherals, isOnline}: IProps) {
    return <div className={styles.gridContainer}>
        {peripherals.map((peripheral:IPeripheral) => peripheralFactory(peripheral, isOnline))}
    </div>
}
