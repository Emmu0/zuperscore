import React from "react";
// components
import AdminSidebar from "@components/admin/Sidebar";
import AdminTopBar from "@components/admin/TopBar";

interface IProps {
  children: React.ReactNode;
  padding?: boolean;
}

const AdminLayout: React.FC<IProps> = ({ children, padding = true }) => {
  return (
    <div className="relative h-screen min-h-[400px] w-full min-w-[900px] flex overflow-hidden">
      <div className="flex-shrink-0 w-[280px] h-full">
        <AdminSidebar />
      </div>
      <div className="w-full h-full relative flex flex-col bg-light-0 overflow-hidden">
        <div className="flex-shrink-0 w-full h-[60px] border-b border-gray-200 bg-white overflow-hidden">
          <AdminTopBar />
        </div>
        <div
          className={`w-full h-full overflow-y-auto bg-light-0 overflow-hidden ${padding && `p-5`}`}
        >
          <div className="container mx-auto h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
