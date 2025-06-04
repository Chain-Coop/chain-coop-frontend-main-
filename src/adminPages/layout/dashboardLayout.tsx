import { ReactNode } from "react";
import AdminSidebar from "../../components/dashboard/sidebar/adminSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-shrink-0">
        <AdminSidebar />
      </div>

      <main className="font-outfit flex-1 overflow-y-auto bg-gray-100 px-[1.3em] py-[1.5em] lg:px-[1.5em]">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
