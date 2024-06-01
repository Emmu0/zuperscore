const ViewToggle = ({ calendarView, setCalendarView }: any) => {
  return (
    <div className="flex  bg-light-100">
      <div
        onClick={() => setCalendarView("month")}
        className={`${
          calendarView === "month"
            ? "bg-violet-0/20 text-violet-100 border border-border-light"
            : "text-dark-0 bg-light-0 border border-border-light"
        } cursor-pointer  px-4 py-1.5`}
      >
        Month
      </div>
      <div
        onClick={() => setCalendarView("week")}
        className={`${
          calendarView === "week"
            ? "bg-violet-0/20 text-violet-100 border border-border-light"
            : " text-dark-0 bg-light-0 border border-border-light"
        } cursor-pointer  px-4 py-1.5`}
      >
        Week
      </div>
    </div>
  );
};

export default ViewToggle;
