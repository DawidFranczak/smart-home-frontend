import styles from "./DeviceCardContainer.module.css";
import Header from "../../Headers/Header/Header.tsx";
import ThreeDot from "../../ThreeDot/ThreeDot.tsx";

interface IDeviceCardContainerProps {
  name: string;
  isOnline: boolean;
  to:string;
  children?: React.ReactNode;
}

export default function DeviceCardContainer({
  name,
  isOnline,
  children,
                                              to
}: IDeviceCardContainerProps) {

  return (
    <div className={styles.card}>
      <ThreeDot to={to}/>
      <Header disable={!isOnline}>{name}</Header>
      {children}
    </div>
  );
}
