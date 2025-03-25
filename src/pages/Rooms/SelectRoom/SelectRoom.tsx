import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { IRoom } from "../../../interfaces/IRoom.tsx";

import Button from "../../../ui/Button/Button.tsx";
import AddRoom from "../../../components/AddRoom/AddRoom.tsx";

import useFetch from "../../../hooks/useFetch.tsx";
import { api } from "../../../const/api.ts";
import RoomCard from "../../../components/Cards/RoomCard/RoomCard.tsx";

import styles from "./SelectRoom.module.css";
export default function SelectRoom() {
  const [opneAddRoom, setOpneAddRoom] = useState<boolean>(false);
  const { readData } = useFetch();
  const { data } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => readData(api.room),
    staleTime: 10 * 60 * 60 * 1000,
  });
  return (
    <>
      <Button callback={() => setOpneAddRoom(true)}>Dodaj</Button>
      {opneAddRoom && <AddRoom onClose={() => setOpneAddRoom(false)} />}
      <div className={styles.rooms}>
        {data?.data.map((room: IRoom) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </div>
    </>
  );
}
