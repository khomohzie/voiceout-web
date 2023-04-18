import Sidebar from "@components/app/Sidebar";
import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <Sidebar />
      <h1>
        Welcome to <span>{process.env.NEXT_PUBLIC_APPNAME}</span>
      </h1>
    </Container>
  );
};

const Container = styled.div`
  h1 {
    margin-left: 170px;
    text-align: center;

    span {
      color: #29cc39;
    }

    @media (max-width: 500px) {
      margin-left: 50px;
    }
  }
`;

export default Home;
