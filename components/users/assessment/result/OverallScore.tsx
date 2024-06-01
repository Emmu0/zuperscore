import React from "react";

const OverallScore = ({ result }: any) => {
  const [sectionGrouping, setSectionGrouping] = React.useState<any>(null);
  const [testResult, setTestResult] = React.useState<any>(null);

  React.useEffect(() => {
    if (result && result?.user_assessment_session?.section_info_data) {
      let sectionGroup: any = [
        {
          key: "reading_and_writing",
          value: "Reading and Writing",
          data: {
            result: {
              score: 0,
              correct_answers: 0,
              wrong_answers: 0,
              answered_answers: 0,
              unanswered_answers: 0,
              visited_answers: 0,
              unvisited_answers: 0,
              over_all_percentage: 0,
              total_no_of_questions: 0,
            },
            sections: [],
          },
        },
        {
          key: "math",
          value: "Math",
          data: {
            result: {
              score: 0,
              correct_answers: 0,
              wrong_answers: 0,
              answered_answers: 0,
              unanswered_answers: 0,
              visited_answers: 0,
              unvisited_answers: 0,
              over_all_percentage: 0,
              total_no_of_questions: 0,
            },
            sections: [],
          },
        },
      ];

      let sectionResults = result?.user_assessment_session?.section_analysis_data;
      sectionResults.map((_section: any) => {
        if (_section) {
          let sectionGroupIndex = sectionGroup.findIndex(
            (_item: any) => _item?.key == _section?.group_by
          );

          if (sectionGroupIndex >= 0) {
            sectionGroup[sectionGroupIndex].data.result.score += _section?.results?.score || 0;
            sectionGroup[sectionGroupIndex].data.result.correct_answers +=
              _section?.results?.correct_answers;
            sectionGroup[sectionGroupIndex].data.result.wrong_answers +=
              _section?.results?.wrong_answers;
            sectionGroup[sectionGroupIndex].data.result.answered_answers +=
              _section?.results?.answered_answers;
            sectionGroup[sectionGroupIndex].data.result.unanswered_answers +=
              _section?.results?.unanswered_answers;
            sectionGroup[sectionGroupIndex].data.result.visited_answers +=
              _section?.results?.visited_answers;
            sectionGroup[sectionGroupIndex].data.result.unvisited_answers +=
              _section?.results?.unvisited_answers;
            sectionGroup[sectionGroupIndex].data.result.total_no_of_questions +=
              _section?.results?.total_no_of_questions;
            sectionGroup[sectionGroupIndex].data.result.over_all_percentage += parseFloat(
              _section?.results?.over_all_percentage
            );
          }
        }
      });

      let _testResult = {
        score: 0,
        correct_answers: 0,
        wrong_answers: 0,
        answered_answers: 0,
        unanswered_answers: 0,
        visited_answers: 0,
        unvisited_answers: 0,
        over_all_percentage: 0,
        total_no_of_questions: 0,
      };

      sectionGroup.map((_groupItem: any) => {
        _testResult = {
          ..._testResult,
          score: _testResult?.score + _groupItem?.data?.result?.score,
          correct_answers: _testResult?.correct_answers + _groupItem?.data?.result?.correct_answers,
          wrong_answers: _testResult?.wrong_answers + _groupItem?.data?.result?.wrong_answers,
          answered_answers:
            _testResult?.answered_answers + _groupItem?.data?.result?.answered_answers,
          unanswered_answers:
            _testResult?.unanswered_answers + _groupItem?.data?.result?.unanswered_answers,
          visited_answers: _testResult?.visited_answers + _groupItem?.data?.result?.visited_answers,
          unvisited_answers:
            _testResult?.unvisited_answers + _groupItem?.data?.result?.unvisited_answers,
          over_all_percentage:
            _testResult?.over_all_percentage +
            parseFloat(_groupItem?.data?.result?.over_all_percentage),
          total_no_of_questions:
            _testResult?.total_no_of_questions + _groupItem?.data?.result?.total_no_of_questions,
        };
      });

      setSectionGrouping(sectionGroup);
      setTestResult(_testResult);
    }
  }, [result]);

  return (
    <div className="space-y-2">
      <div className="text-lg font-medium">Overall Score</div>

      <div className="bg-light-200 border border-border-light flex justify-between items-center divide-x">
        <div className="w-full p-3 px-4">
          <div className="text-2xl font-semibold text-violet-100">
            {`${testResult?.correct_answers} / ${testResult?.total_no_of_questions}`}
          </div>
          <div className="text-md font-medium pt-2 text-violet-100">Total Questions</div>
        </div>
        {sectionGrouping?.map((_group: any, index: any) => (
          <div className="w-full p-3 px-4" key={index}>
            <div className="text-2xl font-semibold">
              {`${_group?.data?.result?.correct_answers} / ${_group?.data?.result?.total_no_of_questions}`}
            </div>
            <div className="text-md font-medium pt-2 text-violet-100">{_group?.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverallScore;
