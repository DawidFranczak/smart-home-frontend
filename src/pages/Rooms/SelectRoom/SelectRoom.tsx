import { useState,useEffect } from "react";

import { IRoom } from "../../../interfaces/IRoom.tsx";

import AddRoom from "../../../components/AddRoom/AddRoom.tsx";

import RoomCard from "../../../components/Cards/RoomCard/RoomCard.tsx";

import usePrefetchRoomQuery from "../../../hooks/queries/room/usePrefetchRoomQuery.tsx";
import QueryInput from "../../../components/ui/QueryInput/QueryInput.tsx";
import CardContainer from "../../../components/ui/containers/CardContainer/CardContainer.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import styles from "./SelectRoom.module.css";
import {Button} from "rsuite";

export default function SelectRoom() {
    const [dataToDisplay, setDataToDisplay] = useState<IRoom[]>([]);
    const [openAddRoom, setOpenAddRoom] = useState<boolean>(false);
    const { roomData }: { roomData: IRoom[] } = usePrefetchRoomQuery()

    useEffect(() => {
        if (!roomData) return;
        setDataToDisplay(roomData);
    }, [roomData]);

  function handleFilter(value: string) {
      const filter = value.toLowerCase();
      setDataToDisplay(roomData.filter((device) => {
        return device.name.toLowerCase().includes(filter);
      }));
  }
 if (!roomData) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
  return (
    <PageContainer>
      <PageHeader title="Pokoje" className={styles.header}>
          <div className={styles.buttonContainer}>
              <QueryInput onChange={handleFilter}/>
              <Button
                  appearance="default"
                  onClick={() => setOpenAddRoom(true)}
                  className={styles.addButton}
              >
                  Dodaj
              </Button>
          </div>
      </PageHeader>
      <AddRoom show={openAddRoom} onClose={() => setOpenAddRoom(false)} />
      <CardContainer>
        {dataToDisplay.map((room: IRoom) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </CardContainer>
    </PageContainer>
  );
}
