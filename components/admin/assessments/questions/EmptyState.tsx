import React from "react";
// next imports
import Image from "next/image";
// components
import Button from "@components/buttons";

const EmptyState = ({ setEditMode }: any) => {
  return (
    <div>
      <div className="mx-16 mt-8 flex flex-col justify-around items-center px-32 h-[50vh]">
        <div className="flex justify-center items-center">
          <Image
            src="/images/empty-question-box.png"
            height={150}
            width={150}
            alt="Empty questions"
          />
        </div>
        <div className="text-2xl font-medium">No Questions has been created</div>
        <div className="text-dark-0 text-xl text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.{" "}
        </div>
        <div>
          {/* <Button
            className="px-4 py-2 border border-violet-100 text-yellow-0 bg-violet-100 font-medium"
            onClick={() => setEditMode(true)}
          >
            + New Question{" "}
          </Button> */}
        </div>
      </div>
    </div>
  );
};
export default EmptyState;
