import React, { useEffect } from "react";
import "@/Styles/dashboard.css";
import HeaderLandingPage from "@/components/Header/HeaderLandingPage";
import Navbar from "@/components/Navbar/DashboardNavbar";
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
