import { useState } from "react";

import styles from "./RoomCard.module.css";

import Header from "../../../ui/Header/Header";
import FavouriteStar from "../../FavouriteStar/FavouriteStar";
import RoomVisibility from "../../../ui/RoomVisibility/RoomVisibility";
import Button from "../../../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { IRoom } from "../../../interfaces/IRoom";
interface RoomCardProps {
  room: IRoom;
}

export default function RoomCard({ room }: RoomCardProps) {
  const [isFavourite, setIsFavourite] = useState(room.is_favourite);
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/room/${room.id}/`);
  };

  const handleFavouriteClick = () => setIsFavourite(!isFavourite);

  return (
    <div className={styles.container}>
      <FavouriteStar
        className={styles.star}
        isFavourite={isFavourite}
        onClick={handleFavouriteClick}
        id={room.id}
        type={"room"}
      />
      <RoomVisibility visibility={room.visibility} className={styles.lock} />
      <Header>{room.name}</Header>
      <p>Aktywne urządzenia: {room.active_device_count}</p>
      <p>Wszystkie urządzenia: {room.device_count}</p>
      <Button callback={handleSelect}>Wybierz</Button>
    </div>
  );
}
