import Button from "../../ui/Button/Button";
import InputTime from "../../ui/InputTime/InputTime";

import styles from "./AquariumAutomat.module.css";

interface IAquariumAutomatProps {
  dispatch: ({ type, payload }: { type: string; payload: string }) => void;
  state: {
    led_start: string;
    led_stop: string;
    fluo_start: string;
    fluo_stop: string;
  };
  saveFn: () => void;
}
export default function AquariumAutomat({
  dispatch,
  state,
  saveFn,
}: IAquariumAutomatProps) {
  return (
    <>
      <p>Czas ledów</p>
      <div className={styles.times}>
        <InputTime
          initialTime={state.led_start}
          onChange={(data) => dispatch({ type: "set/ledStart", payload: data })}
        />
        <InputTime
          initialTime={state.led_stop}
          onChange={(data) => dispatch({ type: "set/ledStop", payload: data })}
        />
      </div>
      <p>Czas świetlówki</p>
      <div className={styles.times}>
        <InputTime
          initialTime={state.fluo_start}
          onChange={(data) =>
            dispatch({ type: "set/fluoStart", payload: data })
          }
        />
        <InputTime
          initialTime={state.fluo_stop}
          onChange={(data) => dispatch({ type: "set/fluoStop", payload: data })}
        />
      </div>
      <Button callback={saveFn}>Zapisz</Button>
    </>
  );
}
