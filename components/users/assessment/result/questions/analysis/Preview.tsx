import React from "react";
// icons
import { DropdownIcon } from "@ui/icons";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
// components
import AnalysisReport from "./ReportModal";
import AnalysisReportDelete from "./report-delete";

interface IProps {
  block: any;
  result: any;
  attempt: any;
  view: any;
  analysis_type: any;
  attempts?: any;
  assessmentAttemptsMutate?: any;
  assessmentQuestionsDetailMutate?: any;
}

export const analysisReportTypeRAWOptions = [
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

export const analysisReportTypeMathOptions = [
  { key: "conceptual_error ", title: "Conceptual error " },
  { key: "calculation_error ", title: "Calculation error " },
  { key: "reading_error", title: "Reading error" },
  { key: "graph_based_error", title: "Graph based error" },
];

const BlockPreviewAnalysisPreview: React.FC<IProps> = ({
  block,
  result,
  attempt,
  view,
  analysis_type,
  attempts,
  assessmentAttemptsMutate,
  assessmentQuestionsDetailMutate,
}) => {
  const [previewEnable, setPreviewEnable] = React.useState(false);

  const renderAnalysisReportTypeOptions = (key: any) => {
    let returnString = "Not Available";
    let filteredOptions =
      analysis_type == "reading_and_writing"
        ? analysisReportTypeRAWOptions
        : analysisReportTypeMathOptions;
    if (key != null) {
      let currentOption = filteredOptions.find((_option: any) => _option?.key === key);
      if (currentOption && currentOption?.title) returnString = currentOption?.title;
    }
    return returnString;
  };

  return (
    <div className="p-3 border-t border-gray-300">
      <div className="flex items-center gap-2">
        <div className="flex justify-between items-center gap-2 w-full">
          <div
            onClick={() => setPreviewEnable(!previewEnable)}
            className="w-full text-bold text-gray-500 select-none cursor-pointer flex items-center gap-2 group"
          >
            <div
              className={`${
                previewEnable ? `rotate-180` : ``
              } border border-gray-200 group-hover:bg-gray-200 rounded-sm h-[26px] min-w-[26px] flex justify-center items-center`}
            >
              <DropdownIcon className="" />
            </div>
            <div>Analysis</div>
            <div>
              {attempt?.analysis_data?.type ? (
                <CheckIcon height="18px" width="18px" fill="green" />
              ) : (
                <XIcon height="18px" width="18px" fill="red" />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <div>
            {view === "admin" && attempt?.analysis_data?.type && (
              <AnalysisReportDelete
                attempt={attempt}
                assessmentAttemptsMutate={assessmentAttemptsMutate}
              />
            )}
          </div>
          {attempt &&
            attempt?.id &&
            ((view === "student" && !attempt?.analysis_data?.type) || view === "admin") && (
              <AnalysisReport
                attempt={attempt}
                analysis_type={analysis_type}
                attempts={attempts}
                assessmentAttemptsMutate={assessmentAttemptsMutate}
                assessmentQuestionsDetailMutate={assessmentQuestionsDetailMutate}
              />
            )}
        </div>
      </div>

      {previewEnable && (
        <div className="pt-2 space-y-2">
          {attempt?.analysis_data?.type ? (
            <>
              <div>
                <div className="text-sm text-dark-100 mb-2">Type</div>
                <div className="bg-gray-100 inline-block text-sm px-3 py-1 rounded-sm">
                  {renderAnalysisReportTypeOptions(attempt?.analysis_data?.type || null)}
                </div>
              </div>
              <div>
                <div className="text-sm text-dark-100 mb-2">Comment</div>
                {attempt?.analysis_data?.message && <div>{attempt?.analysis_data?.message}</div>}
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-400 text-center py-3">No analysis available.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlockPreviewAnalysisPreview;
