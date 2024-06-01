import React from "react";
// next imports
import { NextPage } from "next";
import { useRouter } from "next/router";
// swr
import useSWR from "swr";
// components
import Pagination from "@components/utilities/Pagination";
import UserDefaultLayout from "@layouts/UserDefaultLayout";
import AssessmentFilterRoot from "@components/users/mistake-analysis/FilterRoot";
import BlockPreviewHeader from "@components/users/mistake-analysis/Header";
import BlockPreviewMCQ from "@components/users/mistake-analysis/BlockMCQ";
import BlockPreviewSPR from "@components/users/mistake-analysis/BlockSPR";
import BlockPreviewAnalysis from "@components/users/mistake-analysis/AnalysisReport";
import Passage from "@components/users/assessment/result/questions/Passage";
import Content from "@components/users/assessment/result/questions/Content";
import Explanation from "@components/users/assessment/result/questions/Explanation";
// api routes
import { SETTINGS_ENDPOINT } from "@constants/api-routes";
import { MISTAKE_ANALYZER_ENDPOINT } from "@constants/api-routes";
// api services
import { APIFetcher, APIPostFetcherWithData } from "@lib/services";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// common
import { assessmentQuestionValidator } from "@constants/assessments";
// hoc
import authWrapper from "lib/hoc/authWrapper";

