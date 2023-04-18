import Loader from "@components/app/Loader";
import axios from "axios";
import { TComplaints } from "interfaces/complaint.interface";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function ComplaintTable({ admin }: { admin: boolean }) {
  const [complaints, setComplaints] = useState<TComplaints[]>();

  const retrieveComplaints = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}${
          admin ? `/admin/complaints` : `/superadmin/complaints`
        }`
      );

      setComplaints(data.data);

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
    retrieveComplaints();
  }, []);

  return (
    <Container>
      {complaints ? (
        <Table className="responsiveTable">
          <Thead>
            <Tr>
              <Th>Complaint Subject</Th>
              <Th>Student's Name</Th>
              <Th>Date</Th>
              <Th>Priority</Th>
            </Tr>
          </Thead>
          <Tbody>
            {complaints.map((complaint) => (
              <Tr key={complaint._id}>
                <Td>
                  <Link
                    href={
                      admin
                        ? `/complaints/admin/${complaint._id}`
                        : `/complaints/${complaint._id}`
                    }
                  >
                    {complaint.subject}
                  </Link>
                </Td>
                <Td>
                  {complaint.sender.firstname || "User"}{" "}
                  {complaint.sender.lastname || "User"}({complaint.sender.email}
                  )
                </Td>
                <Td>{new Date(complaint.createdAt).toUTCString()}</Td>
                <Td>{complaint.priority}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Loader width={30} height={30} />
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-left: 170px;

  @media (max-width: 500px) {
    margin-left: 50px;
  }
`;
