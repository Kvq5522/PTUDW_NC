"use client";

import React, { useEffect } from "react";

import Navbar from "@/components/Navbar/DashboardNavbar";
import ClassCard from "@/app/dashboard/classCard";
import DashBoardSidebar from "@/components/SideBar/DashBoardSidebar";
import { SidebarProvider } from "@/components/Contexts/SideBarContext";

import { AXIOS } from "@/constants/ApiCall";
import { setUserInfo, resetUserInfo } from "@/redux/slices/user-info-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await AXIOS.GET({
          uri: "/user/get-info",
          token: localStorage.getItem("access-token") ?? "",
        });

        if (res.statusCode && res.statusCode === 200) {
          dispatch(setUserInfo(res.metadata));
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [dispatch]);

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
};
export default Dashboard;
