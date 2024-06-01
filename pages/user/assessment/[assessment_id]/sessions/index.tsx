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
import AssessmentSessionView from "@components/users/sessions/TableView";
import Pagination from "@components/utilities/Pagination";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
//api routes
import { USER_ASSESSMENT_SESSION_WITH_USER_ID } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Assessment Result",
};

const UserAssessmentSessions: NextPage = () => {
  const router = useRouter();

  const { assessment_id } = router.query as {
    assessment_id: any;
    session_id: any;
  };

  const [profile, setProfile] = React.useState<any>(null);

  React.useEffect(() => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    if (userToken && userToken?.user) setProfile(userToken?.user);
  }, []);

  const perPage = 10;
  const [cursor, setCursor] = React.useState<any>(`${perPage}:0:0`);

  const { data: assessmentSectionsResult, error: assessmentSectionsResultError } = useSWR(
    profile && assessment_id
      ? [
          `${USER_ASSESSMENT_SESSION_WITH_USER_ID(
            profile?.id,
            assessment_id
          )}&per_page=${perPage}&cursor=${cursor}`,
          `ASSESSMENT-RESULTS-${profile?.id}-${assessment_id}`,
        ]
      : null,
    (url: any) => APIFetcher(url),
    { refreshInterval: 0, revalidateOnFocus: false }
  );

  return (
    <>
      <Container meta={seoMetaInformation}>
        <DefaultLayout>
          <div className="mx-auto container my-8 space-y-5 px-5">
          <Link href={`/assessments?kind=MOCK`}>
              <a className="text-sm flex items-center space-x-3">
                <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
                <p className="text-dark-100">Back to Assessments</p>
              </a>
            </Link>

            <div className="text-xl font-medium">Assessment Sessions</div>

            {assessmentSectionsResult && !assessmentSectionsResultError ? (
              <>
                {assessmentSectionsResult &&
                assessmentSectionsResult?.results &&
                assessmentSectionsResult?.results.length > 0 ? (
                  <>
                    <Pagination
                      count={perPage}
                      totalPages={assessmentSectionsResult?.total_pages}
                      currentPage={parseInt(cursor?.split(":")[1]) + 1}
                      onPageChange={setCursor}
                    />
                    <div className="overflow-x-auto">
                      <AssessmentSessionView sessions={assessmentSectionsResult} cursor={cursor} />
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

export default authWrapper(UserAssessmentSessions, { authRequired: true, role: "user" });
