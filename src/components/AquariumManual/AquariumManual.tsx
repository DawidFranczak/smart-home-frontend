import Button from "../../ui/Button/Button";
interface IAquariumManualProps {
  saveFn: () => void;
  ledMode: boolean;
  fluoMode: boolean;
  switchLed: () => void;
  switchFluo: () => void;
}
export default function AquariumManual({
  saveFn,
  ledMode,
  fluoMode,
  switchLed,
  switchFluo,
}: IAquariumManualProps) {
  return (
    <>
      <Button callback={saveFn}>Zapisz</Button>
      <p>Ledy</p>
      <Button callback={switchLed}>{ledMode ? "Wyłącz" : "Włącz"}</Button>
      <p>Świetlówka</p>
      <Button callback={switchFluo}>{fluoMode ? "Wyłącz" : "Włącz"}</Button>
    </>
  );
}
