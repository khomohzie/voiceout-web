import { BtnPrimary } from "@styles/common";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

type TProps = {
  complaintId: string;
};

const ReassignForm = ({ complaintId }: TProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/superadmin/reassign`,
        {
          complaintId: complaintId,
          recipient: email,
        }
      );

      toast.success(data.message);
    } catch (error: any) {
      let isErrorArray = Array.isArray(error.response.data);

      if (isErrorArray) {
        toast.error(error.response.data.message[0]);
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Container>
      <Title>Reassign this complaint</Title>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="email address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <BtnPrimary>Reassign</BtnPrimary>
      </form>
    </Container>
  );
};

const Container = styled.div`
  form {
    input {
      padding: 7px 10px;
      border: 2px solid transparent;
      outline-color: #29cc39;
      background: rgba(196, 196, 196, 0.27);
      box-sizing: border-box;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #444444;

      ::placeholder {
        color: #b5b5b5;
      }
    }
  }
`;

const Title = styled.h4`
  font-size: 20px;
`;

export default ReassignForm;
