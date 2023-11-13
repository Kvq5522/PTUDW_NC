import React, { useEffect } from "react";

import Navbar from "@/components/Navbar/DashboardNavbar";
import ClassCard from "@/app/dashboard/classCard";
function Dashboard() {
  return (
    <div className="dashboard">
      <>
        <div>
          <Navbar></Navbar>
        </div>
        <div className="dashboard__classContainer pt-10 pl-10">
          <div>
            <ClassCard />
          </div>
          <div className="pt-10">
            <ClassCard />
          </div>
        </div>
      </>
    </div>
  );
}
export default Dashboard;
