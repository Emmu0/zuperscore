import React from "react";
import SessionCardDialog from "./SessionCardDialog";

const MonthView = ({ calendarData }: any) => {
  const [showEvent, setShowEvent] = React.useState({ is_show: false, id: null });
  return (
    <div>
      <div className="grid w-full  grid-cols-7 border border-border-light ">
        {calendarData?.map((day: any, index: any) => (
          <div
            key={day.date}
            className={`${
              day.isCurrentMonth ? "text-violet-100" : "text-dark-0"
            } h-40 border-collapse border border-border-light border-t-0 bg-white p-3 relative`}
          >
            <p className="text-dark-0 mb-2">{index < 7 && day?.day}</p>
            <p
              className={` ${
                day.date.split("-").pop()?.replace(/^0/, "") === "1"
                  ? "text-violet-100 font-semibold"
                  : "text-dark-0"
              }`}
            >
              {day.date.split("-").pop()?.replace(/^0/, "") === "1"
                ? day.date_text
                : day.date.split("-").pop()?.replace(/^0/, "")}
            </p>
            <ul className="  text-[#222222] ">
              {day.events?.slice(0, 2).map((event: any) => (
                <div className="" key={event.id}>
                  <li className="mt-1 p-1 hover:bg-border-light">
                    <a
                      href={event.href}
                      onClick={() => setShowEvent({ is_show: true, id: event.id })}
                    >
                      {event.name}
                    </a>
                  </li>

                  <div
                    className={`${
                      showEvent?.is_show && showEvent?.id === event.id
                        ? "absolute left-[-300px] bottom-0 bg-yellow-0 p-2 z-100 font-semibold text-black rounded-[4px] shadow-lg w-[300px]"
                        : "hidden"
                    }`}
                  >
                    <SessionCardDialog event={event} />
                  </div>
                </div>
              ))}
              <div className={`${day?.events?.length > 2 ? "mb-2" : "hidden"}`}>
                <p className="text-violet-100 font-semibold">+{day?.events?.length - 2} more</p>
              </div>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
