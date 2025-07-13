import { useState } from "react";
import FormField from "../ui/FormField/FormField";
import ButtonContainer from "../ui/containers/ButtonContainer/ButtonContainer";
import Button from "../ui/Buttons/Button/Button";

import styles from "./ChangeNameForm.module.css";

interface ChangeNameFormProps {
  onClose: () => void;
  onConfirm: (name: string) => void;
}
export default function ChangeNameForm({
  onClose,
  onConfirm,
}: ChangeNameFormProps) {
  const [name, setName] = useState<string>("");

  function handleClose(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    onClose();
  }
  return (
    <section className={styles.container}>
      <FormField
        name="nazwa"
        type="text"
        placeholder="Nazwa"
        onChange={(event) => setName(event.target.value)}
      />
      <ButtonContainer>
        <Button onClick={() => onConfirm(name)}>Zapisz</Button>
        <Button onClick={handleClose}>Anuluj</Button>
      </ButtonContainer>
    </section>
  );
}
