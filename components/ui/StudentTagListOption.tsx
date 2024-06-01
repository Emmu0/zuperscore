import Image from "next/image";
import React from "react";

const StudentTagListOption = ({ name, active, selected = false }: any) => {
  return (
    <div
      className={`${
        active || selected ? "bg-violet-0/20" : "bg-[#F9F9F9]"
      } rounded-[50px] flex justify-around  items-center p-1 cursor-pointer`}
    >
      <div className="h-8 w-8 ">
        <Image
          src="/images/default.jpg"
          alt="profile picture"
          height={32}
          width={32}
          className="rounded-[50%]"
        />{" "}
      </div>
      <div className="px-1">{name}</div>
      <div className={selected ? "" : "hidden"}>&times;</div>
      <div className={selected ? "hidden" : "hidden"}>+</div>
    </div>
  );
};

export default StudentTagListOption;
