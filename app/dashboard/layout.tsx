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
          <div className="flex flex-col">
              <Navbar></Navbar>

              <hr></hr>

              <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
                <div>
                  <DashBoardSideBar />
                </div>

                <div className="overflow-x-auto min-h-[calc(100vh-56px-1.5rem)] min-w-screen">
                    {children}
                </div>
              </div>
          </div>
        </SidebarProvider>
      </AuthGuard>
    </div>
  );
}
