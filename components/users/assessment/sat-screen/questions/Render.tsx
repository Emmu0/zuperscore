import React from "react";
// recoil
import { useRecoilValue } from "recoil";
// components
import CreateUpdateAttempt from "@components/users/assessment/sat-screen/questions/CreateUpdateAttempt";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

const QuestionRender = ({ renderQuestionDetails }: any) => {
  const questions = useRecoilValue(assessmentRecoil.questionsSelector);

  return (
    <div className="container mx-auto w-full h-full relative flex overflow-y-auto">
      <div className="w-full h-full">
        {questions && questions.length > 0 ? (
          <CreateUpdateAttempt />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionRender;
