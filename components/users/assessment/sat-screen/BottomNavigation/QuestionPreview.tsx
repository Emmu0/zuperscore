import React from "react";
// icons
import { BookmarkIcon } from "@ui/icons";
import MapPinIcon from "@ui/icons/mapPin";
// components
import PopOver from "@components/utilities/PopOver";
import SectionReview from "../global/SectionReview";
// recoil
import { useRecoilValue } from "recoil";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

interface IQuestionBottomBarPreview {
  handleCurrentQuestion: any;
  handleSectionQuestionPreview: any;
}

const QuestionBottomBarPreview: React.FC<IQuestionBottomBarPreview> = ({
  handleCurrentQuestion,
  handleSectionQuestionPreview,
}: any) => {
  const assessment = useRecoilValue(assessmentRecoil.assessmentSelector);
  const questions = useRecoilValue(assessmentRecoil.questionsSelector);
  const questionIndex = useRecoilValue(assessmentRecoil.questionIndexSelector);
  const sections = useRecoilValue(assessmentRecoil.sections);
  const sectionIndex = useRecoilValue(assessmentRecoil.sectionIndexSelector);

  return (
    <PopOver
      button={
        <div
          className={`rounded-lg bg-black text-white px-8 w-full py-2 text-base border-2 flex justify-between items-center`}
        >
          Question - {questionIndex + 1} of {questions?.length}
        </div>
      }
      content={
        <div className="relative">
          <div className="fixed bottom-[9vh] mx-auto left-0 right-0 border border-[#E2E2E2] bg-[#ffffff] rounded-[6px] overflow-y-auto flex flex-col justify-start items-center p-5 max-w-[700px]">
            <div className="w-full text-center text-xl font-semibold border-b-2 border-border-light pb-4">
              {assessment?.name} : {sections?.[sectionIndex]?.data?.section?.name}
            </div>

            <div className="w-full flex justify-evenly items-center border-b-2 border-border-light py-4">
              <div className="flex items-center">
                <MapPinIcon width="18" height="18" className="mr-4" />
                Current
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[22px] h-[22px] border border-black border-dashed"></div>
                Unanswered
              </div>
              <div className="flex items-center">
                <BookmarkIcon width="18" height="18" className="mr-4" />
                For Review
              </div>
            </div>

            <div className="py-7">
              <SectionReview
                currentQuestion={questionIndex}
                handleCurrentQuestion={(value: any) => handleCurrentQuestion(value)}
              />
            </div>

            <button
              className="px-4 py-2 border border-[#0077C8] text-[#0077C8] font-bold rounded-full"
              onClick={handleSectionQuestionPreview}
            >
              Go to Review Page
            </button>
          </div>
          {/* <div className="w-16 overflow-hidden absolute bottom-[-10px] left-[-40px]">
            <div className=" h-11 w-11 bg-white -rotate-45 transform origin-top-left"></div>
          </div> */}
        </div>
      }
      position={`bottom-10 right-0`}
    />
  );
};

export default QuestionBottomBarPreview;
