import {IRoom} from "../../interfaces/IRoom.tsx";
import RoomCard from "../../components/Cards/RoomCard/RoomCard.tsx";
import {IDevice} from "../../interfaces/IDevice.tsx";
import getDeviceComponent from "../../utils/getDeviceCard.tsx";
import {useEffect, useState} from "react";
import useFavouriteQuery from "../../hooks/queries/useFavouriteQuery.tsx";
import QueryInput from "../../components/ui/QueryInput/QueryInput.tsx";
import CardContainer from "../../components/ui/containers/CardContainer/CardContainer.tsx";
import PageContainer from "../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../components/ui/Headers/PageHeader/PageHeader.tsx";

export default function HomePage() {
  const [favouriteRoom, setFavouriteRoom] = useState<IRoom[]>([]);
  const [favouriteDevice, setFavouriteDevice] = useState([]);
  const { favouriteData } = useFavouriteQuery();
  useEffect(() => {
    if (!favouriteData) return;
    setFavouriteRoom(favouriteData.rooms);
    setFavouriteDevice(favouriteData.devices);
  }, [favouriteData]);

  function handleSearch(value: string) {
      const filter = value.toLowerCase();
      setFavouriteRoom(favouriteData.rooms.filter((room: IRoom) => {
          return room.name.toLowerCase().includes(filter)
      }));
      setFavouriteDevice(favouriteData.devices.filter((device: IDevice) => {
          return device.name.toLowerCase().includes(filter)
      }));
  }
  if (!favouriteDevice || !favouriteRoom) return null;
  return (
      <PageContainer>
        <PageHeader title="Dashboard" subtitle="Witaj z powrotem w Smart Home">
          <QueryInput onChange={handleSearch}/>
        </PageHeader>
        <CardContainer>
          {favouriteRoom.map((room: IRoom) => (
              <RoomCard key={room.id} room={room} />
          ))}
          {favouriteDevice.map((device: IDevice) => getDeviceComponent(device))}
        </CardContainer>
      </PageContainer>
  );
}