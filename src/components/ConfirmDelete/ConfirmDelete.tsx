import Button from "../../ui/Button/Button";
import ButtonContainer from "../../ui/ButtonContainer/ButtonContainer";
import styles from "./ConfirmDelete.module.css";
interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
  name?: string;
}
export default function ConfirmDelete({
  name,
  onConfirm,
  onCancel,
}: ConfirmDeleteProps) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Czy na pewno chcesz usunąć <b>{name}</b>?
      </p>
      <ButtonContainer>
        <Button callback={onConfirm}>Tak</Button>
        <Button callback={onCancel}>Nie</Button>
      </ButtonContainer>
    </div>
  );
}
