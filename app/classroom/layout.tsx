"use client";

import { SidebarProvider } from "@/components/Contexts/SideBarContext";
import { AuthGuard } from "@/components/Guard/AuthGuard";
import Navbar from "@/components/Navbar/DashboardNavbar";
import DashBoardSideBar from "@/components/SideBar/DashBoardSidebar";

import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const currentRoute = pathname.split("/")[3];
  const classroomId = params.classroomId;
  const isInviteRoute = pathname.split("/").includes("invite");

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // If scroll position is greater than 0 (i.e., user has scrolled down), add shadow
      if (scrollPosition > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    // Add event listener for scroll event
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="w-screen min-h-screen">
      <AuthGuard>
        <SidebarProvider>
          <div className="flex flex-col">
            <Navbar></Navbar>

            <hr></hr>

            <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
              <div>
                <DashBoardSideBar  />
              </div>

              <div className="overflow-x-auto min-h-[calc(100vh-56px-1.5rem)] min-w-screen">
                {!isInviteRoute && (
                  <div
                    className={`sticky top-0 bg-white z-10 px-6 border-b-[1px] ${
                      scrolled ? "shadow-lg" : ""
                    }`}
                  >
                    <div className="overflow-x-hidden relative">
                      <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]">
                        <Link
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          href={`/classroom/${classroomId}/stream`}
                          className={cn(
                            "inline-block rounded-md px-6 pb-3 pt-3.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700",
                            currentRoute === "stream"
                              ? "border-b-[3px] border-green-300"
                              : ""
                          )}
                        >
                          Stream
                        </Link>

                        <Link
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          href={`/classroom/${classroomId}/people`}
                          className={cn(
                            "inline-block rounded-md px-6 pb-3 pt-3.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700",
                            currentRoute === "people"
                              ? "border-b-[3px] border-green-300"
                              : ""
                          )}
                        >
                          People
                        </Link>

                        <Link
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          href={`/classroom/${classroomId}/grade/transcript`}
                          className={cn(
                            "inline-block rounded-md px-6 pb-3 pt-3.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700",
                            currentRoute === "grade"
                              ? "border-b-[3px] border-green-300"
                              : ""
                          )}
                        >
                          Grade
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {children}
              </div>
            </div>
          </div>
        </SidebarProvider>
      </AuthGuard>
    </div>
  );
}
