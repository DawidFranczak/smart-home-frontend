import { Form, useActionData, useNavigate } from "react-router-dom";

import BackArrow from "../../ui/BackArrow/BackArrow.tsx";
import Button from "../../ui/Button/Button";
import FormField from "../../ui/FormField/FormField";

import { api } from "../../const/api";
import styles from "./RegistrationPage.module.css";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { ActionFunction } from "react-router-dom";
import BackgroundChanger from "../../components/BackgroundChanger/BackgroundChanger.tsx";
import Header from "../../ui/Header/Header.tsx";
import Message from "../../ui/Message/Message.tsx";
interface RegistrationPageData {
  status: number;
  body: {
    username: string;
    password: string;
    password2: string;
    homeUuid: string;
    empty: string;
  };
}

const RegistrationPage = () => {
  const data = useActionData() as RegistrationPageData;
  const navigate = useNavigate();
  const { access } = useAuth();

  useEffect(() => {
    if (access) navigate("/");
  }, [access]);

  if (data && data.status === 201) {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <div className={styles.container}>
      <BackgroundChanger />
      <BackArrow className={styles.backArrow} />
      <Header>Rejestracja</Header>
      <Form method="POST" className={styles.form}>
        <FormField type="text" name="username" placeholder="Login" />
        {data?.status === 400 && data.body.username && (
          <Message type="error">{data.body.username}</Message>
        )}
        <FormField type="password" name="password" placeholder="Hasło" />
        {data?.status === 400 && data.body.password && (
          <Message type="error">{data.body.password} </Message>
        )}
        <FormField
          type="password"
          name="password2"
          placeholder="Powtórz hasło"
        />
        {data?.status === 400 && data.body.password2 && (
          <Message type="error">{data.body.password2} </Message>
        )}
        <FormField type="text" name="homeUuid" placeholder="Kod domu" />
        {data?.status === 400 && data.body.homeUuid && (
          <Message type="error">{data.body.homeUuid} </Message>
        )}
        <Button>Rejestracja</Button>
      </Form>
      {data?.status === 400 && data.body.empty && (
        <Message type="error">{data.body.empty} </Message>
      )}
      <Message type="success">
        {data?.status === 201 &&
          "Rejestracja przebiegła pomyślnie. Za chwilę zostaniesz przekierowany na stronę"}
      </Message>
    </div>
  );
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const body = {
    username: data.username,
    password: data.password,
    password2: data.password2,
    homeUuid: data.homeUuid,
  };
  const response = await fetch(api.registration, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "1234",
    },
    body: JSON.stringify(body),
  });
  const responseData = await response.json();
  return { status: response.status, body: responseData };
};

export default RegistrationPage;
