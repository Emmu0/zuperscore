import React, { useEffect } from "react";
// headless ui
import { Transition, Popover } from "@headlessui/react";
// hero icons
import { ChevronDownIcon } from "@heroicons/react/solid";

const ReactHookTimeInput = ({
  label,
  minHours,
  maxHours,
  minuteInterval,
  value,
  setValue,
  name,
  disabled = false,
}: any) => {
  const [hours, setHours] = React.useState("00");
  const [min, setMin] = React.useState("00");

  useEffect(() => {
    if (value) {
      const [receivedHours, receivedMinutes] = value.split(":");
      setHours(receivedHours);
      setMin(receivedMinutes);
    }
  }, [value]);

  const handleHourChange = (event: any) => {
    const newHours = event.target.value;
    setHours(newHours);
    setValue(name, `${newHours}:${min}`);
  };

  const handleMinuteChange = (event: any) => {
    let newMinute = event.target.value;
    if (newMinute === "0") newMinute = "00";
    setMin(newMinute);
    setValue(name, `${hours}:${newMinute}`);
  };

  const hoursOptions = [];
  const minutesOptions = [];

  for (let i = minHours; i <= maxHours; i++) {
    hoursOptions.push(
      <option key={i} value={i} className={`py-2 ${i == hours && "bg-slate-100"} text-center`}>
        {i}
      </option>
    );
  }

  for (let j = 0; j < 60; j += minuteInterval) {
    minutesOptions.push(
      <option
        key={j}
        value={j}
        className={`py-1.5 ${j.toString() == min && "bg-slate-100"} text-center`}
      >
        {j}
      </option>
    );
  }
  return (
    <>
      <div className="text-sm text-dark-100 mb-1">{label}</div>
      <Popover className={"relative"}>
        <Popover.Button
          disabled={disabled}
          className="border inline-flex w-full justify-between items-center rounded bg-transparent text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap overflow-hidden"
        >
          <div className={`font-medium text-sm cursor-pointer px-2 py-2`}>
            <div className="flex flex-grow flex-wrap gap-2 items-center">
              {hours}:{min}
            </div>
          </div>
          <div className="w-[24px] h-[24px] flex justify-center items-center">
            <ChevronDownIcon
              className="h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </div>
        </Popover.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel
            className={`mb-4 z-20 absolute ${`left-0`} mt-1 w-[400px] max-h-[190px] overflow-hidden origin-top-left whitespace-nowrap flex flex-col`}
          >
            <div className="border border-gray-200 shadow w-60 flex max-h-40  scrollbar-hide bg-white">
              <div className="w-full">
                <div
                  id="hours"
                  onClick={handleHourChange}
                  className="h-full overflow-auto cursor-pointer"
                >
                  {hoursOptions}
                </div>
              </div>
              <div className="w-full border-l">
                <div
                  id="minutes"
                  onClick={handleMinuteChange}
                  className="h-full overflow-auto cursor-pointer"
                >
                  {minutesOptions}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default ReactHookTimeInput;
