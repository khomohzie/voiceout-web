import Sidebar from "@components/app/Sidebar";
import ComplaintWrapper from "@components/complaint/ComplaintWrapper";
import React from "react";

const ComplaintDetails = () => {
  return (
    <>
      {" "}
      <Sidebar />
      <ComplaintWrapper admin={true} />
    </>
  );
};

export default ComplaintDetails;
