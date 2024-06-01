import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
// components
import Button from "@components/buttons";
import TimeRunner from "@components/TimeRunner";
// common
import { dateTimePreview, convertTimeToSeconds } from "@constants/common";
// context
import { globalContext } from "@contexts/GlobalContextProvider";

interface ISessionCard {
  assessment: any;
  type: any;
}

const SessionCard: React.FC<ISessionCard> = ({ assessment, type }) => {
  const router = useRouter();

  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const startAssessment = (session: any) => {
    let date = new Date();
    let scheduledTime = new Date(session?.scheduled_at);

    let minusTime = date;
    minusTime = new Date(minusTime.getTime() - 5 * 60000);

    let plusTime = date;
    plusTime = new Date(plusTime.getTime() + 5 * 60000);

    if (scheduledTime >= minusTime && scheduledTime <= plusTime) {
      router.push(`/assessment/${session?.assessment_detail?.id}/${session?.id}`);
    } else {
      handleAlert(
        "error",
        "Access Restricted",
        "Testing window is closed. Please contact the manager in your whatsapp group."
      );
    }
  };

  return (
    <div>
      <div className="mb-3 text-violet-100">{assessment?.title}</div>

      {assessment?.sessions.map((_session: any, _sessionIndex: any) => (
        <div key={_sessionIndex} className="border border-gray-200">
          <div className="p-3 relative flex items-center gap-3">
            <div className="w-full">
              <div className="flex items-center gap-3">
                <div>{_session?.assessment_detail?.name}</div>
                {["taken"].includes(type) && (
                  <div className="text-xs border border-violet-100 text-violet-100 px-1 py-0.5 rounded-sm inline-block">
                    {_session?.scheduled_at ? "SCHEDULED" : "UNSCHEDULED"}
                  </div>
                )}
              </div>

              <div className="text-sm text-dark-100 line-clamp-2">
                {_session?.assessment_detail?.description}
              </div>
            </div>

            {["upcoming"].includes(type) && (
              <div className="flex-shrink-0">
                {_session?.scheduled_at && convertTimeToSeconds(_session?.scheduled_at) && (
                  <TimeRunner
                    date={_session?.scheduled_at}
                    time={convertTimeToSeconds(_session?.scheduled_at)}
                  >
                    <Button size="sm" onClick={() => startAssessment(_session)}>
                      Take Test
                    </Button>
                  </TimeRunner>
                )}
              </div>
            )}

            {["unscheduled"].includes(type) && (
              <div className="flex-shrink-0">
                <Link href={`/assessment/${_session?.assessment_detail?.id}/${_session?.id}`}>
                  <a>
                    <Button size="sm">Take Test</Button>
                  </a>
                </Link>
              </div>
            )}

            {["taken"].includes(type) && (
              <>
                {_session?.state === "IN_PROGRESS" || _session?.state === "STARTED" ? (
                  <>
                    {_session?.is_resume_enabled === true ? (
                      <div className="flex-shrink-0">
                        <Link
                          href={`/assessment/${_session?.assessment_detail?.id}/${_session?.id}`}
                        >
                          <a>
                            <Button size="sm">Resume Test</Button>
                          </a>
                        </Link>
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-1/3">
                        <div className="text-sm text-blue-600 font-medium">
                          If your test is stuck, Resume Test feature is available only to the admin.
                          Kindly make a request on your WhatsApp group
                        </div>
                      </div>
                    )}
                  </>
                ) : null}
                {(_session?.state === "COMPLETED" || _session?.state === "ANALYSED") && (
                  <div className="flex-shrink-0">
                    <Link
                      href={`/user/assessment/${_session?.assessment_detail?.id}/sessions/${_session?.id}?prevUrl=${router.asPath}`}
                    >
                      <a>
                        <Button variant="secondary" size="sm">
                          View Result
                        </Button>
                      </a>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="border-t border-gray-200 p-3 flex items-center divide-x-2">
            {["upcoming"].includes(type) && (
              <>
                <div className="px-3 pl-0">
                  <div className="text-sm text-gray-500 pb-1">Scheduled At</div>
                  <div className="text-sm text-violet-100">
                    {_session?.scheduled_at ? dateTimePreview(_session?.scheduled_at) : "-"}
                  </div>
                </div>
                <div className="px-3">
                  <div className="text-sm text-gray-500 pb-1">Status</div>
                  <div className="text-xs border border-violet-100 px-1 py-0.5 rounded-sm font-medium inline-block">
                    {_session.state}
                  </div>
                </div>
              </>
            )}

            {["unscheduled"].includes(type) && (
              <>
                <div className="px-3 pl-0">
                  <div className="text-sm text-gray-500 pb-1">Alloted At</div>
                  <div className="text-sm text-violet-100">
                    {_session?.created_at ? dateTimePreview(_session?.created_at) : "-"}
                  </div>
                </div>
                <div className="px-3">
                  <div className="text-sm text-gray-500 pb-1">Status</div>
                  <div className="text-xs border border-violet-100 px-1 py-0.5 rounded-sm font-medium inline-block">
                    {_session.state}
                  </div>
                </div>
              </>
            )}

            {["taken"].includes(type) && (
              <>
                {_session?.scheduled_at ? (
                  <div className="px-3 pl-0">
                    <div className="text-sm text-gray-500 pb-1">Scheduled At</div>
                    <div className="text-sm text-violet-100">
                      {_session?.scheduled_at ? dateTimePreview(_session?.scheduled_at) : "-"}
                    </div>
                  </div>
                ) : (
                  <div className="px-3 pl-0">
                    <div className="text-sm text-gray-500 pb-1">Alloted At</div>
                    <div className="text-sm text-violet-100">
                      {_session?.created_at ? dateTimePreview(_session?.created_at) : "-"}
                    </div>
                  </div>
                )}
                <div className="px-3">
                  <div className="text-sm text-gray-500 pb-1">Status</div>
                  <div className="text-xs border border-violet-100 px-1 py-0.5 rounded-sm font-medium inline-block">
                    {_session.state}
                  </div>
                </div>
                <div className="px-3">
                  <div className="text-sm text-gray-500 pb-1">Started At</div>
                  <div className="text-sm">
                    {_session?.started_at ? dateTimePreview(_session?.started_at) : "-"}
                  </div>
                </div>
                <div className="px-3 pr-0">
                  <div className="text-sm text-gray-500 pb-1">Completed At</div>
                  <div className="text-sm">
                    {_session?.submitted_at ? dateTimePreview(_session?.submitted_at) : "-"}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionCard;
