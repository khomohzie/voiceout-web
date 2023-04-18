import Sidebar from "@components/app/Sidebar";
import ComplaintTable from "@components/complaint/ComplaintTable";
import React from "react";

const Complaints = () => {
  return (
    <>
      <Sidebar />
      <ComplaintTable admin={true} />
    </>
  );
};

export default Complaints;
