import React from "react";
// next imports
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
// swr
import useSWR from "swr";
// icons
import { ArrowLeftIcon } from "@ui/icons";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// components
import Pagination from "@components/utilities/Pagination";
import AssessmentEnrollmentSessionTableView from "@components/admin/users/assessment-enrollment/SessionTableView";
import AssessmentEnrollmentCreateSession from "@components/admin/users/assessment-enrollment/CreateSession";
import AssessmentEnrollmentSearchAssessment from "@components/admin/users/assessment-enrollment/SearchAssessmentSessionFilter";
// api routes
import {
  USER_WITH_ID_ENDPOINT,
  ASSESSMENT_WITH_SESSIONS_WITH_USER_ID,
  ASSESSMENT_ENDPOINT,
} from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Assessment Enrollment | Users",
};

const AdminUserAssessmentEnroll: NextPage = () => {
  const router = useRouter();
  const { user_id, assessment } = router.query as { user_id: string; assessment: string };

  const { data: userDetail, error: userDetailError } = useSWR(
    user_id ? [USER_WITH_ID_ENDPOINT(user_id), `user-${user_id}`] : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  const { data: assessments, error: assessmentsError } = useSWR(
    user_id ? ASSESSMENT_ENDPOINT : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  const perPage = 10;
  const [cursor, setCursor] = React.useState<any>(`${perPage}:0:0`);
  const [searchAssessment, setSearchAssessment] = React.useState<any>(
    assessment ? assessment : null
  );
  const handleSearchAssessment = (user: any) => {
    setSearchAssessment(user);
    setCursor(`${perPage}:0:0`);
  };

  const [userAssessmentSessions, setUserAssessmentSessions] = React.useState<any>(null);

  const {
    data: userAssessmentDetail,
    error: userAssessmentDetailError,
    mutate: userAssessmentDetailMutation,
  } = useSWR(
    user_id && cursor
      ? [
          `${ASSESSMENT_WITH_SESSIONS_WITH_USER_ID(user_id)}?per_page=${perPage}&cursor=${cursor}${
            searchAssessment ? `&assessment_id=${searchAssessment}` : ``
          }`,
          `assessment-${user_id}-${searchAssessment}-${cursor}`,
        ]
      : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  React.useEffect(() => {
    if (
      userAssessmentDetail &&
      userAssessmentDetail.results &&
      userAssessmentDetail.results.length > 0
    ) {
      let assessmentWithSessionPayload: any = [];
      userAssessmentDetail.results.map((_session: any) => {
        if (assessmentWithSessionPayload && assessmentWithSessionPayload.length > 0) {
          let currentAssessmentIndex = assessmentWithSessionPayload.findIndex(
            (_assessmentSession: any) => _assessmentSession.assessment_id === _session?.assessment
          );
          if (currentAssessmentIndex >= 0) {
            assessmentWithSessionPayload[currentAssessmentIndex] = {
              ...assessmentWithSessionPayload[currentAssessmentIndex],
              sessions: [
                ...assessmentWithSessionPayload[currentAssessmentIndex].sessions,
                _session,
              ],
            };
          } else {
            let payload = {
              assessment_id: _session?.assessment,
              assessment_data: _session?.assessment_detail,
              sessions: [_session],
            };
            assessmentWithSessionPayload.push(payload);
          }
        } else {
          let payload = {
            assessment_id: _session?.assessment,
            assessment_data: _session?.assessment_detail,
            sessions: [_session],
          };
          assessmentWithSessionPayload.push(payload);
        }
      });

      if (assessmentWithSessionPayload && assessmentWithSessionPayload.length > 0) {
        setUserAssessmentSessions(assessmentWithSessionPayload);
      }
    } else {
      setUserAssessmentSessions(null);
    }
  }, [userAssessmentDetail]);

  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout padding={false}>
        <div className="h-full relative flex flex-col">
          <div className="flex-shrink-0 p-5">
            <Link href={`/users`}>
              <a className="text-sm flex items-center space-x-3">
                <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
                <p className="text-dark-100">Back to Users</p>
              </a>
            </Link>
          </div>

          <div className="w-full h-full overflow-hidden">
            {userDetail &&
            !userDetailError &&
            assessments &&
            !assessmentsError &&
            userAssessmentDetail &&
            !userAssessmentDetailError ? (
              <>
                <div className="relative w-full h-full flex flex-col">
                  <div className="space-y-4 px-5">
                    <div className="flex justify-between items-center">
                      <div className="text-xl">
                        Create session under{" "}
                        <span className="text-violet-100">{`${userDetail?.first_name || "-"} ${
                          userDetail?.last_name || "-"
                        }`}</span>
                      </div>
                      <div>
                        <AssessmentEnrollmentCreateSession
                          user_id={user_id}
                          assessment_id={null}
                          assessments={assessments?.assessments}
                          mutationData={userAssessmentDetail}
                          mutation={userAssessmentDetailMutation}
                        />
                      </div>
                    </div>

                    <div className="flex-shrink-0 flex items-center gap-2">
                      <div>
                        {userAssessmentSessions && userAssessmentSessions.length > 0 && (
                          <Pagination
                            count={perPage}
                            totalPages={userAssessmentDetail?.total_pages}
                            currentPage={parseInt(cursor?.split(":")[1]) + 1}
                            onPageChange={setCursor}
                          />
                        )}
                      </div>
                      <div className="ml-auto"></div>
                      <div>
                        <AssessmentEnrollmentSearchAssessment
                          user_id={user_id}
                          assessments={assessments?.assessments}
                          searchAssessment={searchAssessment}
                          handleSearchAssessment={handleSearchAssessment}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-auto p-5">
                    {userAssessmentSessions && userAssessmentSessions.length > 0 ? (
                      <div className="space-y-3">
                        {userAssessmentSessions.map((_session: any, index: any) => (
                          <div key={index}>
                            <div
                              className={`px-5 py-3 flex items-center gap-2 border border-gray-200 ${
                                index === userAssessmentSessions.length - 1 ? `` : `border-b-0`
                              }`}
                            >
                              <div className="border border-violet-100 bg-violet-100 rounded-sm px-2 py-0.5 text-xs text-white">
                                {_session?.assessment_data?.id}
                              </div>
                              <div className="border border-violet-100 bg-violet-100 rounded-sm px-2 py-0.5 text-xs text-white">
                                {_session?.assessment_data?.kind}
                              </div>
                              <div className="border border-violet-100 bg-violet-100 rounded-sm px-2 py-0.5 text-xs text-white">
                                {_session?.assessment_data?.name}
                              </div>
                              <div className="ml-auto">
                                <AssessmentEnrollmentCreateSession
                                  user_id={user_id}
                                  assessment_id={_session?.assessment_data?.id}
                                  assessments={assessments?.assessments}
                                  mutationData={userAssessmentDetail}
                                  mutation={userAssessmentDetailMutation}
                                />
                              </div>
                            </div>
                            <div className="overflow-x-auto">
                              <AssessmentEnrollmentSessionTableView
                                assessmentSession={_session}
                                user_id={user_id}
                                userDetail={userDetail}
                                assessments={assessments?.assessments}
                                mutationData={userAssessmentDetail}
                                mutation={userAssessmentDetailMutation}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-dark-100 text-center">
                        No assessment sessions are available.
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-sm text-dark-100 text-center">loading...</div>
            )}
          </div>
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminUserAssessmentEnroll, {
  authRequired: true,
  role: ["admin", "tutor", "manager"],
});
