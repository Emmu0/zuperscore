import React from "react";
// icons
import { BookmarkIcon } from "@ui/icons";
// recoil
import { useRecoilState, useSetRecoilState } from "recoil";
// components
import SectionReview from "../global/SectionReview";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

interface IAssessmentReview {
  currentQuestion?: any;
  renderQuestionDetails?: any;
}

const AssessmentReview: React.FC<IAssessmentReview> = ({
  currentQuestion,
  renderQuestionDetails,
}) => {
  const [assessment] = useRecoilState(assessmentRecoil.assessmentSelector);
  const [sections] = useRecoilState(assessmentRecoil.sections);
  const [sectionIndex] = useRecoilState(assessmentRecoil.sectionIndexSelector);

  const recoilAssessmentDefaultSet = useSetRecoilState(assessmentRecoil.assessmentDefaultSelector);

  const handleCurrentQuestion = async (currentQuestionIndex: any) => {
    recoilAssessmentDefaultSet({
      type: "update",
      data: {
        onlineCurrentView: "TEST",
        questionIndex: currentQuestionIndex,
        currentAttempt: null,
      },
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center py-10 space-y-4 overflow-y-auto">
      <div className="text-3xl text-blue-500">Check Your Work</div>
      <div>
        On test day, you won{"'"}t be able to move on to the next module until time expires.
      </div>
      <div>
        For those practice questions, you can click <b>Next</b> when you{"'"}re ready to move on.
      </div>
      <div className="border border-gray-200 shadow w-[700px] p-5 rounded space-y-5">
        <div className="w-full flex items-center gap-4 border-b-2 border-border-light pb-2">
          <div className="text-lg font-medium">
            {assessment?.name} : {sections?.[sectionIndex]?.data?.section?.name}
          </div>
          <div className="flex items-center gap-2 ml-auto text-sm">
            <div className="w-[28px] h-[28px] border border-black border-dashed"></div>
            Unanswered
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BookmarkIcon width="18" height="18" />
            For Review
          </div>
        </div>

        <SectionReview handleCurrentQuestion={handleCurrentQuestion} />
      </div>
    </div>
  );
};

export default AssessmentReview;
