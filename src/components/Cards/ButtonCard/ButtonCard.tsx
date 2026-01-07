import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer";
import EventButton from "../../ui/Buttons/EventButton/EventButton.tsx";
import IButton from "../../../interfaces/IButton.tsx";
import switchOnOff from "../../../../public/static/svg/switchOnOff.svg"
export default function ButtonCard(button: IButton) {
  return (
    <DeviceCardContainer
      name={button.name}
      isOnline={button.is_online}
      to={`/button/${button.id}/`}
      svg={switchOnOff}
      alt={button.name}
      >
        <EventButton id={button.id} buttonType={button.button_type} events={button.events}/>
        <div></div>
    </DeviceCardContainer>
  );
}
