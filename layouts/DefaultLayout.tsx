import React from "react";
// components
import DefaultNavbar from "@components/DefaultNavbar";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-full min-h-screen">
      <DefaultNavbar />
      {children}
    </div>
  );
};

export default DefaultLayout;
