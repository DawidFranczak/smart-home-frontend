import { useEffect, useState } from "react";
import usePrefetchDeviceQuery from "../../../hooks/queries/device/usePrefetchDeviceQuery.tsx";
import { IDevice } from "../../../interfaces/IDevice";
import QueryInput from "../../../components/ui/QueryInput/QueryInput";
import getDeviceComponent from "../../../utils/getDeviceCard";
import CardContainer from "../../../components/ui/containers/CardContainer/CardContainer.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import {useTranslation} from "react-i18next";

export default function Device() {
  const { deviceData } = usePrefetchDeviceQuery();
  const [query, setQuery] = useState<IDevice[]>([]);
  const {t} = useTranslation();
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
  console.log(query)
  return (
    <PageContainer>
      <PageHeader title={t("device.title")}>
        <QueryInput onChange={handleDeviceQuery} />
      </PageHeader>
      <CardContainer>
        {query.map((item: IDevice) => getDeviceComponent(item))}
      </CardContainer>
    </PageContainer>
  );
}
