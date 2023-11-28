import React, { useEffect } from "react";

import Navbar from "@/components/Navbar/DashboardNavbar";
import ClassCard from "@/app/dashboard/classCard";
import DashBoardSidebar from "@/components/SideBar/DashBoardSidebar";
import { SidebarProvider } from "@/components/Contexts/SideBarContext";
function Dashboard() {
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <>
          <Navbar></Navbar>
          <hr></hr>

          <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <div>
              <DashBoardSidebar />
            </div>
            <div className="overflow-x-hidden px-8 pb-4">
              <div className="grid gap-4 grid-cols-[repeat(auto-fillminmax(300px,1fr))]">
                <ClassCard />
              </div>
            </div>
            {/* <div>
            <ClassCard />
          </div>
          <div className="pt-10">
            <ClassCard />
          </div> */}
          </div>
        </>
      </div>
    </SidebarProvider>
  );
}
export default Dashboard;
