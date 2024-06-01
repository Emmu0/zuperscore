import React from "react";
// material icons
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
// global imports
import { calendarMonths, calendarDays, bindZero } from "@constants/common";

const DefaultCalendarView = React.forwardRef(
  ({ headerVisibility = true, currentDate, callSelectedDate, onTitleChange }: any, ref: any) => {
    const [todayDate, setTodayDate] = React.useState(String);
    const [currentMonth, setCurrentMonth] = React.useState(Number);
    const [currentYear, setCurrentYear] = React.useState(Number);

    const [currentSelectDate, setCurrentSelectDate] = React.useState(String);
    const [renderDateTitle, setRenderDateTitle] = React.useState(String);

    React.useEffect(() => {
      if (currentDate === null) {
        updateTodayDate(new Date());
      } else {
        let newDate = currentDate && currentDate.split("-");
        updateTodayDate(new Date(`${newDate[2]}-${newDate[1]}-${newDate[0]}`));
      }
    }, [currentDate]);

    React.useImperativeHandle(ref, () => ({
      nextDate: () => updateNextDate(),
      previousDate: () => updatePreviousDate(),
      todayDate: () => todayDateUpdate(),
    }));

    const todayDateUpdate = () => {
      updateTodayDate(new Date());
    };

    const updateNextDate = () => {
      const year = currentMonth === 11 ? currentYear + 1 : currentYear;
      const month = (currentMonth + 1) % 12;
      setCurrentMonth(month);
      setCurrentYear(year);

      setRenderDateTitle(calendarMonths[month].fullName + " " + year);
    };

    const updatePreviousDate = () => {
      const year = currentMonth === 0 ? currentYear - 1 : currentYear;
      const month = currentMonth === 0 ? 11 : currentMonth - 1;
      setCurrentMonth(month);
      setCurrentYear(year);

      setRenderDateTitle(calendarMonths[month].fullName + " " + year);
    };

    const updateTodayDate = (todayDateValue: any) => {
      const todayDateVariable: any = new Date();

      setTodayDate(todayDateVariable);

      setCurrentMonth(todayDateValue.getMonth());
      setCurrentYear(todayDateValue.getFullYear());
      setCurrentSelectDate(todayDateValue);

      setRenderDateTitle(
        `${calendarMonths[todayDateValue.getMonth()].fullName} ${todayDateValue.getFullYear()}`
      );

      onTitleChange &&
        onTitleChange(
          `${calendarDays[todayDateValue.getDay()].fullName}, ${bindZero(
            todayDateValue.getDate()
          )} ${calendarMonths[todayDateValue.getMonth()].fullName} ${todayDateValue.getFullYear()}`
        );

      callSelectedDate &&
        callSelectedDate(
          `${bindZero(todayDateValue.getDate())}-${bindZero(
            todayDateValue.getMonth() + 1
          )}-${bindZero(todayDateValue.getFullYear())}`
        );
    };

    const daysInMonth = (iMonth: any, iYear: any) => {
      return 32 - new Date(iYear, iMonth, 32).getDate();
    };

    const renderCalendar = () => {
      let firstDay = new Date(currentYear, currentMonth).getDay();
      let date = 1;
      let rowData = [];

      let lastMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
      lastMonth = lastMonth - firstDay;

      for (let i = 0; i < 6; i++) {
        let colData = [];
        let colCounter = 0;
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay) {
            colCounter = colCounter + 1;
            colData.push(
              <div
                className="min-w-[45px] min-h-[45px] max-h-full w-full flex items-center justify-center text-theme-muted font-medium pt-2 pb-2 border-[0.5px] bg-dark-100 bg-opacity-10 text-dark-100 text-sm"
                key={`col-${i}-${j}-${date}-empty`}
              >
                {lastMonth + j + 1}
              </div>
            );
          } else if (date > daysInMonth(currentMonth, currentYear)) {
            break;
          } else {
            colCounter = colCounter + 1;
            if (
              date === new Date(todayDate).getDate() &&
              currentYear === new Date(todayDate).getFullYear() &&
              currentMonth === new Date(todayDate).getMonth()
            ) {
              colData.push(
                RenderCalendarColumn(currentYear, currentMonth, date, calendarDays[j].key, true)
              );
            } else {
              colData.push(
                RenderCalendarColumn(currentYear, currentMonth, date, calendarDays[j].key, false)
              );
            }
            date++;
          }
        }

        if (colCounter > 0 && colCounter <= 7) {
          let countData = 7 - colCounter;
          for (let k = 0; k < countData; k++) {
            colData.push(
              <div
                className="min-w-[45px] min-h-[45px] max-h-full w-full flex items-center justify-center font-medium text-theme-muted pt-2 pb-2 text-sm border-[0.5px] text-dark-100 bg-dark-100 bg-opacity-10"
                key={`col-extra-${k}-next-month`}
              >
                {k + 1}
              </div>
            );
          }
        }

        rowData.push(
          <div className="flex" key={`row-${i}`}>
            {colData}
          </div>
        );
      }
      return rowData;
    };

    const RenderCalendarColumn = (year: any, month: any, date: any, day: any, active: Boolean) => {
      const data = {
        year: year,
        month: month + 1,
        date: date,
        day: day,
      };

      const selectActive = () => {
        if (
          data.month === new Date(currentSelectDate).getMonth() + 1 &&
          data.year === new Date(currentSelectDate).getFullYear() &&
          data.date === new Date(currentSelectDate).getDate()
        )
          return true;
        return false;
      };

      const handleSelectedDate = () => {
        const newDate = new Date(data.year, data.month - 1, data.date);
        setCurrentSelectDate(newDate.toString());
        if (callSelectedDate)
          callSelectedDate(`${bindZero(data.date)}-${bindZero(data.month)}-${bindZero(data.year)}`);
      };

      return (
        <div
          key={`${data.date}-${data.month}-${data.year}-${data.day}`}
          className={`cursor-pointer min-w-[45px] min-h-[45px] h-full w-full flex items-center justify-center font-medium py-1 text-sm border-[0.5px]  ${
            active ? "text-green-0 font-medium" : ""
          }`}
          onClick={handleSelectedDate}
        >
          <div
            className={`h-[30px] w-[30px] rounded-full flex justify-center items-center font-medium ${
              active
                ? `text-white bg-violet-100`
                : selectActive()
                ? `border border-violet-100 text-violet-100`
                : `text-black`
            }`}
          >
            {data.date}
          </div>
        </div>
      );
    };

    return (
      <>
        <div className="overflow-hidden select-none">
          {/* navigation */}
          {headerVisibility && (
            <div className="flex justify-between items-center gap-3 font-semibold py-1">
              <div className="cursor-pointer flex-shrink-0 " onClick={updatePreviousDate}>
                <ChevronLeftIcon width="24px" />
              </div>
              <div
                className="cursor-pointer text-center"
                onClick={() => updateTodayDate(new Date())}
              >
                {renderDateTitle && renderDateTitle}
              </div>
              <div className="cursor-pointer flex-shrink-0 " onClick={updateNextDate}>
                <ChevronRightIcon width="24px" />
              </div>
            </div>
          )}

          {/* days */}
          <div className="flex items-center font-medium">
            {calendarDays &&
              calendarDays.length > 0 &&
              calendarDays.map((day, index) => (
                <div
                  className="w-full min-w-[45px] min-h-[45px] h-full flex justify-center items-center border-black text-sm "
                  key={`calender-days-default-${index}`}
                >
                  {day.key[0]}
                </div>
              ))}
          </div>

          {/* calendar */}
          <div className="relative">{todayDate && renderCalendar()}</div>
        </div>
      </>
    );
  }
);

DefaultCalendarView.displayName = "DefaultCalendarView";

export default DefaultCalendarView;
