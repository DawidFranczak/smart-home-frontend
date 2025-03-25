import { useParams } from "react-router-dom";
import Button from "../../../ui/Button/Button";
import getDeviceComponent from "../../../utils/getDeviceCard";
import useRoomQuery from "../../../hooks/queries/useRoomQuery";

import styles from "./Room.module.css";
import QueryInput from "../../../ui/QueryInput/QueryInput";
import { useEffect, useState } from "react";
import ButtonContainer from "../../../ui/ButtonContainer/ButtonContainer";
import StyledLink from "../../../ui/StyledLink/StyledLink";
import { IDevice } from "../../../interfaces/IDevice";
export default function Room() {
  const state = useParams();
  const { roomData } = useRoomQuery(Number(state.id));
  const [filtratedData, setFiltratedData] = useState<IDevice[]>([]);

  useEffect(() => {
    if (!roomData) return;
    setFiltratedData(roomData.device);
  }, [roomData]);

  function handleFilter(value: string) {
    const filter = value.toLowerCase();
    const dataToDisplay = roomData.device.filter((device) => {
      return device.name.toLowerCase().includes(filter);
    });
    setFiltratedData(dataToDisplay);
  }

  if (!roomData) return <div></div>;
  return (
    <div className={styles.container}>
      <ButtonContainer>
        <Button>Edytuj</Button>
        <QueryInput onChange={handleFilter} />
        <StyledLink type="button" to={`/room/${state.id}/add`}>
          Dodaj urządzenie
        </StyledLink>
      </ButtonContainer>
      <div className={styles.deviceContainer}>
        {filtratedData.map((device: IDevice) => getDeviceComponent(device))}
      </div>
    </div>
  );
}
