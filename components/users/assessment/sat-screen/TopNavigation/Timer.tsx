import React, { useEffect, useState, useRef } from "react";
// icons
import { ClockIcon } from "@heroicons/react/solid";
import { useSetRecoilState } from "recoil";
import * as assessmentRecoil from "recoil/assessments/index";

type Props = {
  startTime: number;
  handleSeconds?: (value: any) => void;
  handleTimerEnd?: () => void;
};

export const secondsToHms = (d: number) => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  return {
    hours: h,
    minutes: m,
    seconds: s,
  };
};

const GlobalTimer = ({ startTime, handleSeconds, handleTimerEnd }: Props) => {
  const [timer, setTimer] = React.useState<any>(null);
  const { hours = 0, minutes = 0, seconds = 60 } = secondsToHms(startTime);

  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);

  const timeRef = useRef<any>();
  const testCompletedSet = useSetRecoilState(assessmentRecoil.testCompletedSelector);

  const reset = () => {
    clearInterval(timeRef.current);
    if (handleTimerEnd) handleTimerEnd();
  };

  const tick = () => {
    // if (document.visibilityState === "hidden") {
    //   testCompletedSet("TAB-INACTIVE-TEST-CLOSE");
    //   return;
    // }
    if (handleSeconds) {
      let currentTime = timer === null ? startTime : timer - 1;
      handleSeconds(currentTime);
      setTimer((prevData: any) => currentTime);
    }

    if (hrs === 0 && mins === 0 && secs === 0) reset();
    else if (mins === 0 && secs === 0) setTime([hrs - 1, 59, 59]);
    else if (secs === 0) setTime([hrs, mins - 1, 59]);
    else setTime([hrs, mins, secs - 1]);
  };

  useEffect(() => {
    if (startTime) timeRef.current = setInterval(() => tick(), 1000);
    return () => clearInterval(timeRef.current);
  }, [hrs, mins, secs]);

  const [hide, setHide] = React.useState(false);

  return (
    <div className="flex flex-col justify-center items-center">
      {hide ? (
        <div>
          <ClockIcon className="w-[26px] h-[26px] text-gray-400" aria-hidden="true" />
        </div>
      ) : (
        <div className="text-lg font-semibold">
          {!!hrs && <>{hrs.toString().padStart(2, "0")}:</>}
          {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
        </div>
      )}
      <button onClick={() => setHide(!hide)}>{hide ? "show" : "hide"}</button>
    </div>
  );
};

export default GlobalTimer;
