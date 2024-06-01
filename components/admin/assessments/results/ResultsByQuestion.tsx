import Tag from "@components/ui/Tag";
import React from "react";
const ResultsByQuestions = () => {
  return (
    <>
      <div className=" mt-4 bg-light-200 border border-border-light px-8 py-4 flex justify-between items-center ">
        <div>
          <div className="py-2 w-3/4">
            <div className="text-dark-200">
              1.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore?
            </div>
          </div>
          <div className="flex justify-start items-center">
            <Tag bgColor={"#FE903433"} title="Medium" />
            <Tag bgColor={"#7059FF1A"} title="Mathematics" />
          </div>
        </div>
      </div>
      <div className=" bg-light-200 border border-border-light px-8 py-4 flex justify-between items-center ">
        <div className="w-3/4 flex justify-start items-center">
          <div className="w-1/4 m-2  border-r">
            <div className="text-xl text-violet-100 font-semibold">80</div>
            <div className="text-sm text-violet-100">Answered</div>
          </div>
          <div className="w-1/4 m-2 border-r">
            {" "}
            <div className="text-xl text-[#000000B2] font-semibold">60 (56%)</div>
            <div className="text-sm text-[#000000B2]">Correct</div>
          </div>
          <div className="w-1/4 m-2 border-r">
            {" "}
            <div className="text-xl  text-[#000000B2] font-semibold">18 (12%)</div>
            <div className="text-sm text-[#000000B2]">Incorrect</div>
          </div>
          <div className="w-1/4 m-2  border-r">
            {" "}
            <div className="text-xl  text-[#000000B2] font-semibold">2</div>
            <div className="text-sm text-[#000000B2]">Not Answered</div>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-light-200 border border-border-light px-8 py-4 flex justify-between items-center ">
        <div>
          <div className="py-2 w-3/4">
            <div className="text-dark-200">
              1.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore?
            </div>
          </div>
          <div className="flex justify-start items-center">
            <Tag bgColor={"#FE903433"} title="Medium" />
            <Tag bgColor={"#7059FF1A"} title="Mathematics" />
          </div>
        </div>
      </div>
      <div className=" bg-light-200 border border-border-light px-8 py-4 flex justify-between items-center ">
        <div className="w-3/4 flex justify-start items-center">
          <div className="w-1/4 m-2  border-r">
            <div className="text-xl text-violet-100 font-semibold">80</div>
            <div className="text-sm text-violet-100">Answered</div>
          </div>
          <div className="w-1/4 m-2 border-r">
            {" "}
            <div className="text-xl text-[#000000B2] font-semibold">60 (56%)</div>
            <div className="text-sm text-[#000000B2]">Correct</div>
          </div>
          <div className="w-1/4 m-2 border-r">
            {" "}
            <div className="text-xl  text-[#000000B2] font-semibold">18 (12%)</div>
            <div className="text-sm text-[#000000B2]">Incorrect</div>
          </div>
          <div className="w-1/4 m-2  border-r">
            {" "}
            <div className="text-xl  text-[#000000B2] font-semibold">2</div>
            <div className="text-sm text-[#000000B2]">Not Answered</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResultsByQuestions;
