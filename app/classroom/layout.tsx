"use client";

import { SidebarProvider } from "@/components/Contexts/SideBarContext";
import { AuthGuard } from "@/components/Guard/AuthGuard";
import Navbar from "@/components/Navbar/DashboardNavbar";
import DashBoardSideBar from "@/components/SideBar/DashBoardSidebar";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const classroomPath = pathname.split("/")[0] + pathname.split("/")[1];
  const currentPath = pathname.split("/")[3];

  return (
    <div className="min-w-screen min-h-screen">
      <AuthGuard>
        <SidebarProvider>
          <div className="flex flex-col">
            <Navbar></Navbar>

            <hr></hr>

            <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
              <div>
                <DashBoardSideBar />
              </div>

              <div className="overflow-x-auto min-h-[calc(100vh-56px-1.5rem)] min-w-screen">
                <div className="sticky top-0 bg-white z-10 pb-4 px-8 p-4">
                  <div className="overflow-x-hidden relative">
                    <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]">
                      <Link
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        href="./"
                        className={cn(
                          "inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700",
                          currentPath ? "text-primary-600" : ""
                        )}
                      >
                        Announcement
                      </Link>

                      <Link
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        href="./classroom/"
                        className={cn(
                          "inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                        )}
                      >
                        Class
                      </Link>

                      <Link
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        href={""}
                        className={cn(
                          "inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700",
                          currentPath ? "border-b-[3px] border-green-300" : ""
                        )}
                      >
                        People
                      </Link>

                      <Link
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        href="./classroom/"
                        className={cn(
                          "inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                        )}
                      >
                        Grade
                      </Link>
                    </div>
                  </div>
                </div>

                {children}
              </div>
            </div>
          </div>
        </SidebarProvider>
      </AuthGuard>
    </div>
  );
}
