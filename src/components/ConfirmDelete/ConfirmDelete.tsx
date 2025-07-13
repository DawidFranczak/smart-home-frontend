import Button from "../ui/Buttons/Button/Button";
import ButtonContainer from "../ui/containers/ButtonContainer/ButtonContainer";
import styles from "./ConfirmDelete.module.css";
interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
  name?: string;
  className?: string;
  show?: boolean;
}
export default function ConfirmDelete({
    name,
    onConfirm,
    onCancel,
    className,
    show = true
}: ConfirmDeleteProps) {
    if (!show) {
        return null;
    }

  return (
      <div className={`${styles.container} ${className}`}>
        <p className={styles.text}>
          Czy na pewno chcesz usunąć <b>{name}</b>?
        </p>
        <ButtonContainer>
          <Button type="danger" onClick={onConfirm}>Tak</Button>
          <Button onClick={onCancel}>Nie</Button>
        </ButtonContainer>
      </div>
  );
}
