import { useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FormField from "../../ui/FormField/FormField.tsx";
import { api } from "../../const/api";
import Button from "../../ui/Button/Button.tsx";

import { ActionFunction } from "react-router-dom";
import BackgroundChanger from "../../components/BackgroundChanger/BackgroundChanger.tsx";

import styles from "./LoginPage.module.css";
import StyledLink from "../../ui/StyledLink/StyledLink.tsx";
import Message from "../../ui/Message/Message.tsx";
import Header from "../../ui/Header/Header.tsx";
import { useQueryClient } from "@tanstack/react-query";

interface LoginPageData {
  status: number;
  body: {
    access: string;
    message: string;
  };
}
export default function LoginPage() {
  const data = useActionData() as LoginPageData;
  const { login, access } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (data?.body.access) {
      login(data.body.access);
      navigate("/");
    } else queryClient.clear();
  }, [data, login]);

  useEffect(() => {
    if (access) navigate("/");
    else queryClient.clear();
  }, []);
  return (
    <div className={styles.container}>
      <BackgroundChanger />
      <Header>Logowanie</Header>
      <Form method="POST" className={styles.form}>
        <FormField type="text" name="username" placeholder="Login" />
        <FormField type="password" name="password" placeholder="Hasło" />
        {data?.status === 400 && (
          <Message type="error">{data.body.message}</Message>
        )}
        <Button>Zaloguj</Button>
        <StyledLink to="/registartion" type="button">
          Zarejestruj się
        </StyledLink>
      </Form>
    </div>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const body = {
    username: data.username,
    password: data.password,
  };
  const response = await fetch(api.login, {
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
