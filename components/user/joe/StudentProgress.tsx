import React from "react";
// react hook form
import { useFieldArray } from "react-hook-form";
// components
import Button from "@components/buttons";
import ProgressBar from "@components/ui/ProgressBar";
import FirstToSchedule from "./FirstToSchedule";
// icon
import { ChevronDownIcon } from "@heroicons/react/outline";
import JoeClassAdd from "./joeclassadd";

const StudentProgress = ({
  control,
  watch,
  register,
  setValue,
  getValues,
  handleSubmit,
  onSubmitHandler,
  isSubmitting,
  user_id,
}: any) => {
  const [workingProgress, setWorkingProgress] = React.useState(false);
  const [expandProgressBar, setExpandProgressBar] = React.useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "progress",
  });
  const checkClassValue = (key: any): number => {
    let sum = 0;
    let arr: any = getValues("progress");
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === key) sum = sum + 1 * arr[i].duration;
    }
    let total_class_hr = watch(key) * 60;
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
  const getTitleByKey = (key: any) => {
    const item = progressBarData.find((data) => data.key === key);
    return item ? item.title : "";
  };

  const totalClassInMins = (key: string) => {
    let time_in_hr: any = watch(key);
    if (time_in_hr === 0) return 1000000;
    return time_in_hr * 60;
  };
  const totalAllClassInMins = () => {
    let totalSumOfClassInMin: any =
      1 * watch("core_class") +
      1 * watch("doubts_class") +
      1 * watch("strategy_class") +
      1 * watch("sectional_class") +
      1 * watch("reading_articles") +
      1 * watch("mock_tests") +
      1 * watch("practice_sheet") +
      1 * watch("analyse");
    return totalSumOfClassInMin * 60;
  };

  const onRemove = (index: number) => {
    remove(index);
    const newValues = getValues("progress");
    newValues.map((items: any, idx: any) => {
      setValue(`progress[${idx}].name`, items.name);
      setValue(`progress[${idx}].duration`, items.duration);
      setValue(`progress[${idx}].date`, items.date);
    });
    handleSubmit(onSubmitHandler)();
  };

  return (
    <>
      <div className=" my-2 border bg-white">
        <div className="flex px-4 py-2 border-b border-gray-200 justify-between items-center">
          <div className="font-medium text-gray-500 flex gap-2 items-center">
            <div className="text-xl text-violet-100">JOE</div>
            <div className="text-black pr-2">Weekly Progress</div>
            <div className="text-sm">Start Date: {getValues("start_date")}</div>|
            <div className="text-sm">End Date: {getValues("end_date")}</div>
          </div>
          <Button size="sm" onClick={() => setWorkingProgress(!workingProgress)}>
            Set weekly progress
          </Button>
        </div>
        <div className="px-4 border-b py-4">
          <div className="w-full flex items-center gap-2">
            <div className="w-[100%] relative flex h-2.5 bg-gray-200">
              {progressBarData
                .slice(0)
                .reverse()
                .map((data: any, index: any) => (
                  <div
                    key={index}
                    style={{
                      width: `${(data.percent / totalAllClassInMins()) * 100}%`,
                    }}
                    className={`h-2.5 ${data.color} group`}
                  >
                    <span className=" text-sm hidden w-max group-hover:block absolute top-[-370%] bg-white p-1 border-2 border-black  rounded-md ">
                      {data.title}: {data.percent}/{totalClassInMins(data.key)} Mins
                      <span
                        className={`absolute border-[8px] border-solid top-[100%] left-[5%] ml-[-5px]`}
                        style={{ borderColor: "black transparent transparent transparent" }}
                      ></span>
                    </span>
                  </div>
                ))}
            </div>
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
        <div className="bg-white">
          <JoeClassAdd
            progressBarData={progressBarData}
            append={append}
            handleSubmitHandler={handleSubmit}
            onSubmitHandlerParent={onSubmitHandler}
            minDate={getValues("start_date")}
            maxDate={getValues("end_date")}
          />
          <table className="w-full border border-collapse whitespace-nowrap mt-4">
            <thead className="border bg-yellow-100 h-10 text-violet-100 font-normal">
              <tr className="border">
                <th className="border px-3 p-1 text-center">#</th>
                <th className="border text-left px-3 p-1">Type of progress</th>
                <th className="border text-left px-3 p-1">Time (in Mins)</th>
                <th className="border text-left px-3 p-1">Date</th>
                <th className="border text-left px-3 p-1"></th>
              </tr>
            </thead>

            <tbody>
              {watch("progress") && watch("progress").length > 0 ? (
                watch("progress")
                  .map((user: any, idx: any) => (
                    <tr key={user.id} className="text-sm font-semibold">
                      <td className="border text-center">{watch("progress").length - idx}</td>
                      <td className="border px-3 p-1">
                        {getTitleByKey(watch(`progress[${idx}].name`))}
                      </td>
                      <td className="border px-3 p-1">{watch(`progress[${idx}].duration`)}</td>
                      <td className="border px-3 p-1">{watch(`progress[${idx}].date`)}</td>
                      <td className="border px-3 p-1 flex">
                        <Button
                          variant="outline-primary"
                          className="mx-auto py-1"
                          size="xs"
                          onClick={() => onRemove(idx)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))
                  .reverse()
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No classes added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <FirstToSchedule
        workingProgress={workingProgress}
        setWorkingProgress={setWorkingProgress}
        register={register}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        user_id={user_id}
        watch={watch}
        getValue={getValues}
      />
    </>
  );
};
export default StudentProgress;
