import { useEffect, useState } from "react";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery.tsx";
import { IDevice } from "../../../interfaces/IDevice";
import QueryInput from "../../../components/ui/QueryInput/QueryInput";
import getDeviceComponent from "../../../utils/getDeviceCard";
import CardContainer from "../../../components/ui/containers/CardContainer/CardContainer.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";

export default function Device() {
  const { deviceData } = useDeviceQuery();
  const [query, setQuery] = useState<IDevice[]>([]);
  useEffect(() => {
    if (deviceData) {
      setQuery(deviceData);
    }
  }, [deviceData]);

  const handleDeviceQuery = (value: string) => {
    const filter = value.toLowerCase();
    const dataToDisplay = deviceData.filter((device: IDevice) => {
      return device.name.toLowerCase().includes(filter);
    });
    setQuery(dataToDisplay);
  };

  if (!query) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
  return (
    <PageContainer>
      <PageHeader title="Urządzenia">
        <QueryInput onChange={handleDeviceQuery} />
      </PageHeader>
      <CardContainer>
        {query.map((item: IDevice) => getDeviceComponent(item))}
      </CardContainer>
    </PageContainer>
  );
}
