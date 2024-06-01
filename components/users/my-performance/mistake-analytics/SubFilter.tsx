import React, { useState } from "react";
// components
import Button from "@components/buttons";
import { ReactHookSelect } from "@components/forms/ReactHookSelect";

const MistakeAnalyticsSubFilter = ({
  topicList,
  strengthAnalysis,
  subject,
  output,
  control,
  errors,
  generateSubFilters,
  clearSubFilters,
}: any) => {
  let difficultyOptions = [
    { key: null, title: "None" },
    { key: "1", title: "1" },
    { key: "2", title: "2" },
    { key: "3", title: "3" },
    { key: "4", title: "4" },
    { key: "5", title: "5" },
  ];

  let timeOptions = [
    { key: null, title: "None" },
    { key: "0_30", title: "0-30 Seconds" },
    { key: "30_60", title: "30-60 Seconds" },
    { key: "60_10000", title: "More than 60 seconds" },
  ];

  let reasonForErrorRAWOptions = [
    { key: null, title: "None" },
    { key: "clicking_error", title: "Clicking error" },
    { key: "not_read_all_options", title: "Did not read all options" },
    { key: "not_follow_correct_steps", title: "Did not follow the correct steps " },
    { key: "did_not_identify_question_type", title: "Didn't identify the question type " },
    { key: "could_not_choose_between_two_options", title: "Couldn't choose between two options " },
    { key: "did_not_notice_a_trap", title: "Didn't notice a trap " },
    {
      key: "not_read_all_keywords_of_the_question",
      title: "Did not read all keywords of the question",
    },
  ];
  let reasonForErrorMathOptions = [
    { key: null, title: "None" },
    { key: "conceptual_error", title: "Conceptual error " },
    { key: "calculation_error", title: "Calculation error " },
    { key: "reading_error", title: "Reading error" },
    { key: "graph_based_error", title: "Graph based error" },
  ];

  let reasonForErrorOptions = () => {
    return subject === "2" ? reasonForErrorRAWOptions : reasonForErrorMathOptions;
  };

  const [topicOptions, setTopicOptions] = useState<any>(null);
  React.useEffect(() => {
    if (
      topicList &&
      topicList.length > 0 &&
      strengthAnalysis?.topics &&
      strengthAnalysis?.topics.length > 0
    ) {
      let values: any = [{ key: null, title: "None" }];
      values = [
        ...values,
        ...topicList
          .map((data: any) => {
            if (strengthAnalysis?.topics.includes(data?.id))
              return {
                key: data.id.toString(),
                title: data.name,
              };
          })
          .filter((_topic: any) => _topic?.key),
      ];

      setTopicOptions(values);
    }
  }, [topicList, strengthAnalysis]);

  return (
    <div className="w-full h-full border border-gray-200 rounded-sm p-3 space-y-3">
      {output !== "topic" && topicOptions && topicOptions.length > 0 && (
        <div className="space-y-1">
          <ReactHookSelect
            name="topic"
            placeHolder="Select Topic"
            label="Topic"
            control={control}
            errors={errors}
            searchFilteredOptions={topicOptions}
          />
        </div>
      )}

      {output !== "difficulty" && (
        <div className="space-y-1">
          <ReactHookSelect
            name="difficulty"
            placeHolder="Select Difficulty"
            label="Difficulty"
            control={control}
            errors={errors}
            searchFilteredOptions={difficultyOptions}
          />
        </div>
      )}

      {output !== "time_taken" && (
        <div className="space-y-1">
          <ReactHookSelect
            name="time_taken"
            placeHolder="Select Time Taken"
            label="Time Taken"
            control={control}
            errors={errors}
            searchFilteredOptions={timeOptions}
          />
        </div>
      )}
      {output !== "reason_for_error" && (
        <div className="space-y-1">
          <ReactHookSelect
            name="reason_for_error"
            placeHolder="Select Reason For Error"
            label="Reason For Error"
            control={control}
            errors={errors}
            searchFilteredOptions={reasonForErrorOptions()}
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button variant="primary" size="xs" className="w-full" onClick={generateSubFilters}>
          Apply Filters
        </Button>
        <Button variant="secondary" size="xs" className="w-full" onClick={clearSubFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default MistakeAnalyticsSubFilter;
