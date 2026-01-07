import styles from "./DeviceCardContainer.module.css";
import Header from "../../Headers/Header/Header.tsx";
import ThreeDot from "../../ThreeDot/ThreeDot.tsx";
import SvgIcon from "../../SvgIcon/SvgIcon.tsx";
interface IDeviceCardContainerProps {
  name: string;
  isOnline: boolean;
  to:string;
  alt: string;
  svg: string;
  children?: React.ReactNode;
}

export default function DeviceCardContainer({
  name,
  isOnline,
  children,
  to,
    alt,
    svg
}: IDeviceCardContainerProps) {

  return (
    <div className={styles.card}>
     <div className={styles.content}>
       <ThreeDot to={to}/>
       <SvgIcon svg={svg} alt={alt} />
       <Header disable={!isOnline}>{name}</Header>
     </div>
       {children}
    </div>
  );
}
