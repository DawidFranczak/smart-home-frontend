import { useRef } from "react";
import styles from "./ColorPicker.module.css"

const ColorPicker = ({color, getColor}) =>{
    const colorValue = useRef(color);

    const changeColor = (event) =>{
        colorValue.current = event.target.value;
        getColor(colorValue.current)
    }

    return(
        <input
            id="color"
            className={styles.color}
            type="color"
            value = {colorValue.current}
            onClick={changeColor}
        />
    )
}

export default ColorPicker;