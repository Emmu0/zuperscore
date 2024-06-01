import React, { useEffect, useState, useRef } from "react";

type Props = {
  startTime: number;
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

const GlobalTimer = ({ startTime, handleTimerEnd }: Props) => {
  const { hours = 0, minutes = 0, seconds = 60 } = secondsToHms(startTime);

  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);

  const timeRef = useRef<any>();

  const reset = () => {
    clearInterval(timeRef.current);
    if (handleTimerEnd) handleTimerEnd();
  };

  const tick = () => {
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
    <>
      {!!hrs && <>{hrs.toString().padStart(2, "0")}:</>}
      {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
    </>
  );
};

export default GlobalTimer;
