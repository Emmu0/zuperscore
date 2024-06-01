import React from "react";
// components imports
import MonthView from "./MonthView";
import WeekView from "./WeekView";

export const calendarData = [
  { date: "2022-05-29", day: "SUN" },
  { date: "2022-05-30", day: "MON" },
  { date: "2022-05-31", day: "TUE" },
  { date: "2022-06-01", isCurrentMonth: true, day: "WED", date_text: "1 March" },
  { date: "2022-06-02", isCurrentMonth: true, day: "THU" },
  { date: "2022-06-03", isCurrentMonth: true, day: "FRI" },
  { date: "2022-06-04", isCurrentMonth: true, day: "SAT" },
  { date: "2022-06-05", isCurrentMonth: true, day: "SUN" },
  { date: "2022-06-06", isCurrentMonth: true, day: "MON" },
  { date: "2022-06-07", isCurrentMonth: true, day: "TUE" },
  { date: "2022-06-08", isCurrentMonth: true, day: "WED" },
  { date: "2022-06-09", isCurrentMonth: true, day: "THU" },
  { date: "2022-06-10", isCurrentMonth: true, day: "FRI" },
  { date: "2022-06-11", isCurrentMonth: true, day: "SAT" },
  { date: "2022-06-12", isCurrentMonth: true, day: "SUN" },
  { date: "2022-06-13", isCurrentMonth: true, day: "MON" },
  { date: "2022-06-14", isCurrentMonth: true, day: "TUE" },
  {
    date: "2022-06-15",
    isCurrentMonth: true,
    day: "WED",
    events: [
      { id: 3, name: "Session Name", datetime: "2022-06-22T15:00", href: "#" },
      { id: 5, name: "Session Name", datetime: "2022-06-22T19:00", href: "#" },
      { id: 6, name: "Session Name 23", datetime: "2022-06-22T19:00", href: "#" },
      { id: 7, name: "Session Name 23", datetime: "2022-06-22T19:00", href: "#" },
    ],
  },
  { date: "2022-06-16", isCurrentMonth: true, day: "THU" },
  { date: "2022-06-17", isCurrentMonth: true, day: "FRI" },
  { date: "2022-06-18", isCurrentMonth: true, day: "SAT" },
  { date: "2022-06-19", isCurrentMonth: true, day: "SUN" },
  { date: "2022-06-20", isCurrentMonth: true, day: "MON" },
  { date: "2022-06-21", isCurrentMonth: true, day: "TUE" },
  { date: "2022-06-22", isCurrentMonth: true, day: "WED" },
  {
    date: "2022-06-23",
    isCurrentMonth: true,
    day: "THU",
    events: [{ id: 4, name: "Session Name", datetime: "2022-06-22T15:00", href: "#" }],
  },
  { date: "2022-06-24", isCurrentMonth: true, day: "FRI" },
  { date: "2022-06-25", isCurrentMonth: true, day: "SAT" },
  { date: "2022-06-26", isCurrentMonth: true, day: "SUN" },
  { date: "2022-06-27", isCurrentMonth: true, day: "MON" },
  { date: "2022-06-28", isCurrentMonth: true, day: "TUE" },
  { date: "2022-06-29", isCurrentMonth: true, day: "WED" },
  { date: "2022-06-30", isCurrentMonth: true, day: "THU" },
  { date: "2022-02-01", date_text: "1 April", day: "FRI" },
  { date: "2022-02-02", date_text: "2 April", day: "SAT" },
];

const CalendarComponent = ({ view }: any) => {
  return (
    <div className="">
      {view === "month" && <MonthView calendarData={calendarData} />}
      {view === "week" && <WeekView startingFrom="2022-06-13" calendarData={calendarData} />}
    </div>
  );
};
export default CalendarComponent;
