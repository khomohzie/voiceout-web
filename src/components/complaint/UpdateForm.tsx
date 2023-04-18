import { BtnPrimary } from "@styles/common";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

type TProps = {
  complaintId: string;
  admin?: boolean;
};

const UpdateForm = ({ complaintId, admin }: TProps) => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API}${
          admin
            ? `/complaints/status/${complaintId}`
            : `/complaints/status/superadmin/${complaintId}`
        }`,
        {
          newStatus: status,
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
      <Title>Update Complaint Status</Title>
      <form onSubmit={handleSubmit}>
        <select
          placeholder="status"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value="received">Received</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
        </select>

        <BtnPrimary>Update status</BtnPrimary>
      </form>
    </Container>
  );
};

const Container = styled.div`
  form {
    select {
      padding: 7px 10px;
      border: 2px solid transparent;
      background: rgba(196, 196, 196, 0.27);
      outline-color: #29cc39;
      box-sizing: border-box;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #444444;

      option {
        color: #3e4e54;
      }
    }
  }
`;

const Title = styled.h4`
  font-size: 20px;
`;

export default UpdateForm;
