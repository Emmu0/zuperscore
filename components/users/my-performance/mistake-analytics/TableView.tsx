import React from "react";

const StudentAnalysisTableView = ({ topicList, output, subject, strengthAnalysis }: any) => {
  const renderTopicTitle = (topicId: any) => {
    let topicTitle = "Topic";
    let currentTopic =
      topicList && topicList.length > 0 && topicList.find((x: any) => x.id === topicId);
    if (currentTopic && currentTopic?.id) topicTitle = currentTopic?.name;
    return topicTitle;
  };

  const renderTimeTakenTitle = (timeTaken: any) => {
    let time: any = {
      "0_30": "0-30 Seconds",
      "30_60": "30-60 Seconds",
      "60_10000": "More than 60 seconds",
    };
    return time[timeTaken];
  };

  let reasonForErrorOptions = [
    { key: null, title: "None" },
    { key: "clicking_error", title: "Clicking error" },
    { key: "not_read_all_options", title: "Did not read all options" },
    { key: "not_follow_correct_steps", title: "Did not follow the correct steps " },
    { key: "did_not_identify_question_type", title: "Didn't identify the question type " },
    {
      key: "could_not_choose_between_two_options",
      title: "Couldn't choose between two options ",
    },
    { key: "did_not_notice_a_trap", title: "Didn't notice a trap " },
    {
      key: "not_read_all_keywords_of_the_question",
      title: "Did not read all keywords of the question",
    },
    { key: null, title: "None" },
    { key: "conceptual_error", title: "Conceptual error " },
    { key: "calculation_error", title: "Calculation error " },
    { key: "reading_error", title: "Reading error" },
    { key: "graph_based_error", title: "Graph based error" },
  ];

  const renderReasonForErrorTitle = (type: any) => {
    let reasonForErrorTitle = "Topic";
    let currentTopic =
      reasonForErrorOptions &&
      reasonForErrorOptions.length > 0 &&
      reasonForErrorOptions.find((x: any) => x.key === type);
    if (currentTopic && currentTopic?.title) reasonForErrorTitle = currentTopic?.title;
    return reasonForErrorTitle;
  };

  const reOrderValues = (value: any) => {
    if (value && value.length > 0) {
      value = value.map((_value: any) => ({
        ..._value,
        percentage:
          _value?.total_questions > 0
            ? ((100 * _value?.correct_questions) / _value?.total_questions).toFixed(2)
            : 0,
      }));
      value = value.sort((a: any, b: any) => parseInt(a.percentage) - parseInt(b.percentage));
      value = value.filter((data: any) => data.total_questions > 0);
    }
    return value;
  };

  return (
    <div className="w-full h-full pt-0 overflow-auto">
      <table className="w-full border border-collapse whitespace-nowrap">
        <thead className="border bg-gray-100 h-10 text-violet-100">
          <tr className="border text-left">
            <td className="border px-3 py-1 min-w-[80px] text-sm uppercase text-center">#</td>
            <td className="border px-3 py-1 min-w-[80px] text-sm uppercase">
              {output === "topic"
                ? `Topic`
                : output === "difficulty"
                ? `Difficulty`
                : output === "time_taken"
                ? `Time Taken`
                : `Reason For Error`}
            </td>
            <td className="border px-3 py-1 min-w-[80px] text-sm uppercase text-center">
              Total Questions
            </td>
            <td className="border px-3 py-1 min-w-[80px] text-sm uppercase text-center">
              Correct Questions
            </td>
            <td className="border px-3 py-1 min-w-[120px] text-sm uppercase text-center">
              Accuracy
            </td>
          </tr>
        </thead>

        <tbody>
          {strengthAnalysis &&
          strengthAnalysis?.data?.length > 0 &&
          reOrderValues(strengthAnalysis?.data).length > 0 ? (
            reOrderValues(strengthAnalysis?.data).map((_analysisData: any, _idx: any) => (
              <>
                {_idx < 7 && (
                  <tr key={_idx} className="text-sm">
                    <td className="min-w-[80px] border text-center">{_idx + 1}</td>
                    <td className="min-w-[80px] border px-3 py-2">
                      {output === "topic"
                        ? renderTopicTitle(_analysisData?.topic)
                        : output === "difficulty"
                        ? _analysisData?.difficulty
                        : output === "reason_for_error"
                        ? renderReasonForErrorTitle(_analysisData?.reason_for_error)
                        : renderTimeTakenTitle(_analysisData?.time_taken)}
                    </td>
                    <td className="min-w-[80px] border text-center px-3 py-2">
                      {_analysisData?.total_questions || 0}
                    </td>
                    <td className="min-w-[80px] border text-center px-3 py-2">
                      {_analysisData?.correct_questions || 0}
                    </td>
                    <td className="min-w-[120px] border text-center px-3 py-2">
                      {_analysisData?.percentage} %
                    </td>
                  </tr>
                )}
              </>
            ))
          ) : (
            <td colSpan={5} className="text-center font-medium px-2 py-1">
              No question available under the filter
            </td>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAnalysisTableView;
