import React from "react";

interface IAssessmentBorder {
  count?: number;
}

const colorFormat = [
  "bg-gray-500",
  "bg-gray-300",
  "bg-yellow-500",
  "bg-blue-500",
  "bg-gray-500",
  "bg-gray-500",
  "bg-gray-500",
  "bg-gray-500",
  "bg-gray-500",
  "bg-gray-500",
  "bg-gray-500",
  "bg-gray-500",
  "bg-gray-300",
  "bg-gray-500",
  "bg-gray-500",
  "bg-gray-300",
  "bg-yellow-500",
  "bg-yellow-500",
  "bg-yellow-500",
  "bg-gray-300",
];

const AssessmentBorder: React.FC<IAssessmentBorder> = ({ count }) => {
  return (
    <div className="w-full flex gap-1">
      {Array.from(Array(count ? count : 3).keys()).map((_: any, _idx: any) => (
        <div key={_idx} className="w-full flex gap-1">
          {colorFormat.map((_item: any, _index: any) => (
            <div key={_index} className={`w-full h-[2px] ${_item} `}></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AssessmentBorder;
