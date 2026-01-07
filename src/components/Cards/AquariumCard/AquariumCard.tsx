import { IAquarium } from "../../../interfaces/IAquarium";
import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer";
import fish from "../../../../public/static/svg/fish.svg"
export default function AquariumCard(aquarium: IAquarium) {
    return (
      <DeviceCardContainer
          isOnline={aquarium.is_online}
          name={aquarium.name}
          svg={fish}
          alt={aquarium.name}
          to={`/aquarium/${aquarium.id}/`}
      >
      <div>
      </div>
      </DeviceCardContainer>
  );
}