import { useEffect, useState } from "react";

type TimerProps = {
  seconds: number;
  callback?: Function;
};

const Timer = (props: TimerProps) => {
  const [hoursDisplay, setHours] = useState<string | null>("00");
  const [minutesDisplay, setMinutes] = useState<string>("00");
  const [secondsDisplay, setSeconds] = useState<string>("00");

  useEffect(() => {
    let seconds = props.seconds;
    let timer = setInterval(() => {
      let hours = Math.floor(seconds / (60 * 60));
      let minutes = Math.floor((seconds / 60) % 60);
      let secondsCount = Math.floor(seconds % 60);

      hours < 1 ? setHours(null) : hours <= 9 ? setHours(`0${hours}`) : setHours(`${hours}`);
      minutes <= 9 ? setMinutes(`0${minutes}`) : setMinutes(`${minutes}`);
      secondsCount <= 9 ? setSeconds(`0${secondsCount}`) : setSeconds(`${secondsCount}`);

      seconds--;
      if (seconds < 0) {
        clearInterval(timer);
        props.callback ? props.callback() : null;
      }
    }, 1000);
  }, []);
  return <>{`${hoursDisplay ? hoursDisplay + ":" : ""}${minutesDisplay}:${secondsDisplay}`}</>;
};

export default Timer;
