import { useState } from "react";

import styles from "./RoomCard.module.css";

import Header from "../../ui/Headers/Header/Header";
import FavouriteStar from "../../FavouriteStar/FavouriteStar";
import RoomVisibility from "../../ui/RoomVisibility/RoomVisibility";
import Button from "../../ui/Buttons/Button/Button";
import { useNavigate } from "react-router-dom";
import { IRoom } from "../../../interfaces/IRoom";
import CardIconContainer from "../../ui/containers/CardIconContainer/CardIconContainer.tsx";
import InfoCard from "../../ui/InfoCard/InfoCard.tsx";
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
    <div className={styles.card}>
      <FavouriteStar
        className={styles.star}
        isFavourite={isFavourite}
        onClick={handleFavouriteClick}
        id={room.id}
        type={"room"}
      />
      <RoomVisibility visibility={room.visibility} className={styles.lock} />
      <Header>{room.name}</Header>
      <CardIconContainer>
          <InfoCard className={styles.devicesInfo}>
              <p>Aktywne : {room.active_device_count}</p>
          </InfoCard>
          <InfoCard className={styles.devicesInfo}>
              <p>Wszystkie : {room.device_count}</p>
          </InfoCard>
      </CardIconContainer>
      <Button type="fancy" onClick={handleSelect}>Wybierz</Button>
    </div>
  );
}
