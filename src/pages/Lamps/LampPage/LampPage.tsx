import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";

import styles from "./LampPage.module.css";
import { ILamp } from "../../../interfaces/ILamp";
import InputTime from "../../../components/ui/InputTime/InputTime";
import InputNumber from "../../../components/ui/InputNumber/InputNumber";
import InputRange from "../../../components/ui/InputRange/InputRange";
import Button from "../../../components/ui/Buttons/Button/Button";
import useLampMutation from "../../../hooks/queries/useLampMutation";
import Message from "../../../components/ui/Message/Message";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import WifiStrength from "../../../components/ui/WiFiStrength/WiFiStrength.tsx";
import TilesContainer from "../../../components/ui/containers/TilesContainer/TilesContainer.tsx";
import Tile from "../../../components/ui/Tile/Tile.tsx";
import StyledLink from "../../../components/ui/StyledLink/StyledLink.tsx";
import ButtonContainer from "../../../components/ui/containers/ButtonContainer/ButtonContainer.tsx";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery.tsx";

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

export default function LampPage() {
  const params = useParams();
  const [state, dispatch] = useReducer(reducer, null);
  const lampId = parseInt(params.id ? params.id : "0");
  const { device } = useDeviceQuery(lampId);
  const { updateLamp } = useLampMutation();
  const updateMutate = updateLamp(lampId);
  const lampData = device as ILamp;

  useEffect(() => {
    if (lampData) dispatch({ type: "INIT_DATA", payload: lampData });
  }, [lampData]);

  function updateLampData() {
    updateMutate.mutate(state);
  }

  if (!state) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
  return (
      <PageContainer className={styles.container}>
        <PageHeader title={state.name}>
          <ButtonContainer>
            <StyledLink type="fancy" to={`/lamp/${state.id}/settings/`}>
              Ustawienia urządzenia
            </StyledLink>
            <WifiStrength
                size="large"
                strength={state.is_online ? state.wifi_strength : -100}
            />
          </ButtonContainer>
        </PageHeader>
        <TilesContainer>
          <Tile>
            <InputTime
                label="Godzina rozpoczęcia"
                initialTime={state.light_start}
                onChange={(time) =>
                    dispatch({ type: "set/light_start", payload: time })
                }
            />
          </Tile>
          <Tile>
            <InputTime
                label="Godzina zakonczenia"
                initialTime={state.light_stop}
                onChange={(time) =>
                    dispatch({ type: "set/light_stop", payload: time })
                }
            />
          </Tile>
          <Tile>
            <InputNumber
                name="Czas świecenia [s]"
                value={state.lighting_time}
                onChange={(time) =>
                    dispatch({ type: "set/lighting_time", payload: time })
                }
            />
          </Tile>
          <Tile>
            <InputRange
                name={`Jasność ${state.brightness} %`}
                value={state.brightness}
                onChange={(brightness) =>
                    dispatch({ type: "set/brightness", payload: brightness })
                }
                min="0"
                max="100"
            />
          </Tile>
          <Tile>
            <InputRange
                name={`Szybkość ${state.step} %`}
                value={state.step}
                onChange={(step) => dispatch({ type: "set/step", payload: step })}
                min="0"
              max="100"
            />
          </Tile>
        </TilesContainer>
      <Button className={styles.button} type="fancy" onClick={updateLampData}>Zapisz</Button>
        <div className={styles.messageContainer}>
          <Message type="success" show={updateMutate.isSuccess}>Zapisano dane</Message>
          <Message type="error" show={updateMutate.isError}>Wystąpił bład podczas zapisu</Message>
        </div>
      </PageContainer>
  );
};