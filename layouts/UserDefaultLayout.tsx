import React from "react";
// components
import UserSidebar from "@components/admin/UserSidebar";

interface IProps {
  children: React.ReactNode;
  padding?: boolean;
}

const UserDefaultLayout: React.FC<IProps> = ({ children, padding = true }) => {
  return (
    <div className="relative h-screen min-h-[400px] w-full min-w-[900px] flex overflow-hidden">
      <div className="flex-shrink-0 w-[280px] h-full">
        <UserSidebar />
      </div>
      <div className="w-full h-full relative flex flex-col bg-light-0 overflow-hidden">
        <div
          className={`w-full h-full overflow-y-auto bg-light-0 overflow-hidden ${padding && `p-5`}`}
        >
          <div className="container mx-auto h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDefaultLayout;
