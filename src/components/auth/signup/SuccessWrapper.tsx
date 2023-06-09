import React from "react";
import styled from "styled-components";
import Success from "./Success";

type Props = {
  markComplete: Function;
  staffSignup?: boolean;
};

const SuccessWrapper = ({ markComplete, staffSignup }: Props) => {
  return (
    <Container>
      <Success markComplete={markComplete} staffSignup={staffSignup} />
      <ImageDiv>
        <img src="/images/verifyid.png" alt="Signup page image/illustration" />
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

  @media (max-width: 960px) {
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
  @media (max-width: 1560px) {
    max-width: 50vw;
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

export default SuccessWrapper;
