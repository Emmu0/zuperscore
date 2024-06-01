import React from "react";
// components
import ProgressBar from "@components/ui/ProgressBar";
// icon
import { ChevronDownIcon } from "@heroicons/react/outline";

const InactiveProgress = ({ data }: any) => {
  const [expandProgressBar, setExpandProgressBar] = React.useState(false);
  const checkClassValue = (key: any): number => {
    let sum = 0;
    let arr: any = data?.progress || [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === key) sum = sum + 1 * arr[i].duration;
    }
    let total_class_hr = data[key] * 60;
    if (total_class_hr === 0) return 0;
    return sum > total_class_hr ? total_class_hr : sum;
  };
  const progressBarData = [
    {
      key: "core_class",
      color: "bg-[#ff6961]",
      percent: checkClassValue("core_class"),
      title: "Core Class",
    },
    {
      key: "doubts_class",
      color: "bg-[#ffb480]",
      percent: checkClassValue("doubts_class"),
      title: "Doubts Class",
    },
    {
      key: "strategy_class",
      color: "bg-[#f8f38d]",
      percent: checkClassValue("strategy_class"),
      title: "Strategy Class",
    },
    {
      key: "sectional_class",
      color: "bg-[#42d6a4]",
      percent: checkClassValue("sectional_class"),
      title: "Sectional Test",
    },
    {
      key: "reading_articles",
      color: "bg-[#08cad1]",
      percent: checkClassValue("reading_articles"),
      title: "Reading Articles",
    },
    {
      key: "mock_tests",
      color: "bg-[#59adf6]",
      percent: checkClassValue("mock_tests"),
      title: "Mock Tests",
    },
    {
      key: "practice_sheet",
      color: "bg-[#9d94ff]",
      percent: checkClassValue("practice_sheet"),
      title: "Practice Sheet",
    },
    {
      key: "analyse",
      color: "bg-[#c780e8]",
      percent: checkClassValue("analyse"),
      title: "Analysis",
    },
  ];

  const totalAllClassInMins = () => {
    let totalSumOfClassInMin: any =
      1 * data.core_class +
      1 * data.doubts_class +
      1 * data.strategy_class +
      1 * data.sectional_class +
      1 * data.reading_articles +
      1 * data.mock_tests +
      1 * data.practice_sheet +
      1 * data.analyse;
    return totalSumOfClassInMin;
  };
  const totalClassInMins = (key: string) => {
    let time_in_hr: any = data[key];
    return time_in_hr;
  };
  const renderName = (text: any) => {
    text = text.split("_");
    return text[0]?.charAt(0).toUpperCase() + text[0]?.slice(1).toLowerCase() + " " + text[1];
  };

  const getTitleByKey = (key: any) => {
    const item = progressBarData.find((data) => data.key === key);
    return item ? item.title : "";
  };

  return (
    <div className="pb-10">
      <div className="my-2 border bg-white">
        <div className="flex px-4 py-2 border-b border-gray-200 justify-between items-center">
          <div className="font-medium text-gray-500 flex gap-2 items-center">
            <div className="text-sm">Start Date: {data.start_date}</div>|
            <div className="text-sm">End Date: {data.end_date}</div>
          </div>
          <div className="ml-auto flex gap-2">
            <div className="font-medium text-gray-500 text-sm">View activity</div>
            <div className="cursor-pointer">
              {expandProgressBar ? (
                <ChevronDownIcon
                  width={20}
                  style={{ transition: "transform 0.5s ease", transform: "rotate(180deg)" }}
                  onClick={() => setExpandProgressBar(!expandProgressBar)}
                />
              ) : (
                <ChevronDownIcon
                  width={20}
                  style={{ transition: "transform 0.5s ease" }}
                  onClick={() => setExpandProgressBar(!expandProgressBar)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="px-4 border-b py-4">
          <div className="w-full flex items-center gap-2">
            <div className="w-[100%] relative flex h-2.5  bg-gray-200 rounded-full overflow-hidden">
              {progressBarData.reverse().map((data: any, index: any) => (
                <div
                  key={index}
                  style={{
                    width: `${(data.percent / totalAllClassInMins()) * 100}%`,
                  }}
                  className={`h-[14px] ${data.color} group h-2.5`}
                >
                  <span className=" text-sm hidden w-max group-hover:block absolute top-[-370%] bg-white p-1 border-2 border-black  rounded-md ">
                    {data.title}: {data.percent}/{totalClassInMins(data.key)} Mins.
                    <span
                      className={`absolute border-[8px] border-solid top-[100%] left-[5%] ml-[-5px]`}
                      style={{ borderColor: "black transparent transparent transparent" }}
                    ></span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {expandProgressBar && (
          <>
            <div className=" bg-white">
              {progressBarData.map((data: any, index: any) => (
                <div key={index} className="flex items-center px-4 py-2 border-b justify-start">
                  <div className="font-medium text-sm text-gray-500 w-[14%]">{data.title}</div>
                  <ProgressBar
                    percent={
                      (data.percent / totalClassInMins(data?.key)) * 100 >= 100
                        ? 100
                        : (data.percent / totalClassInMins(data?.key)) * 100
                    }
                    color={data.color}
                  />
                  <div className="font-medium text-sm text-gray-500 ml-3 whitespace-nowrap w-36 text-right">
                    {data.percent}/{totalClassInMins(data.key)} Mins
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {expandProgressBar && (
          <table className="w-full border border-collapse whitespace-nowrap mt-4">
            <thead className="border bg-yellow-100 h-10 text-violet-100 font-normal">
              <tr className="border">
                <th className="border px-3 p-1 text-center">#</th>
                <th className="border text-left px-3 p-1">Type of progress</th>
                <th className="border text-left px-3 p-1">Time (in Mins)</th>
                <th className="border text-left px-3 p-1">Date</th>
              </tr>
            </thead>

            <tbody>
              {data?.progress && data?.progress.length > 0 ? (
                data?.progress.map((user: any, idx: any) => (
                  <tr key={user.id} className="text-sm font-semibold">
                    <td className="border text-center">{idx + 1}</td>
                    <td className="border px-3 p-1">{getTitleByKey(user.name)}</td>
                    <td className="border px-3 p-1">{user.duration}</td>
                    <td className="border px-3 p-1">{user.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No classes added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default InactiveProgress;
