import React from "react";
// next imports
import Link from "next/link";
import Image from "next/image";
// ui icons
import { NotificationIcon } from "@ui/icons";

const UserTopHeader = () => {
  return (
    <div className="bg-violet-100 h-16 flex justify-between  items-center px-16 w-full">
      <div className="text-2xl text-yellow-0 font-semibold cursor-pointer gap-4">
        <Link href="/assessments">
          <a>Zuperscore</a>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-md text-yellow-0 cursor-pointer">Dashboard</div>
        <div className="text-md text-yellow-0 cursor-pointer">Assessment</div>
        <div className="text-md text-yellow-0 cursor-pointer">Calendar</div>
        <div className="text-md text-yellow-0 cursor-pointer">Homework</div>
        <div className="text-md text-yellow-0 cursor-pointer">Reports</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="cursor-pointer">
          <NotificationIcon width="18" height="18" fill="#F0E5C3" />
        </div>
        <div className="relative md:px-2 md:text-xl text-md text-[#f3e4b1] px-1 cursor-pointer h-10 w-10 rounded-full overflow-hidden">
          <Image
            src="/images/default.jpg"
            className="w-full h-full object-cover rounded"
            layout="fill"
            alt="user"
          />
        </div>
      </div>
    </div>
  );
};

export default UserTopHeader;
