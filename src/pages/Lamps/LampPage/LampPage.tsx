import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";

import styles from "./LampPage.module.css";
import useLampQuery from "../../../hooks/queries/useLampQuery";
import DeviceContainer from "../../../ui/DeviceContainer/DeviceContainer";
import { ILamp } from "../../../interfaces/ILamp";
import InputTime from "../../../ui/InputTime/InputTime";
import InputNumber from "../../../ui/InputNumber/InputNumber";
import InputRange from "../../../ui/InputRange/InputRange";
import Button from "../../../ui/Button/Button";
import useLampMutation from "../../../hooks/queries/useLampMutation";
import Message from "../../../ui/Message/Message";

function reducer(state: ILamp, action: { type: string; payload: any }) {
  switch (action.type) {
    case "INIT_DATA":
      return { ...state, ...action.payload };
    case "set/light_start":
      return { ...state, light_start: action.payload };
    case "set/light_stop":
      return { ...state, light_stop: action.payload };
    case "set/brightness":
      return { ...state, brightness: action.payload };
    case "set/lighting_time":
      return { ...state, lighting_time: action.payload };
    case "set/step":
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

const LampPage = () => {
  const params = useParams();
  const [state, dispatch] = useReducer(reducer, null);
  const lampId = parseInt(params.id ? params.id : "0");
  const { lampData } = useLampQuery(lampId);
  const { updateLamp } = useLampMutation();
  const updateMutate = updateLamp(lampId);

  useEffect(() => {
    if (lampData) dispatch({ type: "INIT_DATA", payload: lampData });
  }, [lampData]);

  function updateLampData() {
    updateMutate.mutate(state);
  }

  if (!state) return <div></div>;
  return (
    <DeviceContainer
      name={state.name}
      wifi_strength={state.wifi_strength}
      is_online={state.is_online}
      id={state.id}
    >
      {updateMutate.isSuccess && (
        <Message type="success">Zapisano dane</Message>
      )}
      {updateMutate.isError && (
        <Message type="error">Wystąpił bład podczas zapisu</Message>
      )}
      <label className={styles.label}>
        <span className={styles.name}>Godzina rozpoczęcia</span>
        <InputTime
          initialTime={state.light_start}
          onChange={(time) =>
            dispatch({ type: "set/light_start", payload: time })
          }
        />
      </label>
      <label className={styles.label}>
        <span className={styles.name}>Godzina zakończenia</span>
        <InputTime
          initialTime={state.light_stop}
          onChange={(time) =>
            dispatch({ type: "set/light_stop", payload: time })
          }
        />
      </label>
      <label className={styles.label}>
        <span className={styles.name}>Czas świecenia [s]</span>
        <InputNumber
          value={state.lighting_time}
          onChange={(time) =>
            dispatch({ type: "set/lighting_time", payload: time })
          }
        />
      </label>
      <label className={styles.label}>
        <span className={styles.name}>Jasność{` ${state.brightness} %`}</span>
        <InputRange
          value={state.brightness}
          onChange={(brightness) =>
            dispatch({ type: "set/brightness", payload: brightness })
          }
          min="0"
          max="100"
        />
      </label>
      <label className={styles.label}>
        <span className={styles.name}>Szybkość{` ${state.step} %`}</span>
        <InputRange
          value={state.step}
          onChange={(step) => dispatch({ type: "set/step", payload: step })}
          min="0"
          max="100"
        />
      </label>
      <Button callback={updateLampData}>Zapisz</Button>
    </DeviceContainer>
  );
};

export default LampPage;
