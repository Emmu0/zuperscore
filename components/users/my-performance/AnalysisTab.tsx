import React from "react";
// headless ui
import { Tab } from "@headlessui/react";
// components
import ReportTableView from "./TableView";
import PerformanceGraph from "./PerformanceGraph";

const AnalysisTab = ({ topicList, output, strengthAnalysis }: any) => {
  let categories = [
    {
      id: 1,
      key: "table-view",
      title: "Table View",
      component: (
        <ReportTableView
          topicList={topicList}
          output={output}
          strengthAnalysis={strengthAnalysis}
        />
      ),
    },
    {
      id: 2,
      key: "chart-view",
      title: "Chart View",
      component: (
        <PerformanceGraph
          topicList={topicList}
          output={output}
          strengthAnalysis={strengthAnalysis}
        />
      ),
    },
  ];

  const calculatePercentage = (analysis: any) => {
    let returnValue: any = 0;
    if (analysis?.total_questions > 0)
      returnValue = ((100 * analysis?.correct_questions) / analysis?.total_questions).toFixed(2);
    return returnValue;
  };

  return (
    <div className="space-y-3">
      <div className="border border-gray-200 rounded-sm flex divide-x">
        <div className="w-full flex flex-col justify-center items-center p-3 gap-1">
          <div className="font-medium text-xl">{strengthAnalysis?.total_questions || 0}</div>
          <div className="text-sm font-medium text-gray-500">Total Questions</div>
        </div>
        <div className="w-full flex flex-col justify-center items-center p-3 gap-1">
          <div className="font-medium text-xl">{strengthAnalysis?.correct_questions || 0}</div>
          <div className="text-sm font-medium text-gray-500">Correct Questions</div>
        </div>
        <div className="w-full flex flex-col justify-center items-center p-3 gap-1">
          <div className="font-medium text-xl">{calculatePercentage(strengthAnalysis)} %</div>
          <div className="text-sm font-medium text-gray-500">Accuracy</div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-sm w-full h-full p-3 space-y-4">
        <Tab.Group defaultIndex={0}>
          <Tab.List className="flex flex-wrap gap-1">
            {categories.map((_category) => (
              <Tab
                key={_category?.key}
                className={({ selected }) =>
                  `px-3 py-1.5 text-sm uppercase font-medium rounded-sm focus:outline-none border border-gray-100 ${
                    selected
                      ? `border-violet-100 bg-violet-100 text-yellow-0`
                      : `hover:bg-violet-0 hover:border-violet-0 hover:text-violet-100 bg-white`
                  }`
                }
              >
                {_category.title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {categories.map((_category) => (
              <Tab.Panel key={_category?.key} className={`space-y-2`}>
                <div>{_category?.component}</div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default AnalysisTab;
