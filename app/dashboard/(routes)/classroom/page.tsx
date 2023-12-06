import React, { useEffect } from "react";

import Navbar from "@/components/Navbar/DashboardNavbar";
import DashBoardSidebar from "@/components/SideBar/DashBoardSidebar";
import { SidebarProvider } from "@/components/Contexts/SideBarContext";
import Link from "next/link";

function Classroom() {
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
            <div className="overflow-hidden-x px-8 pb-4">
              <div className="sticky top-0 bg-white z-10 pb-4">
                <div className="overflow-x-hidden relative">
                  <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]">
                    <Link
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      href="./classroom/"
                      className="
          inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]
          text-primary  hover:text-primary-600 focus:text-primary-600  active:text-primary-700"
                    >
                      Announcement
                    </Link>
                    <Link
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      href="./classroom/"
                      className="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                    >
                      Class
                    </Link>
                    <Link
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      href="./classroom/people"
                      className="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                    >
                      People
                    </Link>
                    <Link
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      href="./classroom/"
                      className="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                    >
                      Grade
                    </Link>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">help me</div>
            </div>
          </div>
        </>
      </div>
    </SidebarProvider>
  );
}
export default Classroom;
