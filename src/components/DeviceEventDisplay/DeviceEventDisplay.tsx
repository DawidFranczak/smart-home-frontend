import {useState} from "react";
import Delete from "/static/svg/delete.svg";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete.tsx";
import IEvent from "../../interfaces/IEvent.tsx";
import styles from "./DeviceEventDisplay.module.css";
import useEventMutation from "../../hooks/queries/useEventMutation.tsx";
interface IDeviceEventProps {
  event:IEvent
}
export default function DeviceEventDisplay({
  event,
}: IDeviceEventProps) {
  const [displayDeleteConfirm, setDisplayDeleteConfirm] = useState(false);
  const { deleteEvent } = useEventMutation();
  const deleteMutation = deleteEvent(1, event.id);

  return (
   <div className={styles.container}>
      <span>
        {event.event}-{event.action}-{event.device}
      </span>
      <img
         key={`${event.id} img`}
         src={Delete}
         alt="Delete"
         width="24"
         height="24"
         className={styles.deleteIcon}
         onClick={() => {
           setDisplayDeleteConfirm(true);
         }}
       />
       {displayDeleteConfirm && (
           <ConfirmDelete
               onCancel={() => setDisplayDeleteConfirm(false)}
               onConfirm={() => {
                 deleteMutation.mutate();
                 setDisplayDeleteConfirm(false);
               }}
               name="akcje"
           />
       )}
   </div>
 );
}

