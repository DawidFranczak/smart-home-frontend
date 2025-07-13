
import styles from "./LoginPage.module.css";

import { useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.tsx";
import FormField from "../../components/ui/FormField/FormField.tsx";
import { api } from "../../constant/api";
import Button from "../../components/ui/Buttons/Button/Button.tsx";

import { ActionFunction } from "react-router-dom";

import StyledLink from "../../components/ui/StyledLink/StyledLink.tsx";
import Message from "../../components/ui/Message/Message.tsx";
import Header from "../../components/ui/Headers/Header/Header.tsx";
import { useQueryClient } from "@tanstack/react-query";
import FormContainer from "../../components/ui/containers/FormContainer/FormContainer.tsx";
import PageContainer from "../../components/ui/containers/PageContainer/PageContainer.tsx";

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
      <PageContainer className={styles.container}>
        <FormContainer>
          <Form method="POST" className={styles.form}>
            <div className={styles.formContent}>
              <Header>Smart Home</Header>
              <p className={styles.subtitle}>Zaloguj się do swojego konta</p>
              <FormField
                  type="text"
                  name="username"
                  placeholder="Nazwa użytkownika"
              />
              <FormField
                  type="password"
                  name="password"
                  placeholder="Hasło"
              />
              <Message type="error" show={data?.status === 400}>{data?.body.message}</Message>
              <Button>Zaloguj się</Button>
              <StyledLink to="/registration">
                Utwórz nowe konto
              </StyledLink>
            </div>
          </Form>
        </FormContainer>
      </PageContainer>
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