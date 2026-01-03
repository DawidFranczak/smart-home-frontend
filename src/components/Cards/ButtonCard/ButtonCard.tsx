import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer";
import EventButton from "../../ui/Buttons/EventButton/EventButton.tsx";
import IButton from "../../../interfaces/IButton.tsx";
import styles from "./ButtonCard.module.css";
export default function ButtonCard(button: IButton) {
  return (
    <DeviceCardContainer
      name={button.name}
      isOnline={button.is_online}
      to={`/button/${button.id}/`}
    >   <div className={styles.container}>
            <EventButton id={button.id} buttonType={button.button_type} events={button.events}/>
        </div>
    </DeviceCardContainer>
  );
}
