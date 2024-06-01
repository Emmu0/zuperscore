import React, { useState, useEffect } from "react";
// ui icons imports
import SessionDetails from "./SessionDetails";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

export const calendarData = [
  { date: "2022-05-29", day: "SUN" },
  { date: "2022-05-30", day: "MON" },
  { date: "2022-05-31", day: "TUE" },
  { date: "2022-06-01", isCurrentMonth: true, day: "WED", date_text: "1 March" },
  { date: "2022-06-02", isCurrentMonth: true, day: "THU" },
  { date: "2022-06-03", isCurrentMonth: true, day: "FRI" },
  { date: "2022-06-04", isCurrentMonth: true, day: "SAT" },
  { date: "2022-06-05", isCurrentMonth: true },
  { date: "2022-06-06", isCurrentMonth: true },
  { date: "2022-06-07", isCurrentMonth: true },
  { date: "2022-06-08", isCurrentMonth: true },
  { date: "2022-06-09", isCurrentMonth: true },
  { date: "2022-06-10", isCurrentMonth: true },
  { date: "2022-06-11", isCurrentMonth: true },
  { date: "2022-06-12", isCurrentMonth: true },
  { date: "2022-06-13", isCurrentMonth: true },
  { date: "2022-06-14", isCurrentMonth: true },
  {
    date: "2022-8-26",
    isCurrentMonth: true,
    events: [
      { id: 3, name: "Session Name", datetime: "2022-06-22T15:00", href: "#" },
      { id: 5, name: "Session Name", datetime: "2022-06-22T19:00", href: "#" },
      { id: 6, name: "Session Name 23", datetime: "2022-06-22T19:00", href: "#" },
      { id: 7, name: "Session Name 23", datetime: "2022-06-22T19:00", href: "#" },
      { id: 14, name: "Session Name 25", datetime: "2022-06-22T19:00", href: "#" },
    ],
  },
  { date: "2022-06-16", isCurrentMonth: true },
  { date: "2022-06-17", isCurrentMonth: true },
  { date: "2022-06-18", isCurrentMonth: true },
  { date: "2022-06-19", isCurrentMonth: true },
  { date: "2022-06-20", isCurrentMonth: true },
  { date: "2022-06-21", isCurrentMonth: true },
  { date: "2022-06-22", isCurrentMonth: true },
  {
    date: "2022-06-23",
    isCurrentMonth: true,
    events: [{ id: 4, name: "Session Name", datetime: "2022-06-22T15:00", href: "#" }],
  },
  { date: "2022-06-24", isCurrentMonth: true },
  { date: "2022-06-25", isCurrentMonth: true },
  { date: "2022-06-26", isCurrentMonth: true },
  { date: "2022-06-27", isCurrentMonth: true },
  { date: "2022-06-28", isCurrentMonth: true },
  { date: "2022-06-29", isCurrentMonth: true },
  { date: "2022-06-30", isCurrentMonth: true },
  { date: "2022-02-01", date_text: "1 April" },
  { date: "2022-02-02" },
];

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const CalendarComponent = () => {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState([]);
  const [days, setDays] = useState([]);
  const [dateDisplay, setDateDisplay] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [currentDay, setCurrentDay] = useState();

  const payload = [
    { events: [{ name: "Session Name" }], start_date: "2022-8-11" },
    { events: [{ name: "Session Name" }], start_date: "2022-8-27" },
    { events: [{ name: "Session Name" }], start_date: "2022-8-31" },
    { events: [{ name: "Session Name" }], start_date: "2022-8-30" },
  ];

  const eventForDate = (date) => payload.find((e) => e.start_date === date);

  useEffect(() => {
    const dt = new Date();

    if (nav !== 0) {
      dt.setMonth(dt.getMonth() + nav);
    } else {
      dt.setMonth(dt.getMonth());
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    setCurrentDay(`${month}/${day}/${year}`);

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    setDateDisplay(`${dt.toLocaleDateString("en-us", { month: "long" })} ${year}`);
    let daysArr = [];
    for (let i = 1; i <= daysInMonth + paddingDays; i++) {
      const dayString = `${year}-${month + 1}-${i - paddingDays}`;

      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          events: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date_text: `${1} ${firstDayOfMonth.toLocaleDateString("en-us", { month: "long" })}`,
          date: dayString,
        });
      } else {
        daysArr.push({
          value: "padding",
          events: null,
          isCurrentDay: false,
          date: "",
        });
      }
    }
    setDays(daysArr);
  }, [nav]);

  return (
    <div className="mb-7 py-1 relative">
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
      <div className="grid grid-cols-7 w-full mt-3 grid-flow-row text-center flex items-center">
        <span className="border-collapse p-1 text-center border border-dark text-gray-400">
          SUN
        </span>
        <span className="border-collapse p-1 text-center border border-dark text-gray-400 ">
          MON
        </span>
        <span className="border-collapse p-1 text-center border border-dark text-gray-400 ">
          TUE
        </span>
        <span className="border-collapse p-1 text-center border border-dark text-gray-400 ">
          WED
        </span>
        <span className="border-collapse p-1 text-center border border-dark text-gray-400 ">
          THU
        </span>
        <span className="border-collapse p-1 text-center border border-dark text-gray-400 ">
          FRI
        </span>
        <span className="border-collapse p-1 text-center border border-dark text-gray-400 ">
          SAT
        </span>
      </div>
      <div className="grid grid-cols-7 w-full grid-flow-row flex items-center relative">
        {days.map((d, index) => (
          <div
            key={index}
            value={d.date}
            disabled={d.value === "padding" ? true : false}
            className={`h-40 border-collapse border  border-border-light text-left bg-white p-3  ${
              d.isCurrentDay
                ? "border bg-lightpurple text-[#CC96AE] border-violet-0 bg-[#F4ECF1] border-violet-0"
                : null
            } `}
            onClick={() => {
              if (d.value !== "padding") {
                setClicked(d);
              }
              setSelectedDate(d.date);
            }}
          >
            <p className={`${d.value === 1 ? "text-violet-100 font-bold" : null}`}>
              {d.value === "padding" ? null : d.value === 1 ? d.date_text : d.value}
            </p>
            {d.events?.events?.map((details, key) => (
              <SessionDetails key={key} details={details} />
              // <div key={key}>{details.title}</div>
            ))}
            <div>{d.events?.title}</div>
            <div className={`${d.events?.length > 2 ? "mb-2" : "hidden"}`}>
              <p className="text-violet-0 px-3 font-semibold hover:underline hover:cursor-pointer ">
                +{d.events?.length - 2} more
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CalendarComponent;