const Assessments: NextPage = () => {
  const router = useRouter();
  const {
    assessment,
    time,
    analyzed,
    difficulty,
    section_type,
    error_type,
    // exam,
    subject,
    domain,
    topic,
    sub_topic,
  } = router.query;


  const [searchQuery, setSearchQuery] = React.useState<any>(null);
  const { data: settings, error: settingsError } = useSWR(
    SETTINGS_ENDPOINT,
    APIFetcher,
    { refreshInterval: 0 }
  );
  const handleSearchQuery = (value: any) => {
    setSearchQuery(value);
  };

  const searchQueryGenerator = (_query: any) => {
    let query = null;

    if (_query && _query?.data?.assessment && _query?.data?.subject && _query?.url) {
      let queryStringArray: any = {};

      if (_query?.data?.assessment) {
        if (_query?.data?.assessment == "last_five") queryStringArray[`strategy`] = "last_five";
        else if (_query?.data?.assessment == "all") queryStringArray[`strategy`] = "all";
      }

      _query?.data?.difficulty != "all" &&
        (queryStringArray[`difficulty`] = parseInt(_query?.data?.difficulty));
      // _query?.data?.exam && (queryStringArray[`exam`] = parseInt(_query?.data?.exam));
      _query?.data?.subject && (queryStringArray[`subject`] = parseInt(_query?.data?.subject));
      _query?.data?.domain && (queryStringArray[`domain`] = parseInt(_query?.data?.domain));
      _query?.data?.topic && (queryStringArray[`topic`] = parseInt(_query?.data?.topic));
      _query?.data?.sub_topic && (queryStringArray[`subtopic`] = parseInt(_query?.data?.sub_topic));
      query = queryStringArray;
      query && query.length > 0 ? query : "no_query";
    }

    return query;
  };

  const perPage = 10;
  const [cursor, setCursor] = React.useState<any>(`${perPage}:0:0`);

  const { data: userMistakeAnalysis, error: userMistakeAnalysisError } = useSWR(
    searchQuery && searchQueryGenerator(searchQuery)
      ? [
        `${MISTAKE_ANALYZER_ENDPOINT}?per_page=${perPage}&cursor=${cursor}`,
        `${searchQuery && searchQuery?.url ? searchQuery?.url : ``}`,
      ]
      : null,
    (url: any) => APIPostFetcherWithData(url, searchQueryGenerator(searchQuery))
  );

  React.useEffect(() => {
    if (
      searchQuery === null &&
      (assessment ||
        time ||
        analyzed ||
        difficulty ||
        section_type ||
        error_type ||
        // exam ||
        subject ||
        domain ||
        topic ||
        sub_topic)
    ) {
      let queryStringArray = [];

      assessment ? queryStringArray.push(`assessment=${assessment}`) : ``;
      time ? queryStringArray.push(`time=${time}`) : ``;
      analyzed ? queryStringArray.push(`analyzed=${analyzed}`) : ``;
      difficulty ? queryStringArray.push(`difficulty=${difficulty}`) : ``;
      section_type ? queryStringArray.push(`section_type=${section_type}`) : ``;
      error_type ? queryStringArray.push(`error_type=${error_type}`) : ``;
      // exam ? queryStringArray.push(`exam=${exam}`) : ``;
      subject ? queryStringArray.push(`subject=${subject}`) : ``;
      domain ? queryStringArray.push(`domain=${domain}`) : ``;
      topic ? queryStringArray.push(`topic=${topic}`) : ``;
      sub_topic ? queryStringArray.push(`sub_topic=${sub_topic}`) : ``;

      let queryString: any = queryStringArray.toString();
      queryString = queryString.replace(/,/g, "&");
      setSearchQuery({
        data: {
          assessment: assessment ? assessment : "last_five",
          time_taken: time ? time : "all",
          difficulty: difficulty ? difficulty : "all",
          reason_for_error_section_type: section_type ? section_type : "all",
          reason_for_error_error_type: error_type ? error_type : "all",
          analyzed: analyzed ? analyzed : false,
          // exam: exam ? exam : 1,
          subject: subject ? subject : null,
          domain: domain ? domain : null,
          topic: topic ? topic : null,
          sub_topic: sub_topic ? sub_topic : null,
        },
        route: `?${queryString.length > 2 ? queryString : null}`,
        url: `&${queryString.length > 2 ? queryString : null}`,
      });
    }
  }, [
    assessment,
    time,
    analyzed,
    difficulty,
    section_type,
    error_type,
    searchQuery,
    // exam,
    subject,
    domain,
    topic,
    sub_topic,
  ]);

  const handlePassageRender = (section_data: any, question: any) => {
    let passageRenderToggle = false;

    if (
      question?.passage?.passage?.root?.children &&
      question?.passage?.passage?.root?.children.length > 0 &&
      question?.passage?.passage?.root?.children[0]?.children &&
      question?.passage?.passage?.root?.children[0]?.children.length > 0
    )
      passageRenderToggle = true;
    else if (
      question?.passage?.passage?.root?.children &&
      question?.passage?.passage?.root?.children.length > 0 &&
      question?.passage?.passage_html && question?.passage?.passage_text 
    )
      passageRenderToggle = true;
    return passageRenderToggle;
  };

  const [mistakeAnalyzedQuestions, setMistakeAnalyzedQuestions] = React.useState([]);

  React.useEffect(() => {
    if (
      userMistakeAnalysis &&
      userMistakeAnalysis?.results &&
      userMistakeAnalysis?.results.length > 0
    ) {
      let questions = userMistakeAnalysis?.results.map((value: any) => {
        let currentAttempt = userMistakeAnalysis?.extra_stats?.attempts.find(
          (_attempt: any) => _attempt.question == value.id
        );

        return {
          question: value,
          attempt: currentAttempt ? currentAttempt : null,
          result: currentAttempt
            ? assessmentQuestionValidator(value, [currentAttempt]).result
            : null,
        };
      });
      questions = questions.filter((_question: any) => _question?.question);
      setMistakeAnalyzedQuestions(questions);
    } else {
      setMistakeAnalyzedQuestions([]);
    }
  }, [userMistakeAnalysis]);

  const filterMistakeAnalysisQuestions = (allBlocks: any) => {
    let currentBlocks = [...allBlocks];

    if (time) {
      let timeSplit = (time as string).split("_");
      let min = parseInt(timeSplit[0]);
      let max = parseInt(timeSplit[1]);
      if (max > 0)
        currentBlocks = currentBlocks.filter(
          (_question: any) =>
            _question?.result?.time_taken?.total_time >= min &&
            _question?.result?.time_taken?.total_time <= max
        );
      else
        currentBlocks = currentBlocks.filter(
          (_question: any) => _question?.result?.time_taken?.total_time >= min
        );
    }

    if (analyzed) {
      currentBlocks = currentBlocks.filter(
        (_question: any) => _question?.attempt?.analysis_data?.type
      );
    }

    if (error_type) {
      currentBlocks = currentBlocks.filter(
        (_question: any) => _question?.attempt?.analysis_data?.type == error_type
      );
    }

    return currentBlocks;
  };

  return (
    <UserDefaultLayout>
      <div className="text-xl font-medium pb-4">Review Mistakes</div>
      {settings && !settings[0].disabled_mistake_analyzer ? <>
        <div>
          <div className="mb-2">
            <AssessmentFilterRoot
              query={searchQuery}
              student={true}
              handleSearchQuery={(value: any) => {
                setCursor(`10:0:0`);
                handleSearchQuery(value);
              }}
            />
          </div>
          <div className="text-lg">
            Total Questions:{" "}
            {mistakeAnalyzedQuestions
              ? filterMistakeAnalysisQuestions(mistakeAnalyzedQuestions).length
              : "0"}
          </div>
          <div>
            {(assessment && subject) ||
              time ||
              difficulty ||
              error_type ||
              subject ||
              domain ||
              topic ||
              sub_topic ? (
              <div>
                {userMistakeAnalysis && !userMistakeAnalysisError ? (
                  <div className="mt-5 space-y-5">
                    <div>
                      <Pagination
                        count={perPage}
                        totalPages={userMistakeAnalysis?.total_pages}
                        currentPage={parseInt(cursor?.split(":")[1]) + 1}
                        onPageChange={(value: any) => {
                          setCursor(value);
                        }}
                      />
                    </div>

                    {mistakeAnalyzedQuestions &&
                      filterMistakeAnalysisQuestions(mistakeAnalyzedQuestions).length > 0 ? (
                      <div className="space-y-4">
                        {filterMistakeAnalysisQuestions(mistakeAnalyzedQuestions)?.map(
                          (block: any, index: any) => (
                            <div key={index} className="flex gap-4">
                              <div className="flex-shrink-0 w-[26px] h-[26px] font-medium flex justify-center items-center border border-violet-100 text-violet-100 rounded-sm px-1 mt-3">
                                {index + 1}
                              </div>
                              <div className="border border-gray-300 w-full">
                                <BlockPreviewHeader
                                  question={block?.question}
                                  attempt={block?.attempt}
                                  result={block?.result}
                                />

                                {handlePassageRender(null, block?.question) && (
                                  <Passage block={block.question} />
                                )}

                                <Content block={block.question} />

                                {block?.question.type === "MCQ" && (
                                  <BlockPreviewMCQ block={block.question} result={block} />
                                )}

                                {block?.question.type === "SPR" && (
                                  <BlockPreviewSPR block={block.question} result={block} />
                                )}

                                <BlockPreviewAnalysis
                                  question={block?.question}
                                  attempt={block?.attempt}
                                  result={block?.result}
                                />

                                <Explanation block={block.question} />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-gray-400 py-5">
                        No relevant mistakes were found.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-5">Loading...</div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-5">
                Please apply the filters to fetch the results.
              </div>
            )}
          </div>
        </div>
      </>
        : <div className="text-center text-gray-700 py-5">This feature is currently disabled due to heavy load of testing. Kindly make a request on your WhatsApp group to resume this.</div>}
    </UserDefaultLayout>
  );
};

export default authWrapper(Assessments, { authRequired: true, role: "user" });
