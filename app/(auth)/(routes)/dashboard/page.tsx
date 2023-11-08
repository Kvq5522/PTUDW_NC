import React, { useEffect } from "react";
import "@/Screen/dashboard.css";

import Navbar from "@/components/navBar";
import ClassCard from "@/components/classCard";
function Dashboard() {
  return (
    <div className="dashboard">
      <>
        <div>
          <Navbar></Navbar>
        </div>
        <div className="dashboard__classContainer">
          <div>
            <ClassCard />
          </div>
          <div>
            <ClassCard />
          </div>
        </div>
      </>
    </div>
  );
}
export default Dashboard;
