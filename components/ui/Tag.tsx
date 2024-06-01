import React from "react";

const Tag = ({ title, bgColor }:any) => {
  return (
    <div
      className={"bg-["+bgColor+"] py-1 px-4 rounded-[40px] mr-1 text-[#434343]"}
    >
      {title}
    </div>
  );
};

export default Tag;
