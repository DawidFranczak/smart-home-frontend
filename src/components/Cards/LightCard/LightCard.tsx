import ILight from "../../../interfaces/ILight.ts";
import DeviceCardContainer from "../../ui/containers/DeviceCardContainer/DeviceCardContainer.tsx";
import EventButton from "../../ui/Buttons/EventButton/EventButton.tsx";
import lightOn from "../../../../public/static/svg/lightOn.svg"
import lightOff from "../../../../public/static/svg/lightOff.svg"
export default function LightCard(device: ILight ) {
    return (
        <DeviceCardContainer
            name={device.name}
            isOnline={device.is_online}
            to={`/light/${device.id}/`}
            svg={device.on?lightOn:lightOff}
            alt={device.name}
        >
        <EventButton id={device.id} events={device.events} buttonType={device.button_type}/>
        <div></div>
        </DeviceCardContainer>
    )

}