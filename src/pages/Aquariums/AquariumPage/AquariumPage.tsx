import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Wheel from "@uiw/react-color-wheel";
import { rgbaToHsva } from "@uiw/color-convert";
import Button from "../../../components/ui/Buttons/Button/Button.tsx";

import styles from "./AquariumPage.module.css";
import useAquariumQuery from "../../../hooks/queries/useAquariumQuery.tsx";
import { IAquarium } from "../../../interfaces/IAquarium.tsx";
import useAquariumMutation from "../../../hooks/queries/useAquariumMutation.tsx";
import Message from "../../../components/ui/Message/Message.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import WifiStrength from "../../../components/ui/WiFiStrength/WiFiStrength.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import TilesContainer from "../../../components/ui/containers/TilesContainer/TilesContainer.tsx";
import InputTime from "../../../components/ui/InputTime/InputTime.tsx";
import Tile from "../../../components/ui/Tile/Tile.tsx";
import ToggleButton from "../../../components/ui/ToggleButton/ToggleButton.tsx";
import StyledLink from "../../../components/ui/StyledLink/StyledLink.tsx";
import ButtonContainer from "../../../components/ui/containers/ButtonContainer/ButtonContainer.tsx";

interface IState {
  aquariumData: IAquarium;
  hsva: { h: number; s: number; v: number; a: number };
}

type IAction =
  | {
      type: any;
      payload: any;
    }
  | {
      type: "set/color";
      payload: {
        hsva: { h: number; s: number; v: number; a: number };
        rgb: { r: number; g: number; b: number };
      };
    }
  | {
      type: "set/init_value";
      payload: {
        aquariumData: IAquarium;
        hsva: { h: number; s: number; v: number; a: number };
      };
    };

const initialState: IState = {
  aquariumData: {} as IAquarium,
  hsva: { h: 0, s: 0, v: 100, a: 1 },
};

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "set/init_value":
      return { ...state, ...action.payload };
    case "set/color":
      return {
        ...state,
        aquariumData: {
          ...state.aquariumData,
          color_r: action.payload.rgb.r,
          color_g: action.payload.rgb.g,
          color_b: action.payload.rgb.b,
        },
        hsva: action.payload.hsva,
      };
    case "set/ledStart":
      return {
        ...state,
        aquariumData: {
          ...state.aquariumData,
          led_start: action.payload,
        },
      };
    case "set/ledStop":
      return {
        ...state,
        aquariumData: {
          ...state.aquariumData,
          led_stop: action.payload,
        },
      };
    case "set/fluoStart":
      return {
        ...state,
        aquariumData: {
          ...state.aquariumData,
          fluo_start: action.payload,
        },
      };
    case "set/fluoStop":
      return {
        ...state,
        aquariumData: {
          ...state.aquariumData,
          fluo_stop: action.payload,
        },
      };
    default:
      return state;
  }
}

export default function AquariumPage() {
  const params = useParams();
  const id = params.id ? parseInt(params.id) : 0;
  const { aquariumData, isLoading } = useAquariumQuery(id);
  const mutation = useAquariumMutation(id);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!isLoading && aquariumData)
      dispatch({
        type: "set/init_value",
        payload: {
          aquariumData,
          hsva: rgbaToHsva({
            r: aquariumData.color_r,
            g: aquariumData.color_g,
            b: aquariumData.color_b,
            a: 1,
          }),
        },
      });
  }, [isLoading, aquariumData]);

  const handleSaveSettings = (type: string | undefined) => {
    if (type) {
      mutation.mutate({
        ...state.aquariumData,
        [type]: !state.aquariumData[type],
      });
      return;
    }
    mutation.mutate(state.aquariumData);
  };

  if (Object.keys(state.aquariumData).length === 0) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
  console.log(state.aquariumData);
  return (
      <PageContainer className={styles.container}>
        <PageHeader title={state.aquariumData.name}>
          <ButtonContainer>
            <StyledLink type="fancy" to={`/aquarium/${aquariumData.id}/settings/`}>
              Ustawienia urządzenia
            </StyledLink>
            <WifiStrength
                size="large"
                strength={state.aquariumData.is_online ? state.aquariumData.wifi_strength : -100}
            />
          </ButtonContainer>
        </PageHeader>
        <TilesContainer>
          <Tile>
            <Wheel
                  color={state.hsva}
                  onChange={(color) => {
                    dispatch({
                      type: "set/color",
                      payload: { hsva: color.hsva, rgb: color.rgb },
                    });
                  }}
              />
          </Tile>
          <Tile>
            <InputTime
                label="Czas ledów - rozpoczęcie"
                initialTime={state.aquariumData.led_start}
                onChange={(data) => dispatch({ type: "set/ledStart", payload: data })}
                disabled={!state.aquariumData.mode}
            />
          </Tile>
          <Tile>
            <InputTime
                label="Czas ledów - zakończenie"
                initialTime={state.aquariumData.led_stop}
                onChange={(data) => dispatch({ type: "set/ledStop", payload: data })}
                disabled={!state.aquariumData.mode}
            />
          </Tile>
          <Tile>
            <InputTime
                label="Czas świetlówki - rozpoczęcie"
                initialTime={state.aquariumData.fluo_start}
                onChange={(data) =>dispatch({ type: "set/fluoStart", payload: data })}
                disabled={!state.aquariumData.mode}
            />
          </Tile>
          <Tile>
            <InputTime
                label="Czas świetlówki - zakończenie"
                initialTime={state.aquariumData.fluo_stop}
                onChange={(data) => dispatch({ type: "set/fluoStop", payload: data })}
                disabled={!state.aquariumData.mode}
            />
          </Tile>
          <Tile>
            <ToggleButton
                label="Świetlówka"
                initialValue={state.aquariumData.fluo_mode}
                onChange={(_) => handleSaveSettings("fluo_mode")}
                onLabel="Włączona"
                offLabel="Wyłączona"
                disabled={state.aquariumData.mode}
            />
          </Tile>
          <Tile>
            <ToggleButton
                label="Ledy"
                initialValue={state.aquariumData.led_mode}
                onChange={(_) => handleSaveSettings("led_mode")}
                onLabel="Włączona"
                offLabel="Wyłączona"
                disabled={state.aquariumData.mode}
            />
          </Tile>
          <Tile>
            <ToggleButton
                label="Tryb"
                initialValue={state.aquariumData.mode}
                onChange={(_) => handleSaveSettings("mode")}
                onLabel="Automatyczny"
                offLabel="Ręczny"
            />
          </Tile>

        </TilesContainer>
        <Button className={styles.button} type="fancy" onClick={()=>handleSaveSettings(undefined)}>Zapisz</Button>
        <div className={styles.messageContainer}>
          <Message show={!!mutation.error} type="error"> Błąd w komunikacji z akwarium. </Message>
          <Message show={!!mutation?.data?.status} type={"success"}> Zapisano dane </Message>
        </div>
      </PageContainer>
  );
};
