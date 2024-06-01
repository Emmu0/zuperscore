import React, { useState } from "react";
// next imports
import { NextPage } from "next";
import Link from "next/link";
// swr
import useSWR from "swr";
// layouts
import UserDefaultLayout from "@layouts/UserDefaultLayout";
// components
import Button from "@components/buttons";
import TimeRunner from "@components/TimeRunner";
import DownloadDesktopApp from "@components/DownloadDesktopApp";
import Joe from "@components/user/joe";
// common
import { dateTimePreview, convertTimeToSeconds } from "@constants/common";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api routes
import { USER_DASHBOARD_ASSESSMENT_ENDPOINT } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import authWrapper from "lib/hoc/authWrapper";
import ConfigPopup from "@components/zoom@Config/ConfigPopup";
import AdminUserView from "@components/admin/users/View";
import UserSchedule from "@components/user/UserSchedule";

const Dashboard: NextPage = () => {
  const [zoomPopup, setZoomPopup] = useState(false)
  const [userDetails, setUserDetails] = React.useState<any>();
  React.useEffect(() => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    setUserDetails(userToken);
  }, []);
  const { data: assessments, error: assessmentsError } = useSWR(
    [USER_DASHBOARD_ASSESSMENT_ENDPOINT, `user-assessment-dashboard-endpoint`],
    APIFetcher
  );
  const [showDownload, setShowDownload] = React.useState<any>(false);

  const popupHandler =(vl: any)=>{
    setZoomPopup(vl)
  }

  return (
    <UserDefaultLayout>
      <div className="flex justify-between">
        <div className="text-xl font-medium pb-4">
          Hello, {userDetails?.user?.first_name} {userDetails?.user?.last_name}!
        </div>
        
        <div className="flex  p-3 px-4">
        <Button size="sm" onClick={() => setShowDownload(!showDownload)}>
            {"Download Desktop App"}
          </Button>
         
        </div>
      </div>
        <Button size="sm"  onClick={() => popupHandler(true)}>
            {"Schedule a Class"}
        </Button>
        <div className="mt-5">
          <UserSchedule/>
          </div>
      {showDownload && <DownloadDesktopApp />}
      <div className="container mx-auto mt-4">
        <div className="border border-gray-200 shadow">
          <div className="px-4 py-2 border-b border-gray-200 relative flex items-center justify-between">
            <div className="font-medium text-gray-500">Today Tests</div>
            <div className="text-sm font-medium cursor-pointer hover:text-violet-100">
              View More
            </div>
          </div>
          {zoomPopup && <ConfigPopup zoomPopup={zoomPopup} popupHandler={popupHandler}/>}
          <div>
            {assessments && !assessmentsError ? (
              <div>
                {assessments && assessments?.sessions && assessments?.sessions.length > 0 ? (
                  <div className="px-4 py-3 space-y-3">
                    {assessments?.sessions.map((_assessment: any, index: any) => (
                      <div key={index} className="border border-gray-200">
                        <div className="p-3 relative flex items-center gap-3">
                          <div className="w-full">
                            <div>{_assessment?.assessment_detail?.name}</div>
                            <div className="text-sm text-dark-100 line-clamp-2">
                              {_assessment?.assessment_detail.description}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            {_assessment?.scheduled_at && (
                              <TimeRunner
                                date={_assessment?.scheduled_at}
                                time={convertTimeToSeconds(_assessment?.scheduled_at)}
                              >
                                <Link
                                  href={`/assessment/${_assessment?.assessment_detail?.id}/${_assessment?.id}`}
                                >
                                  <a>
                                    <Button size="sm">Take Test</Button>
                                  </a>
                                </Link>
                              </TimeRunner>
                            )}
                          </div>
                        </div>
                        <div className="border-t border-gray-200 p-3 flex items-center divide-x-2">
                          <div className="px-3 pl-0">
                            <div className="text-sm text-gray-500 pb-1">Scheduled At</div>
                            <div className="text-sm">
                              {_assessment?.scheduled_at
                                ? dateTimePreview(_assessment?.scheduled_at)
                                : "-"}
                            </div>
                          </div>
                          <div className="px-3">
                            <div className="text-sm text-gray-500 pb-1">Status</div>
                            <div className="text-xs border border-violet-100 px-1 py-0.5 rounded-sm font-medium inline-block">
                              {_assessment.state}
                            </div>
                          </div>
                          <div className="px-3">
                            <div className="text-sm text-gray-500 pb-1">Started At</div>
                            <div className="text-sm">
                              {_assessment?.started_at
                                ? dateTimePreview(_assessment?.started_at)
                                : "-"}
                            </div>
                          </div>
                          <div className="px-3 pr-0">
                            <div className="text-sm text-gray-500 pb-1">Completed At</div>
                            <div className="text-sm">
                              {_assessment?.submitted_at
                                ? dateTimePreview(_assessment?.submitted_at)
                                : "-"}
                            </div>
                          </div>
                          {/* <div className="!border-0 ml-auto flex-shrink-0 pl-2">
                            <Button variant="secondary" size="sm">
                              View Result
                            </Button>
                              </div> **/}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400 py-10">
                    No Upcoming Assessments are available.
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400 py-10">
                Loading...
              </div>
            )}
          </div>
         

        </div>
        {/* <Joe /> */}
      </div>
    </UserDefaultLayout>
  );
};

export default authWrapper(Dashboard, { authRequired: true, role: "user" });
