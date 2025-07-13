import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getDeviceComponent from "../../../utils/getDeviceCard";
import useRoomQuery from "../../../hooks/queries/useRoomQuery";
import QueryInput from "../../../components/ui/QueryInput/QueryInput";
import ButtonContainer from "../../../components/ui/containers/ButtonContainer/ButtonContainer";
import StyledLink from "../../../components/ui/StyledLink/StyledLink";
import { IDevice } from "../../../interfaces/IDevice";
import styles from "./Room.module.css";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import CardContainer from "../../../components/ui/containers/CardContainer/CardContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";

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
    const dataToDisplay = roomData.device.filter((device:IDevice) => {
      return device.name.toLowerCase().includes(filter);
    });
    setFiltratedData(dataToDisplay);
  }

  if (!filtratedData || !roomData) {
    return (<LoadingAnimation size="xlarge" type="spinner" glow={true}/>)
  }

  return (
      <PageContainer>
        <PageHeader title={roomData.name}>
          <ButtonContainer>
            <QueryInput
                onChange={handleFilter}
            />
            <StyledLink type="fancy" to={`/room/${state.id}/settings`}>Edytuj</StyledLink>
            <StyledLink type="fancy" to={`/room/${state.id}/add`}>
              Dodaj urządzenie
            </StyledLink>
          </ButtonContainer>
        </PageHeader>
          {filtratedData.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Nie znaleziono urządzeń</p>
              </div>
          ) : (
              <CardContainer>
                {filtratedData?.map((device: IDevice) =>
                    getDeviceComponent(device)
                )}
              </CardContainer>
          )}
      </PageContainer>
  );
}