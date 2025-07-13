import styles from "./HomeLeave.module.css";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete.tsx";
import {useNavigate} from "react-router-dom";
export default function HomeLeave() {
    const navigate = useNavigate();
    function handleConfirm() {
        console.log("confirm");
    }
    function handleCancel() {
        navigate("/")
    }
    return <ConfirmDelete name={"dom"} onConfirm={handleConfirm} onCancel={handleCancel}/>
}