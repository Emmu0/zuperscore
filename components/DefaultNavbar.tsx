import React from "react";

interface IProps {}

const DefaultNavbar: React.FC<IProps> = ({}) => {
  return (
    <div className="h-[60px] bg-violet-100 text-yellow-0">
      <div className="px-16 mx-auto w-full h-full flex items-center font-medium text-2xl">
        Zuperscore
      </div>
    </div>
  );
};

export default DefaultNavbar;
