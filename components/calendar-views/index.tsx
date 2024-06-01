export type calendarRef = {
  nextDate: () => void;
  previousDate: () => void;
  todayDate: () => void;
};

export { default as DefaultCalendar } from "./DefaultView";
