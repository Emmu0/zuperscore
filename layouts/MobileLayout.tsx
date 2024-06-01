import React from "react";
// components
import MobileNavbar from "@components/MobileNavbar";

type Props = {
  children: React.ReactNode;
};

const MobileLayout = ({ children }: Props) => {
  return (
    <div className="relative w-full h-screen min-h-[400px] overflow-y-auto flex flex-col">
      <MobileNavbar />
      <div className="h-full">{children}</div>
    </div>
  );
};

export default MobileLayout;
