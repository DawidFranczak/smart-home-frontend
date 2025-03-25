import { useEffect, useState } from "react";
import RoomCard from "../../components/Cards/RoomCard/RoomCard";
import useFavouriteQuery from "../../hooks/queries/useFavouriteQuery";
import getDeviceComponent from "../../utils/getDeviceCard";
import styles from "./HomePage.module.css";
import { IRoom } from "../../interfaces/IRoom";
import { IDevice } from "../../interfaces/IDevice";

export default function HomePage() {
  const [favouriteRoom, setFavouriteRoom] = useState<IRoom[]>([]);
  const [favouriteDevice, setFavouriteDevice] = useState([]);
  const { favouriteData } = useFavouriteQuery();
  useEffect(() => {
    if (!favouriteData) return;
    setFavouriteRoom(favouriteData.rooms);
    setFavouriteDevice(favouriteData.devices);
  }, [favouriteData]);
  if (!favouriteData) return null;
  return (
    <div className={styles.container}>
      {favouriteRoom.map((room: IRoom) => (
        <RoomCard key={room.id} room={room} />
      ))}
      {favouriteDevice.map((device: IDevice) => getDeviceComponent(device))}
    </div>
  );
}
