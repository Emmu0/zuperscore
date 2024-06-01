import React from "react";
// recoil
import { useRecoilState } from "recoil";
// icons
import { BookmarkIcon } from "@ui/icons";
import MapPinIcon from "@ui/icons/mapPin";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

interface ISectionReview {
  currentQuestion?: any | null;
  handleCurrentQuestion?: any;
}

const SectionReview: React.FC<ISectionReview> = ({ currentQuestion, handleCurrentQuestion }) => {
  const [questions] = useRecoilState(assessmentRecoil.questionsSelector);

  const [attempts] = useRecoilState(assessmentRecoil.attemptSelector);

  const validateQuestionTheme = (question: any) => {
    let returnValue = null;
    let colorAnswered = `border border-blue-500 bg-blue-500 text-white`;
    if (attempts && attempts.length > 0) {
      let currentAttempt = attempts?.find((attempt: any) => attempt?.question == question?.id);
      if (currentAttempt?.is_answered) returnValue = colorAnswered;
    }
    return returnValue;
  };

  const validateBookmark = (question: any) => {
    let returnValue = false;
    if (attempts && attempts.length > 0) {
      let currentAttempt = attempts?.find((attempt: any) => attempt?.question == question?.id);
      if (currentAttempt?.is_bookmark) returnValue = true;
    }

    return returnValue;
  };

  return (
    <>
      {questions && questions?.length > 0 ? (
        <div className="grid grid-cols-10 gap-6">
          {questions &&
            questions?.map((question: any, index: any) => {
              return (
                <div
                  className={`relative cursor-pointer flex justify-center items-center w-[40px] h-[40px] ${
                    validateQuestionTheme(question)
                      ? validateQuestionTheme(question)
                      : `border border-black border-dashed text-blue-500`
                  } `}
                  key={index}
                  onClick={() => {
                    if (handleCurrentQuestion) handleCurrentQuestion(index);
                  }}
                >
                  {currentQuestion != null && currentQuestion == index && (
                    <div className="absolute top-[-20px] flex justify-center w-full text-black">
                      <MapPinIcon width="14" height="14" />
                    </div>
                  )}

                  {validateBookmark(question) && (
                    <div className="absolute top-[-8px] right-[-8px]">
                      <BookmarkIcon width="14" height="14" />
                    </div>
                  )}

                  <div className={`text-xl font-medium`}>{index + 1}</div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="text-sm text-center text-dark-0 py-5">No Questions are available.</div>
      )}
    </>
  );
};

export default SectionReview;
