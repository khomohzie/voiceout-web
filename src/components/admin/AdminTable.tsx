import Loader from "@components/app/Loader";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { toast } from "react-toastify";
import styled from "styled-components";

type TAdmins = {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
};

export default function AdminTable() {
  const [admins, setAdmins] = useState<TAdmins[]>();

  const retrieveadmins = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/admin/list/superadmin`
      );

      setAdmins(data.data);

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
    retrieveadmins();
  }, []);

  return (
    <Container>
      {admins ? (
        <Table className="responsiveTable">
          <Thead>
            <Tr>
              <Th>Email Address</Th>
              <Th>Firstname</Th>
              <Th>lastname</Th>
            </Tr>
          </Thead>
          <Tbody>
            {admins.map((admin) => (
              <Tr key={admin._id}>
                <Td>{admin.email}</Td>
                <Td>{admin.firstname || "User"}</Td>
                <Td>{admin.lastname || "User"}</Td>
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
