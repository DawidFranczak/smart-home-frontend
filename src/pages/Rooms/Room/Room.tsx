import { useParams } from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import getDeviceComponent from "../../../utils/getDeviceCard";
import QueryInput from "../../../components/ui/QueryInput/QueryInput";
import ButtonContainer from "../../../components/ui/containers/ButtonContainer/ButtonContainer";
import StyledLink from "../../../components/ui/StyledLink/StyledLink";
import { IDevice } from "../../../interfaces/IDevice";
import styles from "./Room.module.css";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import CardContainer from "../../../components/ui/containers/CardContainer/CardContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import useDevicesQuery from "../../../hooks/queries/device/useDevicesQuery.tsx";
import useRoomQuery from "../../../hooks/queries/room/useRoomQuery.tsx";
export default function Room() {
  const state = useParams();
  const { room } = useRoomQuery(state.id? parseInt(state.id):0);
  const deviceIds = useMemo(()=>room?.device || [],[room?.device?.length, room?.device?.join(',')])
  const { devices } = useDevicesQuery(deviceIds);
  const [filtratedData, setFiltratedData] = useState<IDevice[]>([]);
console.log(deviceIds)
    useEffect(() => {
        if (!devices) return;
        setFiltratedData(devices);
      }, [devices.length]);

    function handleFilter(value: string) {
    if (!devices) return;

    const filter = value.toLowerCase();
    const dataToDisplay = devices.filter((device:IDevice) => {
      return device.name.toLowerCase().includes(filter);
    });
    setFiltratedData(dataToDisplay);
  }

  if (!room) {
    return (<LoadingAnimation size="xlarge" type="spinner" glow={true}/>)
  }

  return (
      <PageContainer>
        <PageHeader title={room.name}>
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
          {filtratedData?.length === 0 ? (
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