import { BtnPrimary } from "@styles/common";
import React, { useEffect } from "react";
import styled from "styled-components";
import { FiLogIn } from "react-icons/fi";

type Props = {
  markComplete: Function;
};

const Success = ({ markComplete }: Props) => {
  useEffect(() => {
    markComplete(3);
  }, []);

  return (
    <Container>
      <AppName>{process.env.NEXT_PUBLIC_APPNAME}</AppName>

      <Title>Success</Title>

      <SuccessMessage>
        Profile Gets verified in 24 to 48 hours, users will not be able to do
        any activity, they can only have read access.
      </SuccessMessage>

      <BtnWrapper>
        <a href="/auth/login">
          <BtnPrimary className="custom_btn">
            Login <FiLogIn />
          </BtnPrimary>
        </a>
      </BtnWrapper>
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

const SuccessMessage = styled.div`
  margin-bottom: 24px;
  padding: 20px 8px;
  background: rgba(41, 204, 57, 0.27);
  border: 1px solid #32b69e;
  border-radius: 2px;
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  color: #202124;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: grid;
  place-content: center;

  .custom_btn {
    display: flex;
    align-items: center;
  }
`;

export default Success;
