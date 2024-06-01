import React from "react";
// next imports
import Image from "next/image";

const RequestCard = () => {
  return (
    <div className="border border-border-light my-8 p-4 px-8">
      <div className="flex justify-start items-center">
        <div className="h-[30px] w-[30px] rounded-[50%]">
          <Image
            src="/images/default.jpg"
            alt="profilepic"
            className="h-[30px] w-[30px] rounded-[50%]"
            height={30}
            width={30}
          />
        </div>
        <div className="ml-4 text-xl font-semibold">Bhavesh Raja</div>
      </div>
      <div className="flex justify-between items-center mt-8 ">
        <div className="text-md text-dark-300">
          Date : <span className="text-dark-500">12 May 2022</span>
        </div>
        <div className="text-md text-dark-300">
          Time : <span className="text-dark-500">4:00 - 4:50 PM </span>
        </div>
        <div className="text-md text-dark-300">
          Teacher : <span className="text-dark-500">Bhavesh Raja</span>
        </div>
        <div className="text-md text-dark-300">
          Subject: <span className="text-dark-500">Science </span>
        </div>
      </div>
    </div>
  );
};
export default RequestCard;
