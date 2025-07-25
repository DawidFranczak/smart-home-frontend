import { useState,useEffect } from "react";

import { IRoom } from "../../../interfaces/IRoom.tsx";

import Button from "../../../components/ui/Buttons/Button/Button.tsx";
import AddRoom from "../../../components/AddRoom/AddRoom.tsx";

import RoomCard from "../../../components/Cards/RoomCard/RoomCard.tsx";

import usePrefetchRoomQuery from "../../../hooks/queries/room/usePrefetchRoomQuery.tsx";
import QueryInput from "../../../components/ui/QueryInput/QueryInput.tsx";
import CardContainer from "../../../components/ui/containers/CardContainer/CardContainer.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import ButtonContainer from "../../../components/ui/containers/ButtonContainer/ButtonContainer.tsx";

export default function SelectRoom() {
    const [dataToDisplay, setDataToDisplay] = useState<IRoom[]>([]);
    const [openAddRoom, setOpenAddRoom] = useState<boolean>(false);
    const { roomData }: { roomData: IRoom[] } = usePrefetchRoomQuery(undefined)

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
      <PageHeader title="Pokoje">
         <ButtonContainer>
             <QueryInput onChange={handleFilter}/>
             <Button type="fancy" onClick={() => setOpenAddRoom(true)}>Dodaj</Button>
         </ButtonContainer>
      </PageHeader>
      {openAddRoom && <AddRoom onClose={() => setOpenAddRoom(false)} />}
      <CardContainer>
        {dataToDisplay.map((room: IRoom) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </CardContainer>
    </PageContainer>
  );
}
