import React from "react";
// recoil
import { useRecoilState } from "recoil";
// components
import AssessmentBorder from "@components/users/assessment/sat-screen/helpers/AssessmentBorder";
import SectionChange from "@components/users/assessment/sat-screen/global/SectionChange";
import SectionBreak from "@components/users/assessment/sat-screen/global/SectionBreak";
import AssessmentCompleted from "@components/users/assessment/sat-screen/global/AssessmentCompleted";

import GeneralInstructions from "@components/users/assessment/sat-screen/global/GeneralInstructions";
import GeneralNavigation from "@components/users/assessment/sat-screen/global/GeneralNavigation";
import TopNavigation from "@components/users/assessment/sat-screen/TopNavigation/index";
import BottomNavigation from "@components/users/assessment/sat-screen/BottomNavigation";
import QuestionRender from "@components/users/assessment/sat-screen/questions/Render";
import QuestionReview from "@components/users/assessment/sat-screen/questions/Review";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

interface ChildComponentProps {
  renderQuestionDetails: any;
}

const AssessmentScreenLayout: React.FC<ChildComponentProps> = ({ renderQuestionDetails }) => {
  const [onlineCurrentView, setOnlineCurrentView] = useRecoilState(
    assessmentRecoil.onlineCurrentViewSelector
  );

  // | "GENERAL-INSTRUCTIONS"
  // | "SECTION-REVIEW"
  // | "SECTION-CHANGE"
  // | "SECTION-BREAK"
  // | "TEST"

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      {/* general instructions */}
      {["GENERAL-INSTRUCTIONS"].includes(onlineCurrentView) && (
        <>
          <div className="flex-grow overflow-y-auto">
            {["GENERAL-INSTRUCTIONS"].includes(onlineCurrentView) && <GeneralInstructions />}
          </div>
          {["GENERAL-INSTRUCTIONS"].includes(onlineCurrentView) && (
            <div className="h-[74px] flex-shrink-0 border-0 border-t border-solid border-gray-200">
              <GeneralNavigation />
            </div>
          )}
        </>
      )}

      {/* section change */}
      {["SECTION-CHANGE"].includes(onlineCurrentView) && (
        <SectionChange renderQuestionDetails={renderQuestionDetails} />
      )}

      {/* section break */}
      {["SECTION-BREAK"].includes(onlineCurrentView) && <SectionBreak />}

      {/* section break */}
      {["TEST-COMPLETED"].includes(onlineCurrentView) && <AssessmentCompleted />}

      {/* test and section review */}
      {["TEST", "SECTION-REVIEW"].includes(onlineCurrentView) && (
        <>
          <div className="h-[74px] flex-shrink-0 px-5">
            <TopNavigation renderQuestionDetails={renderQuestionDetails} />
          </div>
          <AssessmentBorder />
          <div className="w-full h-full overflow-hidden px-5">
            {["SECTION-REVIEW"].includes(onlineCurrentView) ? (
              <QuestionReview renderQuestionDetails={renderQuestionDetails} />
            ) : (
              <QuestionRender renderQuestionDetails={renderQuestionDetails} />
            )}
          </div>

          <AssessmentBorder />
          <div className="h-[74px] flex-shrink-0 px-5">
            <BottomNavigation renderQuestionDetails={renderQuestionDetails} />
          </div>
        </>
      )}
    </div>
  );
};

export default AssessmentScreenLayout;
