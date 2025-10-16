import { useEffect, useState } from "react";
import FormField from "../ui/FormField/FormField";
import Header from "../ui/Headers/Header/Header";
import styles from "./ChangePasswordForm.module.css";
import Button from "../ui/Buttons/Button/Button";
import useChangePasswordMutation from "../../hooks/queries/useChangePasswordMutation";
import Message from "../ui/Message/Message";
import { ICustomError } from "../../interfaces/ICustomError";
import FormContainer from "../ui/containers/FormContainer/FormContainer.tsx";
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
      <FormContainer>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Header>Zmiana hasła</Header>
          <FormField
              type="password"
              name="currentPassword"
              placeholder="Obecne hasło"
              onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Message show={!!error?.current_password} type="error">{error.current_password}</Message>
          <FormField
              type="password"
              name="newPassword"
              placeholder="Nowe hasło"
              onChange={(e) => setNewPassword(e.target.value)}
          />
          <FormField
              type="password"
              name="newPassword2"
              placeholder="Powtórz nowe hasło"
              onChange={(e) => setNewPassword2(e.target.value)}
          />
          <Message show={!!error?.empty} type="error">{error.empty}</Message>
          <Message show={!!error?.new_password2} type="error">{error.new_password2}</Message>
          <Message show={mutation.isSuccess} type="success">Hasło zostało zmienione</Message>
          <Button>Zapisz</Button>
        </form>
      </FormContainer>

  );
}
