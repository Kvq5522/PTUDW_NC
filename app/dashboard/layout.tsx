import { SidebarProvider } from "@/components/Contexts/SideBarContext";
import { AuthGuard } from "@/components/Guard/AuthGuard";
import Navbar from "@/components/Navbar/DashboardNavbar";
import DashBoardSideBar from "@/components/SideBar/DashBoardSidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-screen min-h-screen">
      <AuthGuard>
        <SidebarProvider>
          <div className="max-h-screen flex flex-col">
            <>
              <Navbar></Navbar>
              <hr></hr>

              <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
                <div>
                  <DashBoardSideBar />
                </div>
                <div className="overflow-x-hidden px-8 pb-4">
                  <div className="grid gap-4 grid-cols-[repeat(auto-fillminmax(300px,1fr))]">
                    {children}
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
      </AuthGuard>
    </div>
  );
}
