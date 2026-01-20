import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer";
import stairsIcon from "../../../../public/static/svg/stairsIcon.svg"
import {IStairs} from "../../../interfaces/IStairs.tsx";
export default function StairsCard(stairs: IStairs) {
    return (
      <DeviceCardContainer
          isOnline={stairs.is_online}
          name={stairs.name}
          svg={stairsIcon}
          alt={stairs.name}
          to={`/stairs/${stairs.id}`}
      >
      <div>
      </div>
      </DeviceCardContainer>
  );
}