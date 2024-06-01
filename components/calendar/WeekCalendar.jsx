import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

import Week from "./Week";
const WeekCalendar = () => {
  
  const [dateDisplay, setDateDisplay] = useState();
  const [nav, setNav] = useState(0);
  const [weekArray, setWeekArray] = useState([]);
  const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  useEffect(() => {
    const dt = new Date();
    if (nav !== 0) {
      dt.setDate(dt.getDate() + 7 * nav);
    } else {
      dt.setDate(dt.getDate());
    }
    const day = dt.getDate();
    const year = dt.getFullYear();
    setDateDisplay(`${dt.toLocaleDateString("en-us", { month: "long" })} ${year}`);

    let week = [];
    for (let i = 1; i <= 7; i++) {
      let firstDayOfWeek = dt.getDate() - dt.getDay() + i;
      let Wday = new Date(dt.setDate(firstDayOfWeek));
      let dayString = Wday.toISOString().slice(0, 10);
      week.push({
        value: Wday.getDate(),
        day: weekday[Wday.getDay()],
        events: [{ id: 4, name: "Session Name", datetime: "2022-06-22T15:00", href: "#" }],
        isCurrentDay: day === Wday.getDate() && nav === 0,
        date: dayString,
      });
    }

    setWeekArray(week);
  }, [weekArray]);
  return (
    <>
      <div className=" mb-7 py-1 w-full">
        <div className="flex justify-between mt-4">
          <button onClick={() => setNav(nav - 1)}>
            <ChevronLeftIcon className="w-6 mx-1 h-6" />
          </button>
          <p className="text-2xl font-bold hover:cursor-pointer" onClick={() => setNav(0)}>
            {dateDisplay}
          </p>
          <button onClick={() => setNav(nav + 1)}>
            <ChevronRightIcon className="w-6 mx-1 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-7 w-full grid-flow-row flex items-center">
          {weekArray.map((data, key) => (
            <Week key={key} data={data} />
            // <div key={key}>{data.value}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WeekCalendar;
