import React, { useState } from "react";
// components
import Button from "@components/buttons";
import { ReactHookSelect } from "@components/forms/ReactHookSelect";

const StrengthAnalyticsSubFilter = ({
  topicList,
  strengthAnalysis,
  output,
  register,
  errors,
  control,
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
            register={register}
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
            register={register}
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
            register={register}
            control={control}
            errors={errors}
            searchFilteredOptions={timeOptions}
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

export default StrengthAnalyticsSubFilter;
