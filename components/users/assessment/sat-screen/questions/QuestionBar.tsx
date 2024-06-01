import React from "react";
// recoil
import { useRecoilState } from "recoil";
// components
import Bookmark from "./Bookmark";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

const QuestionBar = ({ value, setValue, questionIndex, mask, setMask, attempt }: any) => {
  const [maskToggle, recoilMaskToggleSet] = useRecoilState(assessmentRecoil.maskToggle);

  return (
    <div className="bg-[#f3f3f3] w-full h-[26px] flex justify-between items-center rounded-sm select-none">
      <div className="flex justify-center items-center">
        <div className="w-[26px] h-[26px] bg-[#000000] text-white text-center md:text-sm p-1 font-bold flex justify-center items-center self-start text-[12px]">
          {questionIndex + 1}
        </div>
        <div className="mx-2 ">
          <Bookmark />
        </div>
      </div>
      <div className="ml-auto">
        <div className=" h-[26px] bg-blue-400 text-white text-center md:text-sm p-1 font-bold flex justify-center items-center self-start text-[12px] ml-4">
          {value?.type}
        </div>
      </div>
      <div className={`mx-2  ${value?.type === "SPR" ? "hidden" : ""}`}>
        <div
          className={`border-2 border-black p-1 text-[12px] font-bold w-[18xp] h-[18px] flex items-center cursor-pointer line-through ${
            maskToggle ? "bg-blue-400 text-white" : "bg-white"
          }`}
          onClick={() => recoilMaskToggleSet(!maskToggle)}
        >
          ABC
        </div>
      </div>
    </div>
  );
};

export default QuestionBar;
