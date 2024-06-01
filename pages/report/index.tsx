import React from "react";
// next imports
import { NextPage } from "next";
import { useRouter } from "next/router";
// swr
import useSWR from "swr";
// uuid
import { v4 as uuidV4 } from "uuid";
// components
import Container from "@components/Container";
import Button from "@components/buttons";
// layout
import AdminLayout from "@layouts/AdminLayout";
// components
import Pagination from "@components/utilities/Pagination";
import ReportFilterView from "@components/admin/report/Filter";
import ReportTableView from "@components/admin/report/TableView";
//api routes
import {
  ASSESSMENT_ENDPOINT,
  DOWNLOAD_ASSESSMENT_SESSIONS,
  USER_ASSESSMENT_SESSIONS,
  USER_ENDPOINT,
  USER_WITHOUT_PAGINATION_ENDPOINT,
} from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import authWrapper from "@lib/hoc/authWrapper";
// api services
import { initializeXMLHttpRequest } from "@lib/services/xml.service";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
const seoMetaInformation = {
  title: "Admin Dashboard",
};

const AdminDashboard: NextPage = () => {
  const router = useRouter();
  const { assessment, kind, user, order_by, subject } = router.query;

  const perPage = 10;
  const [cursor, setCursor] = React.useState<any>(`${perPage}:0:0`);
  const [searchQuery, setSearchQuery] = React.useState<any>(null);
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const handleSearchQuery = (value: any) => {
    setSearchQuery(value);
    setCursor(`${perPage}:0:0`);
  };

  const [userDetails, setUserDetails] = React.useState<any>();
  const [tutorId, setTutorId] = React.useState();
  const [managerId, setManagerId] = React.useState();

  React.useEffect(() => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    setUserDetails(userToken);
  }, []);

  React.useEffect(() => {
    if (userDetails && userDetails.user && userDetails.user.role === "tutor") {
      setTutorId(userDetails?.user?.id);
    }
    if (userDetails && userDetails.user && userDetails.user.role === "manager") {
      setManagerId(userDetails?.user?.id);
    }
  }, [userDetails]);

  const SELECT_USER_ENDPOINT = `${USER_ENDPOINT}?per_page=10&cursor=${cursor}${
    userDetails?.user?.role != "admin"
      ? `${tutorId ? `&tutor_id=${tutorId}` : ""}${managerId ? `&manager_id=${managerId}` : ""}`
      : ""
  } `;

  React.useEffect(() => {
    if (searchQuery === null && (assessment || user || kind)) {
      let queryStringArray = [];

      assessment ? queryStringArray.push(`assessment=${assessment}`) : ``;
      kind ? queryStringArray.push(`kind=${kind}`) : ``;
      user ? queryStringArray.push(`user=${user}`) : ``;
      order_by ? queryStringArray.push(`order_by=${order_by}`) : ``;
      subject ? queryStringArray.push(`subject=${subject}`) : ``;

      if (queryStringArray && queryStringArray.length > 0) {
        let queryString: any = queryStringArray.toString();
        queryString = queryString.replace(/,/g, "&");
        setSearchQuery((prevData: any) => {
          return {
            data: {
              assessment: assessment ? assessment : "all",
              user: user ? user : "all",
            },
            route: `?${queryString.length > 2 ? queryString : null}`,
            url: `&${queryString.length > 2 ? queryString : null}`,
          };
        });
      }
    }
  }, [assessment, user, order_by, searchQuery]);

  const { data: usersAll, error: usersAllError } = useSWR(
    [USER_WITHOUT_PAGINATION_ENDPOINT, `report-users`],
    APIFetcher,
    { refreshInterval: 0, revalidateOnFocus: false }
  );
  const { data: users, error: usersError } = useSWR(
    SELECT_USER_ENDPOINT,
    APIFetcher,
    { refreshInterval: 0 }
  );
  const { data: assessments, error: assessmentsError } = useSWR(ASSESSMENT_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  });
  const { data: assessmentSectionsResult, error: assessmentSectionsResultError } = useSWR(
    searchQuery
      ? [
          `${USER_ASSESSMENT_SESSIONS}?per_page=${perPage}&cursor=${cursor}${
            searchQuery && searchQuery?.url ? searchQuery?.url : ``
          }`,
          `assessment-report-results-cursor-${cursor}-perPage-${perPage}-cursor-${
            searchQuery?.url ? searchQuery?.url : ``
          }`,
        ]
      : null,
    (url: any) => APIFetcher(url),
    { refreshInterval: 0, revalidateOnFocus: false }
  );
  const downloadAttendanceCsv = (csvStr: string) => {
    let hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvStr);
    hiddenElement.target = "_blank";
    hiddenElement.download = `Assessment Report ${uuidV4()}.csv`;
    hiddenElement.click();
  };
  const downloadCSVHandler = async () => {
    let queryStringArray: any = [];
    setButtonLoader(true);
    assessment ? queryStringArray.push(`assessment=${assessment}`) : "";
    user ? queryStringArray.push(`user=${user}`) : "";
    order_by ? queryStringArray.push(`order_by=${order_by}`) : "";

    let queryString: string = queryStringArray.toString();
    if (queryStringArray && queryStringArray.length > 0) {
      queryString = queryString.replace(/,/g, "&");
    }

    let xmlHttp = initializeXMLHttpRequest(DOWNLOAD_ASSESSMENT_SESSIONS() + "?" + queryString);
    const reqListener = (e: ProgressEvent) => {
      const target = e.currentTarget as XMLHttpRequest;
      downloadAttendanceCsv(target?.response);
    };
    xmlHttp.addEventListener("load", reqListener);
    xmlHttp.onerror = () => {
      alert("Error while downloading attendance details");
    };
    setButtonLoader(false);
  };
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout padding={false}>
        <div className="w-full h-full relative overflow-hidden flex flex-col">
          <div className="flex-shrink-0 py-3 space-y-3">
            <div className="px-5 text-xl font-medium">User Assessment Report</div>

            {assessments && !assessmentsError && users && !usersError ? (
              <div className="px-5">
                <ReportFilterView
                  users={users?.results}
                  assessments={assessments}
                  query={searchQuery}
                  handleSearchQuery={handleSearchQuery}
                  mutateUrl={SELECT_USER_ENDPOINT}
                  mutateUrlAssessment={ASSESSMENT_ENDPOINT}
                />
              </div>
            ) : (
              <div className="text-center w-full text-muted text-sm py-5">loading...</div>
            )}

            {assessmentSectionsResult &&
              !assessmentSectionsResultError &&
              assessments &&
              !assessmentsError &&
              users &&
              !usersError && (
                <div
                  className={`px-5 flex items-center ${
                    assessmentSectionsResult?.total_pages === 1 && "flex-row-reverse"
                  }`}
                >
                  <Pagination
                    count={perPage}
                    totalPages={assessmentSectionsResult?.total_pages}
                    currentPage={parseInt(cursor?.split(":")[1]) + 1}
                    onPageChange={(value: any) => {
                      setCursor(value);
                    }}
                  />
                  {(assessment || user) && assessmentSectionsResult?.results.length > 0 && (
                    <div>
                      <Button
                        size="sm"
                        variant="primary"
                        className="w-36"
                        onClick={downloadCSVHandler}
                      >
                        {buttonLoader ? "Downloading..." : "Download Report"}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            <div></div>
          </div>

          {assessments && !assessmentsError && users && !usersError && (
            <>
              {searchQuery ? (
                <>
                  {assessmentSectionsResult && !assessmentSectionsResultError ? (
                    <>
                      {assessmentSectionsResult &&
                      assessmentSectionsResult?.results &&
                      assessmentSectionsResult?.results.length > 0 ? (
                        <>
                          <div className="w-full h-full overflow-hidden">
                            <ReportTableView
                              sessions={assessmentSectionsResult?.results}
                              users={usersAll}
                              cursor={cursor}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="text-center text-sm text-muted py-5">
                          No User Sessions are available Sessions are available.
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center w-full text-muted text-sm py-5">loading...</div>
                  )}
                </>
              ) : (
                <div className="text-center w-full text-muted text-sm py-5">
                  Please apply the filters to fetch the results.
                </div>
              )}
            </>
          )}
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminDashboard, {
  authRequired: true,
  role: ["admin", "tutor", "manager"],
});
