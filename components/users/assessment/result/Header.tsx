import React from "react";
// next imports
import Image from "next/image";
// components
import Button from "@components/buttons";
import AnalysisSubmitVerification from "./questions/analysis/SubmitVerification";
import ScaledScore from "./analytics/Scaledscore";
// icons
import { GlobeAltIcon, DesktopComputerIcon } from "@heroicons/react/solid";
// api services
import { AssessmentSession } from "@lib/services/user.assessment.service";
// common
import { assessmentWithSectionQuestionsValidator } from "@constants/assessment-validator";
import { dateTimePreview } from "@constants/common";

const AssessmentResultHeader: React.FC<any> = ({
  result,
  session_id,
  attempts,
  view = "student",
  mutateUrl,
  sections,
}: any) => {
  const [buttonDeveloperLoader, setButtonDeveloperLoader] = React.useState(false);

  const generateDeveloperResult = async (sessionId: any) => {
    setButtonDeveloperLoader(true);

    let assessment_result = await assessmentWithSectionQuestionsValidator(sessionId);
    assessment_result = JSON.parse(JSON.stringify(assessment_result));
    assessment_result = {
      ...assessment_result,
      section_analysis_data: assessment_result?.section_analysis_data.map((_result: any) => {
        delete _result?.attempts;
        delete _result?.question_ids;
        delete _result?.question_details;
        return _result;
      }),
    };
    formSubmit(assessment_result, sessionId);
  };

  const formSubmit = (assessment_result: any, sessionId: any) => {
    let sessionPayload = {
      id: sessionId,
      ...assessment_result,
    };

    AssessmentSession.update(sessionPayload)
      .then((response) => {
        setButtonDeveloperLoader(false);
      })
      .catch((error) => {
        setButtonDeveloperLoader(false);
        console.log("error", error);
      });
  };

  const currentTestTookIn = () => {
    let type = null;
    if (
      result?.user_assessment_session?.data?.test_taken_from &&
      result?.user_assessment_session?.data?.test_taken_from.length > 0
    ) {
      type =
        result?.user_assessment_session?.data?.test_taken_from[
          result?.user_assessment_session?.data?.test_taken_from.length - 1
        ]?.type;
    }
    return type;
  };

  return (
    <div>
      <div className="flex overflow-hidden border border-light p-4 rounded-sm gap-4">
        <div className="flex-shrink-0 border border-light w-[86px] h-[86px] bg-light-0 relative">
          {result && currentTestTookIn() && (
            <div className="absolute bottom-[-12px] right-[-12px] bg-violet-0 w-[24px] h-[24px] rounded-full flex justify-center items-center">
              {currentTestTookIn() === "web" ? (
                <GlobeAltIcon className="text-violet-100 w-[18px] h-[18px]" />
              ) : (
                <DesktopComputerIcon className="text-violet-100 w-[18px] h-[18px]" />
              )}
            </div>
          )}
        </div>
        <div className="w-full">
          <div className="text-xl font-semibold">{result?.assessment?.name}</div>
          <div className="text-dark-0 pt-1">{result?.assessment?.description}</div>
          <div className="text-sm text-dark-0 pt-3">
            Created on{" "}
            {dateTimePreview(result?.user_assessment_session?.assessment_detail?.created_at)}
          </div>
        </div>

        <div className="flex items-center whitespace-nowrap">
          <AnalysisSubmitVerification
            session_id={session_id}
            result={result}
            attempts={attempts}
            view={view}
          />
        </div>

        {view != "student" && (
          <ScaledScore result={result} view={view} sections={sections} mutateUrl={mutateUrl} />
        )}

        {view === "admin" && process.env.NEXT_PUBLIC_LOCAL_ENVIRONMENT === "local" && (
          <div className="flex items-center whitespace-nowrap">
            <Button size="sm" onClick={() => generateDeveloperResult(session_id)}>
              {buttonDeveloperLoader ? "Processing..." : "Process Result"}
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 px-5 border border-t-0 border-border-light">
        <div className={`text-violet-100 text-md font-bold border-b-2 border-violet-100 py-2`}>
          Test Results
        </div>
      </div>
    </div>
  );
};

export default AssessmentResultHeader;
