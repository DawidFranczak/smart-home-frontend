import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer";
import { ILamp } from "../../../interfaces/ILamp";
import lamp from "../../../../public/static/svg/lamp.svg"
export default function LampCard(device: ILamp) {
    return (
      <DeviceCardContainer
          name={device.name}
          isOnline={device.is_online}
          to={`/lamp/${device.id}/`}
          svg={lamp}
          alt={device.name}
      >
      <div></div>
      </DeviceCardContainer>
  );
}