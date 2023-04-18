import Loader from "@components/app/Loader";
import axios from "axios";
import { TComplaints } from "interfaces/complaint.interface";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import UpdateForm from "./UpdateForm";
import ReassignForm from "./ReassignForm";

const ComplaintWrapper = ({ admin }: { admin?: boolean }) => {
  const router = useRouter();

  const [complaint, setComplaint] = useState<TComplaints>();

  const retrieveComplaint = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/complaints/${router.query.slug}`
      );

      setComplaint(data.data);

      console.log(data.data);
    } catch (error: any) {
      console.error(error);
      let isErrorArray = Array.isArray(error.response.data);

      if (isErrorArray) {
        toast.error(error.response.data.message[0]);
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    retrieveComplaint();
  }, []);

  return (
    <Container>
      {complaint ? (
        <>
          <ComplaintSubject>{complaint.subject}</ComplaintSubject>
          <DetailHead>From:</DetailHead>
          <DetailBody>{complaint.sender.firstname || "User"}</DetailBody>
          <DetailBody>{complaint.sender.lastname || "User"}</DetailBody>
          <DetailBody>{complaint.sender.email}</DetailBody>
          <DetailHead>Details</DetailHead>
          <ComplaintDetails>{complaint.details}</ComplaintDetails>
          {complaint.images.map((image) => (
            <ImageContainer src={image} />
          ))}
          <DetailHead>Receiver</DetailHead>
          <DetailBody>{complaint.receiver || "You"}</DetailBody>
          <DetailHead>Reassigned to:</DetailHead>
          <DetailBody>{complaint.reassigned_to || "None"}</DetailBody>
          <DetailHead>Priority</DetailHead>
          <DetailBody>{complaint.priority}</DetailBody>
          <DetailHead>Status</DetailHead>
          <DetailBody>{complaint.status}</DetailBody>
          <DetailHead>Date Submitted</DetailHead>
          <DetailBody>{new Date(complaint.createdAt).toUTCString()}</DetailBody>

          <UpdateForm complaintId={complaint._id} admin={admin} />

          {!admin && <ReassignForm complaintId={complaint._id} />}
        </>
      ) : (
        <Loader width={30} height={30} />
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-left: 180px;
  max-height: 90vh;

  @media (max-width: 500px) {
    margin-left: 60px;
  }
`;

const ComplaintSubject = styled.h1`
  text-align: center;
`;

const ComplaintDetails = styled.p`
  font-size: 16px;
`;

const DetailHead = styled.h4`
  font-size: 20px;
`;
const DetailBody = styled.p``;

const ImageContainer = styled.img`
  width: 100px;
  height: 100px;
`;

export default ComplaintWrapper;
