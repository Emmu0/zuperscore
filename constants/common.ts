export const calendarMonths = [
  { key: "Jan", fullName: "January" },
  { key: "Feb", fullName: "February" },
  { key: "Mar", fullName: "March" },
  { key: "Apr", fullName: "April" },
  { key: "May", fullName: "May" },
  { key: "Jun", fullName: "June" },
  { key: "Jul", fullName: "July" },
  { key: "Aug", fullName: "August" },
  { key: "Sep", fullName: "September" },
  { key: "Oct", fullName: "October" },
  { key: "Nov", fullName: "November" },
  { key: "Dec", fullName: "December" },
];

export const calendarDays = [
  { key: "Sun", fullName: "Sunday" },
  { key: "Mon", fullName: "Monday" },
  { key: "Tue", fullName: "Tuesday" },
  { key: "Wed", fullName: "Wednesday" },
  { key: "Thu", fullName: "Thursday" },
  { key: "Fri", fullName: "Friday" },
  { key: "Sat", fullName: "Saturday" },
];

export const bindZero = (value: any) => {
  if (value > 9) return value;
  else return `0${value}`;
};

export const formatIndianTimeZone = (date: any) => {
  let hours = date.getHours();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let strTime = bindZero(hours) + ":" + minutes + " " + ampm;

  return strTime;
};

export const datePreview = (currentDate: any) => {
  let newDate = new Date(currentDate);
  let date = bindZero(newDate.getDate());
  let month = bindZero(newDate.getMonth() + 1);
  let year = bindZero(newDate.getFullYear());
  return `${date}-${month}-${year}`;
};

export const dateTimePreview = (currentDate: any) => {
  let newDate = new Date(currentDate);
  let date = bindZero(newDate.getDate());
  let month = bindZero(newDate.getMonth() + 1);
  let year = bindZero(newDate.getFullYear());
  return `${date}-${month}-${year}, ${formatIndianTimeZone(newDate)}`;
};

export const secondsTimerConversion = (timeInSec: any) => {
  let timerString = ``;

  timeInSec = Math.ceil(Number(timeInSec));

  let hour = Math.floor(timeInSec / 3600);
  let minute = Math.floor((timeInSec % 3600) / 60);
  let second = Math.floor((timeInSec % 3600) % 60);

  let tHour = hour > 0 ? bindZero(hour) : "";
  let tMinutes = minute > 0 ? bindZero(minute) : "";
  let tSeconds = second > 0 ? bindZero(second) : "";

  timerString = `${tHour}${tHour ? ":" : ""}${tMinutes}${tMinutes ? ":" : ""}${tSeconds}`;

  timerString = timerString.length > 0 ? timerString : "00";

  timerString = `${timerString} ${
    hour > 0
      ? hour == 1
        ? "Hour"
        : "Hours"
      : minute > 0
      ? minute == 1
        ? "Minute"
        : "Minutes"
      : second > 0
      ? second == 1
        ? "Second"
        : "Seconds"
      : "Seconds"
  }`;

  return timerString;
};

export const returnTime = (currentDate: any) => {
  let newDate = new Date(currentDate);
  return `${formatIndianTimeZone(newDate)}`;
};

export const returnDateWithText = (currentDate: any) => {
  let newDate = new Date(currentDate);
  let date = bindZero(newDate.getDate());
  let month = calendarMonths[newDate.getMonth()].fullName;
  let day = calendarDays[newDate.getDay()].fullName;

  return `${day}, ${date} ${month}`;
};

export const secondsToHms = (d: any) => {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);

  let hDisplay = h >= 0 ? h + (h == 1 ? " hr, " : " hr, ") : "";
  let mDisplay = m >= 0 ? m + (m == 1 ? " min, " : " min, ") : "";
  let sDisplay = s >= 0 ? s + (s == 1 ? " sec" : " sec") : "";
  return hDisplay + mDisplay + sDisplay;
};

export const convertTimeToSeconds = (date: any) => {
  const startDateTime: any = new Date(date);
  const currentDate: any = new Date();
  const ZoomDate: any = new Date(
    `${
      currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()} ${startDateTime.getHours()}:${startDateTime.getMinutes()}:${startDateTime.getSeconds()}`
  );
  const difference = ZoomDate.getTime() - currentDate.getTime();
  const differenceInSeconds = difference / 1000;
  const absSeconds = Math.floor(differenceInSeconds);
  return absSeconds;
};

export const version = "0.0.1";
