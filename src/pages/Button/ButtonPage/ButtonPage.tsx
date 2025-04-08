import { useParams } from "react-router-dom";
import StyledLink from "../../../ui/StyledLink/StyledLink";
import useButtonQuery from "../../../hooks/queries/useButtonQuery";
import DeviceContainer from "../../../ui/DeviceContainer/DeviceContainer";
import styles from "./ButtonPage.module.css";
export default function ButtonPage() {
  const params = useParams();
  const id = parseInt(params.id ? params.id : "0");
  const { buttonData } = useButtonQuery(id);
  console.log(buttonData);
  if (!buttonData) return null;
  return (
    <DeviceContainer
      name={buttonData.name}
      wifi_strength={buttonData.wifi_strength}
      is_online={buttonData.is_online}
      id={buttonData.id}
      className={styles.container}
      events={buttonData.events}
    >
      <StyledLink type="button" to={`/button/${buttonData.id}/event/wizard/`}>
        Ustawienia zdarzenia
      </StyledLink>
    </DeviceContainer>
  );
}
