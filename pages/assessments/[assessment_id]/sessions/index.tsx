import React from "react";
// next imports
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
// swr
import useSWR from "swr";
// ui icons
import { ArrowLeftIcon } from "@ui/icons";
// seo
import Container from "@components/Container";
// layout
import DefaultLayout from "@layouts/DefaultLayout";
// components
import AssessmentSessionView from "@components/admin/assessments/sessions/TableView";
import Pagination from "@components/utilities/Pagination";
import AssessmentResultDownload from "@components/admin/assessments/AssessmentResultDownload";
import AssessmentUserSearchFilter from "@components/admin/assessments/sessions/UserSearchFilter";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
//api routes
import {
  ASSESSMENT_WITH_ID_ENDPOINT,
  USER_ASSESSMENT_SESSION_WITH_USER_ID,
  ASSESSMENT_USERS_WITH_ASSESSMENT_ID,
} from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Assessment Result",
};

const UserAssessmentSessions: NextPage = () => {
  const router = useRouter();

  const { assessment_id, user_id } = router.query as {
    assessment_id: any;
    user_id: any;
  };

  const [profile, setProfile] = React.useState<any>(null);

  React.useEffect(() => {
    let adminToken: any = getAuthenticationToken();
    adminToken = adminToken ? JSON.parse(adminToken) : null;
    if (adminToken && adminToken?.user) setProfile(adminToken?.user);
  }, []);

  const { data: assessment, error: assessmentError } = useSWR(
    assessment_id
      ? [ASSESSMENT_WITH_ID_ENDPOINT(assessment_id), `assessment-${assessment_id}`]
      : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  const { data: assessmentUsers, error: assessmentUsersError } = useSWR(
    assessment_id
      ? [ASSESSMENT_USERS_WITH_ASSESSMENT_ID(assessment_id), `assessment-users-${assessment_id}`]
      : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  const perPage = 15;
  const [cursor, setCursor] = React.useState<any>(`${perPage}:0:0`);
  const [searchUser, setSearchUser] = React.useState<any>(user_id ? user_id : null);
  const handleSearchUser = (user: any) => {
    setSearchUser(user);
    setCursor(`${perPage}:0:0`);
  };

  const { data: assessmentSectionsResult, error: assessmentSectionsResultError } = useSWR(
    profile && assessment_id && (searchUser || searchUser == null)
      ? [
          `${USER_ASSESSMENT_SESSION_WITH_USER_ID(
            searchUser != null ? searchUser : null,
            assessment_id
          )}&per_page=${perPage}&cursor=${cursor}`,
          `ASSESSMENT-RESULTS-${profile?.id}-${assessment_id}-${searchUser}`,
        ]
      : null,
    (url: any) => APIFetcher(url),
    { refreshInterval: 0, revalidateOnFocus: false }
  );

  // filtering the results per user
  const [userSessions, setUserSessions] = React.useState<any>(null);
  const [userFilter, setUserFilter] = React.useState<any>(null);
  React.useEffect(() => {
    if (
      assessmentSectionsResult &&
      assessmentSectionsResult?.results &&
      assessmentSectionsResult?.results.length > 0
    ) {
      let uniqueUsers: any = [];
      assessmentSectionsResult?.results.map((sessionData: any) => {
        let currentUserIndex = uniqueUsers.findIndex(
          (_item: any) => _item?.user_id && _item?.user_id == sessionData?.user
        );

        if (currentUserIndex < 0) {
          let payload = { user_id: sessionData?.user, user: null, sessions: [sessionData] };
          uniqueUsers.push(payload);
        } else
          uniqueUsers[currentUserIndex].sessions = [
            ...uniqueUsers[currentUserIndex].sessions,
            sessionData,
          ];
      });
      if (uniqueUsers && uniqueUsers.length > 0) setUserFilter((prevData: any) => uniqueUsers);
    }
  }, [assessmentSectionsResult]);

  React.useEffect(() => {
    if (
      assessmentUsers &&
      assessmentUsers.length > 0 &&
      userFilter != null &&
      userFilter.length > 0
    ) {
      let currentUserFilter = [...userFilter];
      assessmentUsers.map((_sessionUser: any) => {
        let userSessionIndex = currentUserFilter.findIndex(
          (_item: any) => _item.user_id == _sessionUser?.id
        );
        if (userSessionIndex >= 0)
          currentUserFilter[userSessionIndex] = {
            ...currentUserFilter[userSessionIndex],
            user: _sessionUser,
          };
      });
      if (currentUserFilter && currentUserFilter.length > 0)
        setUserSessions((prevData: any) => currentUserFilter);
    }
  }, [userFilter, assessmentUsers]);

  return (
    <>
      <Container meta={seoMetaInformation}>
        <DefaultLayout>
          <div className="mx-auto container my-8 space-y-5 px-5">
          <Link href={`/assessments?kind=${assessment?.kind}`}>
              <a className="text-sm inline-flex items-center space-x-3">
                <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
                <p className="text-dark-100">Back to Assessments</p>
              </a>
            </Link>

            <div className="flex justify-between items-center">
              <div className="text-xl font-medium">Assessment Sessions</div>
              <div>
                <AssessmentUserSearchFilter
                  assessment_id={assessment_id}
                  assessmentUsers={assessmentUsers}
                  searchUser={searchUser}
                  handleSearchUser={handleSearchUser}
                />
              </div>
            </div>
            {assessment &&
            !assessmentError &&
            assessmentSectionsResult &&
            !assessmentSectionsResultError &&
            assessmentUsers &&
            !assessmentUsersError ? (
              <>
                {assessment &&
                assessmentSectionsResult &&
                assessmentSectionsResult?.results &&
                assessmentSectionsResult?.results.length > 0 ? (
                  <>
                    <Pagination
                      count={perPage}
                      totalPages={assessmentSectionsResult?.total_pages}
                      currentPage={parseInt(cursor?.split(":")[1]) + 1}
                      onPageChange={(value: any) => {
                        setUserSessions(null);
                        setUserFilter(null);
                        setCursor(value);
                      }}
                    />

                    <div>
                      <AssessmentResultDownload assessment={assessment} sessions={userSessions} />
                    </div>

                    <div className=" space-y-4">
                      {userSessions &&
                        userSessions.length > 0 &&
                        userSessions.map((_session: any, index: any) => (
                          <div key={index}>
                            <div className="px-5 py-3 flex items-center gap-2 border border-b-0 border-gray-200">
                              <div className="border border-violet-100 bg-violet-100 rounded-sm px-2 py-0 text-xs text-white">
                                {_session?.user?.role}
                              </div>
                              <div className="border border-violet-100 bg-violet-100 rounded-sm px-2 py-0 text-xs text-white">
                                {_session?.user?.id}
                              </div>
                              <div className="text-violet-100">
                                {`${_session?.user?.first_name} ${_session?.user?.last_name}`}(
                                {_session?.user?.email})
                              </div>
                            </div>
                            <div className="overflow-x-auto">
                              <AssessmentSessionView
                                sessions={_session?.sessions}
                                cursor={cursor}
                                user_id={_session?.user?.id}
                                auth_user={profile}
                                mutate_url={[
                                  `${USER_ASSESSMENT_SESSION_WITH_USER_ID(
                                    searchUser != null ? searchUser : null,
                                    assessment_id
                                  )}&per_page=${perPage}&cursor=${cursor}`,
                                  `ASSESSMENT-RESULTS-${profile?.id}-${assessment_id}-${searchUser}`,
                                ]}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center text-sm text-muted py-5">
                    No Sessions are available.
                  </div>
                )}
              </>
            ) : (
              <div className="text-center w-full text-muted text-sm py-5">loading...</div>
            )}
          </div>
        </DefaultLayout>
      </Container>
    </>
  );
};

export default authWrapper(UserAssessmentSessions, {
  authRequired: true,
  role: ["admin", "tutor", "manager"],
});
