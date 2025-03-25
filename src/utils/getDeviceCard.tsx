import AquariumCard from "../components/Cards/AquariumCard/AquariumCard";
import ButtonCard from "../components/Cards/ButtonCard/ButtonCard";
import LampCard from "../components/Cards/LampCard/LampCard";
import RfidCard from "../components/Cards/RfidCard/RfidCard";

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
  }
}
