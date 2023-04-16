import React, { useState } from "react";
import styled from "styled-components";
import { BtnPrimary } from "@styles/common";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@components/app/Loader";
import OTPInput from "react-otp-input";

type TInput = {
  frontId: File[];
  backId: File[];
};

type Props = {
  setActive: React.Dispatch<React.SetStateAction<number>>;
  markComplete: Function;
  nextStep: Function;
  prevStep: Function;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const EmailVerify = ({
  setActive,
  markComplete,
  nextStep,
  prevStep,
  formData,
}: Props) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    // Prevent reloading of page when form is submitted.
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/admin/auth/verify`,
        {
          email: formData.data.email,
          code: otp,
        }
      );

      toast.success(data.message);

      setLoading(false);

      setActive(2);
      markComplete(2);
      nextStep();
    } catch (error: any) {
      let isErrorArray = Array.isArray(error.response.data);

      if (isErrorArray) {
        toast.error(error.response.data.message[0]);
      } else {
        toast.error(error.response.data.message);
      }

      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    height: "100px",
  };

  return (
    <Container>
      <AppName>{process.env.NEXT_PUBLIC_APPNAME}</AppName>

      <Title>Email Verification</Title>

      <form onSubmit={onSubmit}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={inputStyle}
        />

        <ButtonWrapper>
          <BtnPrimary type="submit">
            {loading ? <Loader width={30} height={30} /> : "Submit"}
          </BtnPrimary>
        </ButtonWrapper>
      </form>
    </Container>
  );
};

const Container = styled.div``;

const AppName = styled.h1`
  font-weight: 500;
  font-size: 30px;
  line-height: 39px;
  color: #29cc39;
`;

const Title = styled.h1`
  margin-top: 70px;
  font-weight: 500;
  font-size: 24px;
  line-height: 31px;
  color: #202124;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 24px;
  box-sizing: border-box;
`;

export default EmailVerify;
