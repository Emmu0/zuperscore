import React from "react";
// components
import UserNavbar from "@components/users/assessment/result/Navbar";

interface IProps {
  children: React.ReactNode;
  padding?: boolean;
}

const UserLayout: React.FC<IProps> = ({ children, padding = true }) => {
  return (
    <div className="h-screen min-h-[400px] w-full min-w-[900px] flex flex-col">
      <div className=" flex-shrink-0 w-full h-[10vh]">
        <UserNavbar />
      </div>

      <div className={`w-full h-full overflow-y-auto container mx-auto ${padding && `p-5`}`}>
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
