import Button from "../../ui/Button/Button";
import ButtonContainer from "../../ui/ButtonContainer/ButtonContainer";
import styles from "./ConfirmDelete.module.css";
interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
  name?: string;
  className?: string;
}
export default function ConfirmDelete({
  name,
  onConfirm,
  onCancel,
  className,
}: ConfirmDeleteProps) {
  return (
    <div className={`${styles.container} ${className}`}>
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
