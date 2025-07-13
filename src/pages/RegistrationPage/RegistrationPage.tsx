import { Form, useActionData, useNavigate } from "react-router-dom";

import Button from "../../components/ui/Buttons/Button/Button";
import FormField from "../../components/ui/FormField/FormField";

import { api } from "../../constant/api";
import styles from "./RegistrationPage.module.css";
import { useAuth } from "../../auth/AuthContext.tsx";
import { useEffect } from "react";
import { ActionFunction } from "react-router-dom";
import Header from "../../components/ui/Headers/Header/Header.tsx";
import Message from "../../components/ui/Message/Message.tsx";
import FormContainer from "../../components/ui/containers/FormContainer/FormContainer.tsx";
import StyledLink from "../../components/ui/StyledLink/StyledLink.tsx";
import PageContainer from "../../components/ui/containers/PageContainer/PageContainer.tsx";
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
      <PageContainer className={styles.container}>
        <FormContainer>
          <Header>Smart Home</Header>
          <p className={styles.subtitle}>Utwórz nowe konto</p>
          <Form method="POST" className={styles.form}>
            <div className={styles.formContent}>
            <FormField type="text" name="username" placeholder="Login" />
            <Message type="error" show={data?.status === 400 && data?.body.username}>{data?.body.username}</Message>
            <FormField type="password" name="password" placeholder="Hasło" />
            <Message type="error" show={data?.status === 400 && data?.body.password}>{data?.body.password} </Message>
            <FormField
              type="password"
              name="password2"
              placeholder="Powtórz hasło"
            />
            <Message type="error" show={data?.status === 400 && data?.body.password2}>{data?.body.password2} </Message>
            <Button>Rejestracja</Button>
            <StyledLink to={"/login"}>Wróć</StyledLink>
            <Message type="error" show={data?.status === 400 && data?.body.empty}>{data?.body.empty} </Message>
            </div>
          </Form>
          <Message type="success" show={data?.status === 201}>
              "Rejestracja przebiegła pomyślnie. Za chwilę zostaniesz przekierowany na stronę"
          </Message>
        </FormContainer>
      </PageContainer>
  );
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const body = {
    username: data.username,
    password: data.password,
    password2: data.password2,
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
