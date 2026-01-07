import styles from "./RoomCard.module.css";
import Header from "../../ui/Headers/Header/Header";
import RoomVisibility from "../../ui/RoomVisibility/RoomVisibility";
import { IRoom } from "../../../interfaces/IRoom";
import {useTranslation} from "react-i18next";
import ThreeDot from "../../ui/ThreeDot/ThreeDot.tsx";

interface RoomCardProps {
  room: IRoom;
}

export default function RoomCard({ room }: RoomCardProps) {
  const {t} = useTranslation();
  return (
    <div className={styles.card}>
      <ThreeDot to={`/room/${room.id}/`}/>
      <RoomVisibility visibility={room.visibility} className={styles.lock} />
      <Header disable={false}>{room.name}</Header>
      <p style={{"margin":0}}>{room.device_count} {t("selectRoom.device")}</p>
    </div>
  );
}
