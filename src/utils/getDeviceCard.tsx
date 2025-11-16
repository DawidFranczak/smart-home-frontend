import AquariumCard from "../components/Cards/AquariumCard/AquariumCard";
import ButtonCard from "../components/Cards/ButtonCard/ButtonCard";
import LampCard from "../components/Cards/LampCard/LampCard";
import RfidCard from "../components/Cards/RfidCard/RfidCard";
import TempHumCard from "../components/Cards/TempHumCard/TempHumCard.tsx";
import LightCard from "../components/Cards/LightCard/LightCard.tsx";

export default function getDeviceComponent(device: any) {
  switch (device.fun) {
    case "lamp":
      return <LampCard {...device} key={device.id} />;
    case "rfid":
      return <RfidCard {...device} key={device.id} />;
    case "button":
      return <ButtonCard {...device} key={device.id} />;
    case "aquarium":
      return <AquariumCard {...device} key={device.id} />;
    case "temp_hum":
      return <TempHumCard {...device} key={device.id} />;
    case "light":
      return <LightCard {...device} key={device.id} />;
    }
}
