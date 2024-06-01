import { useReducer, useEffect } from "react";
// global imports
import { secondsToHms, returnDateWithText, returnTime } from "@constants/common";

const TimeRunner = (props: any) => {
  let timerVariable: any;
  let timerGracePeriod = 5;
  let closeTimer: any = timerGracePeriod * 60;

  const validateTodayDate = () => {
    const today: any = new Date();
    const currentDate: any = new Date(props.date);
    if (
      today.getDate() === currentDate.getDate() &&
      today.getMonth() === currentDate.getMonth() &&
      today.getYear() === currentDate.getYear()
    ) {
      return true;
    }
    return false;
  };

  const [timer, setTimer] = useReducer((timerOption: any, { type, value }: any) => {
    switch (type) {
      case "add":
        return value;
      case "update":
        let updateTimer: any = parseInt(timerOption);
        updateTimer = updateTimer - 1;
        return updateTimer;
      case "initialAdd":
        return value;
      default:
        return timerOption;
    }
  }, null);

  function startTimer() {
    timerVariable = setInterval(countDown, 1000);
  }

  const countDown = () => {
    setTimer({ type: "update", value: 0 });
    if (timer + 1 == closeTimer) {
      clearInterval(timerVariable);
    }
  };

  useEffect(() => {
    if (props.time > closeTimer) {
      setTimer({ type: "initialAdd", value: props.time - closeTimer });
      startTimer();
    }
    return () => clearInterval(timerVariable);
  }, [props.time]);

  return (
    <>
      {validateTodayDate() ? (
        <>
          {timer && timer >= 0 ? (
            <div className="text-sm">
              Test will be available on{" "}
              <span className="text-violet-100 font-medium">{secondsToHms(timer)}</span>
            </div>
          ) : (
            <div>{props.children}</div>
          )}
        </>
      ) : (
        <div className="text-sm">
          Test will be available on{" "}
          <span className="text-violet-100 font-medium">
            {returnDateWithText(props.date)}, {returnTime(props.date)}
          </span>
        </div>
      )}
    </>
  );
};

export default TimeRunner;
