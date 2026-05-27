import IPeripheral from "../interfaces/IPeripheral.ts";
import PinOutputWidget from "../components/Widgets/PinOutputWidget/PinOutputWidget.tsx";
import RGBStripWidget from "../components/Widgets/RGBStripWidget/RGBStripWidget.tsx";
import PinInputWidget from "../components/Widgets/PinInputWidget/PinInputWidget.tsx";
import SequentialLightWidget from "../components/Widgets/SequentialLight/SequentialLightWidget.tsx";
import Rc522Widget from "../components/Widgets/Rc522Widget/Rc522Widget.tsx";
import Aht10Widget from "../components/Widgets/Aht10Widget/Aht10Widget.tsx";
import BistableButtonWidget from "../components/Widgets/ButtonBistableWidget/ButtonBistableWidget.tsx"
import ButtonMonostableWidget from "../components/Widgets/ButtonMonostableWidget/ButtonMonostableWidget.tsx";
import PinPwmWidget from "../components/Widgets/PinPwmWidget/PinPwmWidget.tsx";
import PirSensorWidget from "../components/Widgets/PirSensorWidget/PirSensorWidget.tsx";
import RelayWidget from "../components/Widgets/RelayWidget/RelayWidget.tsx";

export default function peripheralFactory(peripheral:IPeripheral, isOnline:boolean){
    const widgetProps = {...peripheral, isOnline};

    switch(peripheral.name){
        case "pin_output":
            return <PinOutputWidget key={peripheral.id} {...widgetProps}/>;
        case "pin_input":
            return <PinInputWidget key={peripheral.id} {...widgetProps}/>;
        case "button_bistable":
            return <BistableButtonWidget key={peripheral.id} {...widgetProps}/>;
        case "button_monostable":
            return <ButtonMonostableWidget key={peripheral.id} {...widgetProps}/>;
        case "pin_pwm":
            return <PinPwmWidget key={peripheral.id} {...widgetProps}/>;
        case "active_buzzer":
            return null;
        case "pca9685":
            return null;
        case "pir_sensor":
            return <PirSensorWidget key={peripheral.id} {...widgetProps}/>;
        case "relay":
            return <RelayWidget key={peripheral.id} {...widgetProps}/>;
        case "rgb_strip":
            return <RGBStripWidget key={peripheral.id} {...widgetProps}/>;
        case "sequential_light":
            return <SequentialLightWidget key={peripheral.id} {...widgetProps}/>;
        case "rc522":
            return <Rc522Widget key={peripheral.id} {...widgetProps}/>;
        case "aht10":
            return <Aht10Widget key={peripheral.id} {...widgetProps}/>;
        default: return null;
    }
}
