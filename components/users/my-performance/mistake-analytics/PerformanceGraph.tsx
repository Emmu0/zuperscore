import { PieChart } from "components/users/assessment/result/PieChart";
import React from "react";

const PerformanceGraph = ({ topicList, output, strengthAnalysis }: any) => {
  const random_rgba = () => {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ",";
    // return "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + "," + r().toFixed(1) + ")";
  };

  const [pieData, setPieData] = React.useState<any>(null);

  React.useEffect(() => {
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

    if (output && strengthAnalysis && strengthAnalysis?.data && strengthAnalysis?.data.length > 0) {
      if (output === "topic") {
        let strengthAnalysisData = strengthAnalysis?.data;
        strengthAnalysisData = reOrderValues(strengthAnalysis?.data);
        if (strengthAnalysisData && strengthAnalysisData.length > 5) {
          let firstSeven = strengthAnalysisData.slice(0, 7).map((_data: any) => ({
            topic: _data?.topic,
            total_questions: _data?.total_questions,
            correct_questions: _data?.correct_questions,
            percentage:
              _data?.total_questions > 0
                ? ((100 * _data?.correct_questions) / _data?.total_questions).toFixed(2)
                : 0,
          }));
          let others = strengthAnalysisData.slice(7, strengthAnalysisData.length);

          let otherTopicValidation: any = {
            topic: "others",
            total_questions: others.reduce(
              (partialSum: any, a: any) => partialSum + parseInt(a.total_questions),
              0
            ),
            correct_questions: others.reduce(
              (partialSum: any, a: any) => partialSum + parseInt(a.correct_questions),
              0
            ),
          };
          otherTopicValidation["percentage"] =
            otherTopicValidation["total_questions"] > 0
              ? (
                  (100 * otherTopicValidation["correct_questions"]) /
                  otherTopicValidation["total_questions"]
                ).toFixed(2)
              : 0;

          firstSeven.push(otherTopicValidation);
          strengthAnalysisData = firstSeven;
        }

        const colorArray = [
          "rgba(255,99,132, 0.8)",
          "rgba(255,205,86, 0.8)",
          "rgba(72,245,109, 0.8)",
          "rgba(54,162,235,1)",
          "rgba(92,90,206, 0.8)",
          "rgba(244,109,67, 0.8)",
          "rgba(232,193,160, 0.8)",
          "rgba(29,223,163, 0.8)",
        ];

        let pieChartData = strengthAnalysisData.map((_data: any, _idx: any) => {
          return {
            title: _data?.topic === "others" ? _data?.topic : renderTopicTitle(_data?.topic),
            percentage: _data?.percentage,
            bg_color: colorArray[_idx],
            border_color: colorArray[_idx],
          };
        });
        let piePayload = {
          labels: pieChartData.map((_data: any) => _data?.title),
          datasets: [
            {
              label: "Accuracy(%) ",
              data: pieChartData.map((_data: any) => _data?.percentage),
              backgroundColor: pieChartData.map((_data: any) => _data?.bg_color),
              borderColor: pieChartData.map((_data: any) => _data?.border_color),
              borderWidth: 1,
            },
          ],
        };
        setPieData((prevData: any) => piePayload);
      }

      if (output === "difficulty") {
        let pieChartData = strengthAnalysis?.data.map((_data: any) => {
          let rgba = random_rgba();
          return {
            title: `Difficulty ${_data?.difficulty}`,
            percentage:
              _data?.total_questions > 0
                ? ((100 * _data?.correct_questions) / _data?.total_questions).toFixed(2)
                : 0,
            bg_color: `rgba(${rgba} 0.2)`,
            border_color: `rgba(${rgba} 1)`,
          };
        });
        let piePayload = {
          labels: pieChartData.map((_data: any) => _data?.title),
          datasets: [
            {
              label: "Accuracy(%) ",
              data: pieChartData.map((_data: any) => _data?.percentage),
              backgroundColor: pieChartData.map((_data: any) => _data?.bg_color),
              borderColor: pieChartData.map((_data: any) => _data?.border_color),
              borderWidth: 1,
            },
          ],
        };
        setPieData((prevData: any) => piePayload);
      }

      if (output === "time_taken") {
        let pieChartData = strengthAnalysis?.data.map((_data: any) => {
          let rgba = random_rgba();
          return {
            title: renderTimeTakenTitle(_data?.time_taken),
            percentage:
              _data?.total_questions > 0
                ? ((100 * _data?.correct_questions) / _data?.total_questions).toFixed(2)
                : 0,
            bg_color: `rgba(${rgba} 0.2)`,
            border_color: `rgba(${rgba} 1)`,
          };
        });

        let piePayload = {
          labels: pieChartData.map((_data: any) => _data?.title),
          datasets: [
            {
              label: "Accuracy(%) ",
              data: pieChartData.map((_data: any) => _data?.percentage),
              backgroundColor: pieChartData.map((_data: any) => _data?.bg_color),
              borderColor: pieChartData.map((_data: any) => _data?.border_color),
              borderWidth: 1,
            },
          ],
        };

        setPieData((prevData: any) => piePayload);
      }
    }
  }, [output, strengthAnalysis, topicList]);
  return (
    <div className="flex justify-center items-center">
      {pieData && pieData.labels.length > 0 ? (
        <div className="w-[400px]">
          <PieChart data={pieData} />
        </div>
      ) : (
        <div className="w-full text-center font-medium px-2 py-1 border">
          No question available under the filter
        </div>
      )}
    </div>
  );
};

export default PerformanceGraph;
