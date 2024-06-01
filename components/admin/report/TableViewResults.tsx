import React from "react";
// swr
import useSWR from "swr";
// uuid
import { v4 as uuidV4 } from "uuid";
// components
import Button from "@components/buttons";
import TableRender from "./TableRender";
// api routes
import {
  DOWNLOAD_ASSESSMENT_ANALYSIS,
  QUESTION_BY_IDS_ENDPOINT,
  USER_ASSESSMENT_ATTEMPTS_WITH_SESSION_ID_ENDPOINT,
  USER_ASSESSMENT_SESSIONS_WITH_ID,
} from "@constants/api-routes";
// api services
import { APIFetcher, APIPostFetcherWithData } from "@lib/services";
import { initializeXMLHttpRequest } from "@lib/services/xml.service";

const TableViewResults = ({ session_id }: any) => {
  const [section_id, setSection_id] = React.useState(null);
  const [sessionIndex, setSessionIndex] = React.useState(0);
  const [sectionAnalysisIndex, setSectionAnalysisIndex] = React.useState(0);
  const [buttonLoader, setButtonLoader] = React.useState(false);

  const { data: assessmentSectionsResult, error: assessmentSectionsResultError } = useSWR(
    session_id ? [USER_ASSESSMENT_SESSIONS_WITH_ID(session_id), `${session_id}`] : null,
    (url: any) => APIFetcher(url),
    { refreshInterval: 0, revalidateOnFocus: false }
  );
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
    section_id && assessmentSectionsResult
      ? [QUESTION_BY_IDS_ENDPOINT, `assessment-questions-${session_id}-${section_id}`]
      : null,
    (url: any) => APIPostFetcherWithData(url, filterQuestionIds(section_id)),
    { refreshInterval: 0, revalidateOnFocus: false }
  );
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

  React.useEffect(() => {
    if (assessmentSectionsResult?.user_assessment_session?.section_analysis_data) {
      const section_analysis_data =
        assessmentSectionsResult?.user_assessment_session?.section_analysis_data;
      let section_analysis_data_index: number = 0;
      for (let i = 0; i < sessionIndex; i++) {
        section_analysis_data_index += section_analysis_data[i].results.attempts.length;
      }
      setSectionAnalysisIndex(section_analysis_data_index);
      setSection_id(section_analysis_data[sessionIndex]?.id);
    }
  }, [assessmentSectionsResult, sessionIndex]);

  const renderTableData = () => {
    let data: any;
    if (
      assessmentSectionsResult?.user_assessment_session?.section_analysis_data[sessionIndex]
        ?.results?.attempts
    ) {
      data =
        assessmentSectionsResult?.user_assessment_session?.section_analysis_data[sessionIndex]
          ?.results?.attempts;
    }
    return data;
  };
  const renderCheckWrongQuestion = (): Boolean => {
    for (let i = 0; i < assessmentQuestionsDetail.questions.length; i++) {
      if (renderTableData()[i]?.result?.is_correct === false) return true;
    }
    return false;
  };

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
    session_id ? queryStringArray.push(`session_id=${session_id}`) : "";

    let queryString: string = queryStringArray.toString();
    if (queryStringArray && queryStringArray.length > 0) {
      queryString = queryString.replace(/,/g, "&");
    }

    let xmlHttp = initializeXMLHttpRequest(DOWNLOAD_ASSESSMENT_ANALYSIS() + "?" + queryString);
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
    <>
      <div className="w-full h-full space-y-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {!assessmentSectionsResult ? (
              <div className="text-center w-full text-muted text-sm py-5">loading...</div>
            ) : (
              assessmentSectionsResult?.assessment?.assessment_sections.length > 0 &&
              assessmentSectionsResult?.assessment?.assessment_sections.map(
                (section: any, index: number) => (
                  <Button
                    size="sm"
                    variant={index == sessionIndex ? "primary" : "secondary"}
                    key={index}
                    onClick={() => {
                      setSessionIndex(index);
                    }}
                  >
                    {section?.name}
                  </Button>
                )
              )
            )}
            {assessmentSectionsResult &&
              !assessmentSectionsResult?.user_assessment_session?.is_reviewed && (
                <span className="bg-violet-100 px-3 py-1 rounded-xl text-yellow-100 font-medium text-xs">
                  Not-analyzed
                </span>
              )}
          </div>
          <div>
            <Button size="sm" variant={"primary"} onClick={downloadCSVHandler}>
              {buttonLoader ? "Downloading..." : "Download CSV"}
            </Button>
          </div>
        </div>
        {assessmentSectionsResult &&
          (assessmentQuestionsDetail ? (
            <div className="overflow-scroll max-h-[26rem]">
              <table className="w-full border border-collapse  whitespace-nowrap ">
                <thead className="border bg-gray-100 h-10 text-violet-100 relative">
                  <tr className="border text-left sticky top-0 bg-gray-100">
                    <td className="border px-3 py-1 min-w-[40px] text-sm uppercase text-center">
                      Q No.
                    </td>
                    <td className="border px-3 py-1 min-w-[80px] text-sm uppercase text-center">
                      Domain
                    </td>
                    <td className="border px-3 py-1 min-w-[80px] text-sm uppercase">Topic</td>
                    <td className="border px-3 py-1 min-w-[80px] text-sm uppercase">Subtopic</td>
                    <td className="border px-3 py-1 min-w-[50px] uppercase text-sm">Difficulty</td>
                    <td className="border px-3 py-1 min-w-[120px] text-sm uppercase">Time Taken</td>
                    {assessmentSectionsResult?.user_assessment_session?.is_reviewed && (
                      <>
                        <td className="w-[15rem] max-w-[30rem] border px-3 py-1 uppercase text-sm">
                          Reason For Error
                        </td>
                        <td
                          className={` ${
                            !renderCheckWrongQuestion() ? "w-[10rem]" : "w-[50rem]"
                          }  max-w-[50rem] border px-3 py-1uppercase text-sm`}
                        >
                          Comments
                        </td>
                      </>
                    )}
                  </tr>
                </thead>
                {assessmentQuestionsDetail && (
                  <tbody>
                    {assessmentQuestionsDetail?.questions.map((data: any, index: number) =>
                      !renderTableData()[index]?.result?.is_correct ? (
                        <TableRender
                          key={index + 1}
                          index={index}
                          renderTableData={renderTableData}
                          sectionAnalysisIndex={sectionAnalysisIndex}
                          assessmentAttempts={assessmentAttempts}
                          reasonForError={
                            assessmentSectionsResult?.user_assessment_session?.is_reviewed
                          }
                          block={data}
                        />
                      ) : null
                    )}
                    {assessmentQuestionsDetail && !renderCheckWrongQuestion() && (
                      <td
                        colSpan={
                          assessmentSectionsResult?.user_assessment_session?.is_reviewed ? 8 : 6
                        }
                        className="text-center font-medium px-2 py-1"
                      >
                        No wrong answer
                      </td>
                    )}
                  </tbody>
                )}
              </table>
            </div>
          ) : (
            <div className="text-center w-full text-muted text-sm py-5">loading...</div>
          ))}
      </div>
    </>
  );
};

export default TableViewResults;
