import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../../ui/Button/Button";
import getDeviceComponent from "../../../utils/getDeviceCard";
import useRoomQuery from "../../../hooks/queries/useRoomQuery";
import QueryInput from "../../../ui/QueryInput/QueryInput";
import ButtonContainer from "../../../ui/ButtonContainer/ButtonContainer";
import StyledLink from "../../../ui/StyledLink/StyledLink";
import { IDevice } from "../../../interfaces/IDevice";
import styles from "./Room.module.css";

export default function Room() {
  const state = useParams();
  const { roomData } = useRoomQuery(Number(state.id));
  const [filtratedData, setFiltratedData] = useState<IDevice[]>([]);

  useEffect(() => {
    if (!roomData) return;
    setFiltratedData(roomData.device);
  }, [roomData]);

  function handleFilter(value: string) {
    if (!roomData) return;

    const filter = value.toLowerCase();
    const dataToDisplay = roomData.device.filter((device) => {
      return device.name.toLowerCase().includes(filter);
    });
    setFiltratedData(dataToDisplay);
  }

  if (!roomData) {
    return (
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <p>Loading...</p>
          </div>
        </div>
    );
  }

  return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.roomTitle}>
            {roomData.name}
          </h1>
        </div>

        <div className={styles.controlsSection}>
          <ButtonContainer>
            <Button callback={()=> {}}>Edytuj</Button>
            <StyledLink type="button" to={`/room/${state.id}/add`}>
              Dodaj urządzenie
            </StyledLink>
            <QueryInput
                onChange={handleFilter}
            />
          </ButtonContainer>
        </div>

        <div className={styles.contentSection}>
          {filtratedData.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Nie znaleziono urządzeń</p>
              </div>
          ) : (
              <div className={styles.deviceContainer}>
                {filtratedData.map((device: IDevice) =>
                    getDeviceComponent(device)
                )}
              </div>
          )}
        </div>
      </div>
  );
}