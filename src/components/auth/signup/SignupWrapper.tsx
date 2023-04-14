import React from "react";
import SignupForm from "./SignupForm";
import styled from "styled-components";

type Props = {
  setActive: React.Dispatch<React.SetStateAction<number>>;
  markComplete: Function;
  nextStep: Function;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const SignupWrapper = ({
  setActive,
  markComplete,
  nextStep,
  formData,
  setFormData,
}: Props) => {
  return (
    <Container>
      <SignupForm
        setActive={setActive}
        markComplete={markComplete}
        nextStep={nextStep}
        formData={formData}
        setFormData={setFormData}
      />
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

export default SignupWrapper;
