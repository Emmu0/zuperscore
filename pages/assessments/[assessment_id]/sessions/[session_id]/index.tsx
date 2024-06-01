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
import AssessmentResultHeader from "@components/users/assessment/result/Header";
import OverallScore from "@components/users/assessment/result/OverallScore";
import SectionOverview from "@components/users/assessment/result/SectionOverview";
import ResultQuestions from "@components/users/assessment/result/ResultQuestions";
import AssessmentMigration from "components/admin/assessments/AssessmentMigration";
//api routes
import {
  USER_ASSESSMENT_SESSIONS_WITH_ID,
  USER_ASSESSMENT_ATTEMPTS_WITH_SESSION_ID_ENDPOINT,
  QUESTION_BY_IDS_ENDPOINT,
} from "@constants/api-routes";
// api services
import { APIFetcher, APIPostFetcherWithData } from "@lib/services";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Assessment Result",
};

const UserAssessmentSessionDetail: NextPage = () => {
  const router = useRouter();

  const { assessment_id, session_id, section_id } = router.query as {
    assessment_id: any;
    session_id: any;
    section_id: any;
  };

  const [urlState, setUrlState] = React.useState<any>("");
  React.useEffect(() => {
    if (router.query.prevUrl) {
      setUrlState(router.query.prevUrl);
    } else if (!urlState) {
      setUrlState(`/assessments/${assessment_id}/sessions`);
    }
  }, [router.query.prevUrl, urlState, assessment_id]);

  const { data: assessmentSectionsResult, error: assessmentSectionsResultError } = useSWR(
    session_id ? [USER_ASSESSMENT_SESSIONS_WITH_ID(session_id), `${session_id}`] : null,
    (url: any) => APIFetcher(url),
    { refreshInterval: 0, revalidateOnFocus: false }
  );

  React.useEffect(() => {
    if (!section_id && assessmentSectionsResult) {
      let sections = assessmentSectionsResult?.user_assessment_session?.section_analysis_data;

      if (sections && sections.length > 0) {
        router.replace(
          `/assessments/${assessment_id}/sessions/${session_id}?section_id=${sections[0].id}`,
          undefined,
          { shallow: true }
        );
      }
    }
  }, [assessmentSectionsResult, section_id, assessment_id, session_id, router]);

  const filterQuestionIds = (section_id: any) => {
    let questions = [];
    if (section_id && assessmentSectionsResult?.user_assessment_session?.section_question_data) {
      questions =
        assessmentSectionsResult?.user_assessment_session?.section_question_data[section_id];
    }
    if (questions && questions.length > 0)
      return {
        question_ids: questions,
      };
    else return null;
  };

  const {
    data: assessmentAttempts,
    mutate: assessmentAttemptsMutate,
    error: assessmentAttemptsError,
  } = useSWR(
    session_id
      ? [
          USER_ASSESSMENT_ATTEMPTS_WITH_SESSION_ID_ENDPOINT(session_id),
          `assessment-attempts-${session_id}`,
        ]
      : null,
    (url: any) => APIFetcher(url),
    { refreshInterval: 0, revalidateOnFocus: false }
  );

  const {
    data: assessmentQuestionsDetail,
    mutate: assessmentQuestionsDetailMutate,
    error: assessmentQuestionsDetailError,
  } = useSWR(
    section_id && assessmentSectionsResult && filterQuestionIds(section_id)
      ? [QUESTION_BY_IDS_ENDPOINT, `assessment-questions-${session_id}-${section_id}`]
      : null,
    (url: any) => APIPostFetcherWithData(url, filterQuestionIds(section_id)),
    { refreshInterval: 0, revalidateOnFocus: false }
  );
  console.log("assessmentSectionsResult", assessmentSectionsResult);

  return (
    <>
      <Container meta={seoMetaInformation}>
        <DefaultLayout>
          <div className="mx-auto container my-8 space-y-8 px-5">
            <Link href={urlState} passHref>
              <a
                // onClick={() => router.back()}
                className="text-sm flex items-center space-x-3 cursor-pointer"
              >
                <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
                <p className="text-dark-100">Back to Assessment Sessions</p>
              </a>
            </Link>

            {assessmentSectionsResult && !assessmentSectionsResultError ? (
              <>
                {assessmentSectionsResult?.user_assessment_session?.section_analysis_data &&
                assessmentSectionsResult?.user_assessment_session?.section_analysis_data.length >
                  0 ? (
                  <>
                    {assessmentSectionsResult ? (
                      <>
                        <AssessmentResultHeader
                          session_id={session_id}
                          result={assessmentSectionsResult}
                          sections={
                            assessmentSectionsResult?.data?.data?.assessment_detail?.sections || []
                          }
                          mutateUrl={[
                            USER_ASSESSMENT_SESSIONS_WITH_ID(session_id),
                            `${session_id}`,
                          ]}
                          view="admin"
                        />

                        <OverallScore result={assessmentSectionsResult} view="admin" />

                        <SectionOverview result={assessmentSectionsResult} view="admin" />

                        <ResultQuestions
                          view="admin"
                          assessment_id={assessment_id}
                          session_id={session_id}
                          section_id={section_id}
                          sections={
                            assessmentSectionsResult?.user_assessment_session
                              ?.section_analysis_data || []
                          }
                          questions={assessmentQuestionsDetail}
                          attempts={assessmentAttempts}
                          assessmentQuestionsDetailMutate={assessmentQuestionsDetailMutate}
                          assessmentAttemptsMutate={assessmentAttemptsMutate}
                        />
                      </>
                    ) : (
                      <div className="text-center text-sm text-muted py-5">
                        Something wrong with this Session please go back
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-center text-sm text-muted py-5">
                      New migration of results are not completed. Please check with your teacher.
                    </div>
                    {/* admin local migration */}
                    {/* {assessmentSectionsResult?.user_assessment_session?.pscale_data?.session_id &&
                      process.env.NEXT_PUBLIC_LOCAL_ENVIRONMENT === "local" && (
                        <AssessmentMigration
                          assessment_id={null}
                          session={[
                            {
                              dj_session: assessmentSectionsResult?.user_assessment_session?.id,
                              session:
                                assessmentSectionsResult?.user_assessment_session?.pscale_data
                                  ?.session_id,
                              assessment:
                                assessmentSectionsResult?.user_assessment_session?.assessment,
                            },
                          ]}
                        />
                      )} */}
                  </>
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

export default authWrapper(UserAssessmentSessionDetail, {
  authRequired: true,
  role: ["admin", "tutor", "manager"],
});
