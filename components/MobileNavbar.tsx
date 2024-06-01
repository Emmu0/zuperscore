import React from "react";
// components
import Button from "@components/buttons";
// cookie
import { logout } from "@lib/cookie";

interface IProps {}

const MobileNavbar: React.FC<IProps> = ({}) => {
  return (
    <div className="h-[60px] shadow">
      <div className="container px-5 mx-auto w-full h-full flex items-center">
        <div className="font-medium text-2xl text-violet-100">Zuperscore</div>
        <div className="ml-auto">
          <Button size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
