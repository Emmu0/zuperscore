import React from "react";
// recoil
import { useRecoilState } from "recoil";
// components
import Button from "../helpers/button";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

interface INavigation {
  handlePreviousQuestion: any;
  handleSectionQuestionPreview: any;
  handleNextQuestion: any;
  handleNextSection: any;
  handleCloseAssessment: any;
}

const Navigation: React.FC<INavigation> = ({
  handlePreviousQuestion,
  handleSectionQuestionPreview,
  handleNextQuestion,
  handleNextSection,
  handleCloseAssessment,
}: any) => {
  const [onlineCurrentView, recoilOnlineCurrentView] = useRecoilState(
    assessmentRecoil.onlineCurrentView
  );
  const [sections, recoilSections] = useRecoilState(assessmentRecoil.sectionsSelector);
  const [sectionIndex, recoilSectionIndex] = useRecoilState(assessmentRecoil.sectionIndexSelector);
  const [questions, recoilQuestions] = useRecoilState(assessmentRecoil.questionsSelector);
  const [questionIndex, recoilQuestionIndex] = useRecoilState(
    assessmentRecoil.questionIndexSelector
  );
  const [attemptLoader, recoilAttemptLoader] = useRecoilState(assessmentRecoil.attemptLoader);
  return (
    <div className="flex items-center gap-4">
      {questionIndex != 0 && (
        <Button onClick={handlePreviousQuestion} disabled={questionIndex <= 0}>
          Back
        </Button>
      )}

      {questions && questionIndex >= questions.length - 1 ? (
        <>
          {sections &&
          sectionIndex >= sections.length - 1 &&
          onlineCurrentView === "SECTION-REVIEW" ? (
            <Button onClick={handleCloseAssessment}>Complete Assessment</Button>
          ) : (
            <>
              {onlineCurrentView === "SECTION-REVIEW" ? (
                <Button onClick={handleNextSection}>{/* Next Section */}Next</Button>
              ) : (
                <Button onClick={handleSectionQuestionPreview}>{/* Section Review */}Next</Button>
              )}
            </>
          )}
        </>
      ) : (
        <Button onClick={handleNextQuestion} disabled={attemptLoader}>
          Next
        </Button>
      )}
    </div>
  );
};

export default Navigation;
