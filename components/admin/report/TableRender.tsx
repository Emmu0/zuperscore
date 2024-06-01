import React from "react";
// swr
import useSWR from "swr";
//api routes
import {
  TAG_DOMAIN_WITH_SUBJECT_ENDPOINT,
  TAG_EXAM_ENDPOINT,
  TAG_SUBJECT_WITH_EXAM_ENDPOINT,
  TAG_SUB_TOPIC_WITH_TOPIC_ENDPOINT,
  TAG_TOPIC_WITH_DOMAIN_ENDPOINT,
} from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
// constants
import { secondsTimerConversion } from "@constants/common";

const TitleRender = ({ options, selectedOptions }: any) => {
  const renderQuestionType = (_key: string) => {
    let currentQuestion = options?.find((_qType: any) => _qType?.key == _key);
    if (currentQuestion) return `${currentQuestion?.title}`;
  };
  return (
    <div className={` text-sm cursor-pointer px-2 py-2`}>
      {selectedOptions && selectedOptions.length > 0 ? (
        <div className="flex flex-grow flex-wrap gap-2 items-center">
          {selectedOptions.map((_option: any, _optionIndex: number) => (
            <div key={_optionIndex}>{renderQuestionType(_option)}</div>
          ))}
        </div>
      ) : (
        "None"
      )}
    </div>
  );
};

const TableRender = ({
  index,
  assessmentAttempts,
  renderTableData,
  sectionAnalysisIndex,
  reasonForError,
  block,
}: any) => {
  // exam swr
  const { data: examList, error: examListError } = useSWR(
    block ? [TAG_EXAM_ENDPOINT, `tag-exam`] : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );
  // subject swr
  const { data: subjectList, error: subjectListError } = useSWR(
    block && block?.exam
      ? [TAG_SUBJECT_WITH_EXAM_ENDPOINT(block?.exam), `tag-subject-${block?.exam}`]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );
  // domain swr
  const { data: domainList, error: domainListError } = useSWR(
    block && block?.subject
      ? [TAG_DOMAIN_WITH_SUBJECT_ENDPOINT(block?.subject), `tag-subject-${block?.subject}`]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );
  // topic swr
  const { data: topicList, error: topicListError } = useSWR(
    block && block?.domain
      ? [TAG_TOPIC_WITH_DOMAIN_ENDPOINT(block?.domain), `tag-subject-${block?.domain}`]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );
  // sub topic swr
  const { data: subTopicList, error: subTopicListError } = useSWR(
    block && block?.topic
      ? [TAG_SUB_TOPIC_WITH_TOPIC_ENDPOINT(block?.topic), `tag-subject-${block?.topic}`]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const [filterOptions, setFilterOptions] = React.useState<any>({
    examFilter: null,
    subjectFilter: null,
    domainFilter: null,
    topicFilter: null,
    subTopicFilter: null,
  });

  React.useEffect(() => {
    if (examList || subjectList || domainList || topicList || subTopicList) {
      setFilterOptions((prevData: any) => {
        return {
          ...prevData,
          examFilter:
            examList && examList.length > 0
              ? examList.map((_data: any) => {
                return { key: _data?.id, title: _data?.name };
              })
              : null,
          subjectFilter:
            subjectList && subjectList.length > 0
              ? subjectList.map((_data: any) => {
                return { key: _data?.id, title: _data?.name };
              })
              : null,
          domainFilter:
            domainList && domainList.length > 0
              ? domainList.map((_data: any) => {
                return { key: _data?.id, title: _data?.name };
              })
              : null,
          topicFilter:
            topicList && topicList.length > 0
              ? topicList.map((_data: any) => {
                return { key: _data?.id, title: _data?.name };
              })
              : null,
          subTopicFilter:
            subTopicList && subTopicList.length > 0
              ? subTopicList.map((_data: any) => {
                return { key: _data?.id, title: _data?.name };
              })
              : null,
        };
      });
    }
  }, [examList, subjectList, domainList, topicList, subTopicList]);
  const renderFilterOptions = (filterType: string) => {
    let options = [{ key: null, title: "None" }];

    if (filterOptions && filterOptions?.[filterType] && filterOptions?.[filterType].length > 0)
      options = [...options, ...filterOptions?.[filterType]];

    return options;
  };

  const analysisCheck = (id: any) => {
    const attempt = assessmentAttempts.find((question: any) => id == question.question);
    return attempt ? true : false
  }
  const renderReasonForError = (id: any) => {
    const attempt = assessmentAttempts.find((question: any) => id == question.question);
    if (attempt && attempt.analysis_data) {
      let str = attempt?.analysis_data?.type;
      var stringWithSpaces = str?.replace(/_/g, " ");
      return stringWithSpaces?.charAt(0).toUpperCase() + stringWithSpaces?.slice(1).toLowerCase();
    }
  };

  console.log(analysisCheck(block?.id), "analysisCheck(block?.id)")
  const renderComments = (id: any) => {
    const attempt = assessmentAttempts.find((question: any) => id == question.question);
    if (attempt && attempt.analysis_data) {
      let str = attempt?.analysis_data?.message;
      return str;
    }
  };
  return (
    <>
      {assessmentAttempts && block && analysisCheck(block?.id) && (
        <tr className="text-sm" key={index}>
          <td className="min-w-[40px] border px-3 py-2">{index + 1}</td>
          <td className="min-w-[120px] border px-3 py-2">
            <div>
              <TitleRender
                options={renderFilterOptions("domainFilter")}
                selectedOptions={block && block?.domain ? [block?.domain] : null}
              />
            </div>
          </td>
          <td className="min-w-[120px] border px-3 py-2">
            <div>
              <TitleRender
                options={renderFilterOptions("topicFilter")}
                selectedOptions={block && block?.topic ? [block?.topic] : null}
              />
            </div>
          </td>
          <td className="min-w-[120px] border px-3 py-2">
            <div>
              <TitleRender
                options={renderFilterOptions("subTopicFilter")}
                selectedOptions={block && block?.sub_topic ? [block?.sub_topic] : null}
              />
            </div>
          </td>
          <td className="min-w-[40px] border px-3 py-2">{block?.approvers_difficulty}</td>
          <td className="min-w-[120px] border px-3 py-2">
            {renderTableData()[index]?.result?.time_taken?.total_time
              ? secondsTimerConversion(
                renderTableData()[index]?.result?.time_taken?.total_time?.toFixed(2)
              )
              : "-"}
          </td>
          {analysisCheck(block?.id) && renderReasonForError(
            block?.id
          ) ? <>
            <td className="w-[15rem] max-w-[30rem] border px-3 py-2 whitespace-pre-wrap">
              {renderReasonForError(
                block?.id
              )}
            </td>
            <td className={`w-[50rem] max-w-[50rem] border px-3 py-2 whitespace-pre-wrap`}>
              {renderComments(block?.id)}
            </td>
          </> : null}
        </tr>
      )}
    </>
  );
};
export default TableRender;
