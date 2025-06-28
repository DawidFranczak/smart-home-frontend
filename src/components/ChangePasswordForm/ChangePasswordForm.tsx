import { useEffect, useState } from "react";
import FormField from "../../ui/FormField/FormField";
import Header from "../../ui/Header/Header";
import styles from "./ChangePasswordForm.module.css";
import Button from "../../ui/Button/Button";
import useChangePasswordMutation from "../../hooks/queries/useChangePasswordMutation";
import Message from "../../ui/Message/Message";
import { ICustomError } from "../../interfaces/ICustomError";
interface IError {
  empty?: string;
  current_password?: string;
  new_password2?: string;
}
export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [error, setError] = useState<IError>({});
  const mutation = useChangePasswordMutation();

  useEffect(() => {
    if (mutation.isError) {
      const customError = mutation.error as ICustomError;
      if (!customError.details) {
        return;
      }
      setError(customError.details);
    }
  }, [mutation.error]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError({});
    mutation.mutate({
      currentPassword,
      newPassword,
      newPassword2,
    });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Header className={styles.header}>Zmiana hasła</Header>
        <FormField
          type="password"
          name="currnetPassword"
          placeholder="Obecne hasło"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        {error.current_password && (
          <Message type="error">{error.current_password}</Message>
        )}
        <FormField
          type="password"
          name="newPassword"
          placeholder="Nowe hasło"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <FormField
          type="password"
          name="newPassword2"
          placeholder="Powtórz nowe hasło"
          onChange={(e) => setNewPassword2(e.target.value)}
        />
        {error.empty && <Message type="error">{error.empty}</Message>}
        {error.new_password2 && (
          <Message type="error">{error.new_password2}</Message>
        )}
        {mutation.isSuccess && (
          <Message type="success">Hasło zostało zmienione</Message>
        )}

        <Button>Zapisz</Button>
      </form>
    </div>
  );
}
