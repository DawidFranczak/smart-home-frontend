import {useEffect, useState} from "react";
import styles from "./ChangeHomeForm.module.css";
import FormContainer from "../ui/containers/FormContainer/FormContainer.tsx";
import FormField from "../ui/FormField/FormField.tsx";
import Header from "../ui/Headers/Header/Header.tsx";
import Button from "../ui/Buttons/Button/Button.tsx";
import Message from "../ui/Message/Message.tsx";
import useHomeMutation from "../../hooks/queries/useHomeMutation.tsx";
import {ICustomError} from "../../interfaces/ICustomError.tsx";

export default function ChangeHomeForm() {
  const [homeCode, setHomeCode] = useState("");
  const [error, setError] = useState("");
  const { updateHome } = useHomeMutation();
  const updateHomeMutation = updateHome();
  const errorMutations = updateHomeMutation.error as ICustomError;

  useEffect(() => {
    if(errorMutations) {
      if (!errorMutations.details) return
      setError(errorMutations.details[Object.keys(errorMutations.details)[0]]);
    }
  }, [errorMutations]);

  function handleSubmit() {
    setError("");
    if (homeCode === "") {
      setError("Podaj kod domu");
      return;
    }
    updateHomeMutation.mutate(homeCode);
  }
  return <FormContainer>
    <Header>Zmiana domu</Header>
    <p className={styles.message}>Pamiętaj że po zmianie domu wszystkie urzeczy zapisane w domu zostą usunąte</p>
    <FormField
        type="text"
        name="homeCode"
        placeholder="Kod domu"
        onChange={(e) => setHomeCode(e.target.value)}
        error={error !== ""}
    />
    <Message show={error !== ""} type="error">{error}</Message>
    <Button type="danger" onClick={handleSubmit}>Zmień</Button>
  </FormContainer>
}
