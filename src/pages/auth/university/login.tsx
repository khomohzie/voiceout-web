import LoginForm from "@components/auth/login/LoginForm";
import { AuthContext } from "context";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";

const Login = () => {
  const router = useRouter();

  // Redirect user to homepage if already logged in.
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  return (
    <Container>
      <LoginForm />
      <ImageDiv>
        <img src="/images/signup.png" alt="Signup page image/illustration" />
      </ImageDiv>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 38px;
  margin: 0 48px;
  max-height: 100dvh;

  @media (max-width: 1300px) {
    display: block;
  }

  @media (max-width: 700px) {
    margin-left: 24px;
    margin-right: 24px;
  }

  @media (max-width: 476px) {
    margin-left: 32px;
    margin-right: 32px;
  }
`;

const ImageDiv = styled.div`
  @media (max-width: 1300px) {
    display: none;
  }
`;

export default Login;
