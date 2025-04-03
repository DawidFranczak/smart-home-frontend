import { useParams } from "react-router-dom";
import useAvailableActionQuery from "../../hooks/queries/useAvailableActionQuery";

export default function DeviceEventWizzard() {
  const params = useParams();
  console.log(params);
  const { availableAction } = useAvailableActionQuery(
    parseInt(params.id ? params.id : "0"),
    params.deviceFun ? params.deviceFun : ""
  );
  console.log(availableAction);
  return <div>DeviceEventWizzard</div>;
}
