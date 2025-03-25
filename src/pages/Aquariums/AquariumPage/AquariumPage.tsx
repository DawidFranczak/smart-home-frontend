import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Wheel from "@uiw/react-color-wheel";
import { rgbaToHsva } from "@uiw/color-convert";
import Button from "../../../ui/Button/Button.tsx";

import styles from "./AquariumPage.module.css";
import useAquariumQuery from "../../../hooks/queries/useAquariumQuery.tsx";
import { IAquarium } from "../../../interfaces/IAquarium.tsx";
import useAquariumMutation from "../../../hooks/queries/useAquariumMutation.tsx";
import { ICustomError } from "../../../interfaces/ICustomError.tsx";
import AquariumAutomat from "../../../components/AquariumAutomat/AquariumAutomat.tsx";
import Message from "../../../ui/Message/Message.tsx";
import DeviceContainer from "../../../ui/DeviceContainer/DeviceContainer.tsx";

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

const AquariumPage = () => {
  const params = useParams();
  const id = params.id ? parseInt(params.id) : 0;
  const { aquariumData, isLoading } = useAquariumQuery(id);
  const mutation = useAquariumMutation(id);
  const mutationErrors = mutation.error as ICustomError;
  const mutationStatus = mutation?.data?.status;
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

  if (Object.keys(state.aquariumData).length === 0) return null;
  console.log(state.aquariumData);
  return (
    <DeviceContainer
      name={state.aquariumData.name}
      is_online={state.aquariumData.is_online}
      wifi_strength={state.aquariumData.wifi_strength}
      className={styles.container}
      id={id}
    >
      {mutationErrors && (
        <Message type={"error"}> Błąd w komunikacji z akwarium. </Message>
      )}
      {mutationStatus === 200 && (
        <Message type={"success"}> Zapisano dane </Message>
      )}
      <Wheel
        color={state.hsva}
        onChange={(color) => {
          dispatch({
            type: "set/color",
            payload: { hsva: color.hsva, rgb: color.rgb },
          });
        }}
      />
      {state.aquariumData.mode ? (
        <AquariumAutomat
          dispatch={dispatch}
          state={{
            led_start: state.aquariumData.led_start,
            led_stop: state.aquariumData.led_stop,
            fluo_start: state.aquariumData.fluo_start,
            fluo_stop: state.aquariumData.fluo_stop,
          }}
          saveFn={() => handleSaveSettings(undefined)}
        />
      ) : (
        <>
          <Button callback={() => handleSaveSettings(undefined)}>Zapisz</Button>
          <p>Ledy</p>
          <Button callback={() => handleSaveSettings("led_mode")}>
            {state.aquariumData.led_mode ? "Wyłącz" : "Włącz"}
          </Button>
          <p>Świetlówka</p>
          <Button callback={() => handleSaveSettings("fluo_mode")}>
            {state.aquariumData.fluo_mode ? "Wyłącz" : "Włącz"}
          </Button>
        </>
      )}
      <Button callback={() => handleSaveSettings("mode")}>
        {state.aquariumData.mode ? "Ręczny" : "Automatyczny"}
      </Button>
    </DeviceContainer>
  );
};

export default AquariumPage;
