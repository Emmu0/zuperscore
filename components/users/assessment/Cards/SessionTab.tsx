import React from "react";

interface ISessionTab {
  currentTab: any;
  handleCurrentTab: any;
}

const SessionTab: React.FC<ISessionTab> = ({ currentTab, handleCurrentTab }) => {
  const sessionTabs = [
    {
      key: "upcoming",
      title: "Scheduled",
    },
    {
      key: "unscheduled",
      title: "Unscheduled",
    },
    {
      key: "taken",
      title: "Completed",
    },
  ];

  return (
    <div className="inline-flex gap-1">
      {sessionTabs &&
        sessionTabs.length > 0 &&
        sessionTabs.map((_session: any) => (
          <div
            key={_session?.key}
            className={`border border-violet-100 px-3 py-1 rounded-sm cursor-pointer ${
              currentTab === _session?.key ? `bg-violet-100 text-white` : `text-violet-100`
            }`}
            onClick={() => handleCurrentTab(_session?.key)}
          >
            {_session?.title}
          </div>
        ))}
    </div>
  );
};

export default SessionTab;
