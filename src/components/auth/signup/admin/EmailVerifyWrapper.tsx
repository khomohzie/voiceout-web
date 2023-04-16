import React from "react";
import styled from "styled-components";
import VerifyId from "../VerifyId";
import EmailVerify from "./EmailVerify";

type Props = {
  setActive: React.Dispatch<React.SetStateAction<number>>;
  markComplete: Function;
  nextStep: Function;
  prevStep: Function;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const EmailVerifyWrapper = ({
  setActive,
  markComplete,
  nextStep,
  prevStep,
  formData,
  setFormData,
}: Props) => {
  return (
    <Container>
      <EmailVerify
        setActive={setActive}
        markComplete={markComplete}
        nextStep={nextStep}
        prevStep={prevStep}
        formData={formData}
        setFormData={setFormData}
      />
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

export default EmailVerifyWrapper;
