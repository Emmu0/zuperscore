import React from "react";
// recoil
import { useRecoilValue, useRecoilState } from "recoil";
// components
import Editor from "@components/lexical/Editor";
import EditorHtml from "@components/lexical/EditorHtml";
import ElementMCQ from "./ElementMCQ";
import ElementSPR from "./ElementSPR";
import QuestionBar from "./QuestionBar";
import AssessmentBorder from "@components/users/assessment/sat-screen/helpers/AssessmentBorder";
import Annotation from "./Annotation";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

const AssessmentElementRootView = ({ attempt, updateAttempt }: any) => {
  const questionIndex = useRecoilValue(assessmentRecoil.questionIndexSelector);
  const questions = useRecoilValue(assessmentRecoil.questionsSelector);
  const [currentAttempt, recoilCurrentAttemptSet] = useRecoilState(
    assessmentRecoil.currentAttemptSelector
  );

  const [currentQuestion, setCurrentQuestion] = React.useState<any>(null);
  const handleCurrentQuestion = (key: any, value: any) => {
    setCurrentQuestion({ ...currentQuestion, [key]: value });
  };

  React.useEffect(() => {
    if (!questions || !attempt) return;

    let question = questions[questionIndex];

    setCurrentQuestion(() => {
      return {
        id: question?.id,
        // question title
        text: question?.data?.text,
        // passage
        passage: question?.passage?.passage ? question?.passage?.passage : null,
        passage_html: question?.passage?.passage_html ? question?.passage?.passage_html : null,
        passage_text: question?.passage?.passage_text ? question?.passage?.passage : null,
        // question
        content: question?.data?.content ? question?.data?.content : null,
        content_html: question?.data?.content_html ? question?.data?.content_html : null,
        content_text: question?.data?.content_text ? question?.data?.content : null,
        // question description
        is_active: question?.data?.paragraph?.is_active, //converted to boolean for checkbox
        paragraph: question?.data?.paragraph?.content,
        // answers
        answers: attempt?.data?.user_answer ? attempt?.data?.user_answer : [],
        // mark for review
        mark_for_review: attempt?.data?.mark_for_review ? attempt?.data?.mark_for_review : false,
        // question score
        eval_score: question?.data?.eval_score,
        // question difficulty
        difficulty: question?.data?.difficulty,
        // custom fields based on element Kind
        multiple: question?.data?.multiple || false, // MCQ -> data object
        // title
        title: question?.title,
        // feedback
        feedback: question?.feedback,
        // question type
        type: question?.type,
        // question options
        options: question?.options,
        // files and assets
        assets: question?.assets,
        files: question?.files,
        // score
        score: question?.score,
        // timers
        timers: question?.timers,
      };
    });
  }, [questions, questionIndex, attempt]);

  const handlePassageRenderToggle = (passage: any) => {
    let passageRenderToggle = false;

    if (
      passage?.passage?.root?.children &&
      passage?.passage?.root?.children.length > 0 &&
      passage?.passage?.root?.children[0]?.children &&
      passage?.passage?.root?.children[0]?.children.length > 0
    )
      passageRenderToggle = true;
    else if (
      passage?.passage?.root?.children &&
      passage?.passage?.root?.children.length > 0 &&
      passage?.passage_html && passage?.passage_text 
    )
      passageRenderToggle = true;
    return passageRenderToggle;
  };

  return (
    <>
      {currentQuestion && (
        <div className="w-full h-full flex justify-center py-3">
          {handlePassageRenderToggle(currentQuestion) && (
            <div className="py-10 w-full h-full border-r-2 border-gray-200 pr-4 overflow-scroll">
              {/* Render Question Using HTML_string */}
              {/* {attempt?.data?.annotated_html && attempt?.data?.annotated_html != null && (
                <div className="editor-html-render">
                  <div id={`html_Parg_${currentQuestion?.id}`}>
                    <div dangerouslySetInnerHTML={{ __html: attempt?.data?.annotated_html }} />
                  </div>
                </div>
              )} */}
              {/* Annotation modal */}
              {/* {attempt?.data?.annotated_html && attempt?.data?.annotated_html != null && (
                <Annotation id={`html_Parg_${currentQuestion?.id}`} attempt={attempt} />
              )} */}
              {/* Converting into HTML_String */}
              {/* {currentQuestion?.passage &&
                attempt &&
                (!attempt?.data.annotated_html || attempt?.data.annotated_html === null) && (
                  <EditorHtml
                    data={currentQuestion?.passage ? currentQuestion?.passage : null}
                    readOnly={true}
                    onChange={(html_string: any) =>
                      recoilCurrentAttemptSet({
                        ...currentAttempt,
                        data: {
                          ...currentAttempt.data,
                          annotated_html: html_string,
                        },
                      })
                    }
                  />
                )} */}
              <Editor
                data={currentQuestion?.passage ? currentQuestion?.passage : null}
                readOnly={true}
              />
            </div>
          )}
          <div
            className={`py-10 w-full h-full overflow-y-auto ${
              handlePassageRenderToggle(currentQuestion)
                ? `border-l-2 border-gray-200 pl-4`
                : `flex justify-center`
            }`}
          >
            <div className={`w-full max-w-[700px]`}>
              <QuestionBar
                value={currentQuestion}
                setValue={handleCurrentQuestion}
                questionIndex={questionIndex}
                recoilCurrentAttemptSet={recoilCurrentAttemptSet}
              />

              <div className="pt-[1px]">
                <AssessmentBorder count={2} />
              </div>

              <div className="flex-grow w-full">
                {/* content */}
                <div className="py-5">
                  <Editor
                    data={currentQuestion?.content ? currentQuestion?.content : null}
                    readOnly={true}
                  />
                </div>

                {/* rendering the question */}
                {currentQuestion?.type === "MCQ" && (
                  <ElementMCQ
                    value={currentQuestion}
                    setValue={handleCurrentQuestion}
                    attempt={attempt}
                    updateAttempt={updateAttempt}
                    recoilCurrentAttemptSet={recoilCurrentAttemptSet}
                  />
                )}

                {currentQuestion?.type === "SPR" && (
                  <ElementSPR
                    value={currentQuestion}
                    setValue={handleCurrentQuestion}
                    attempt={attempt}
                    updateAttempt={updateAttempt}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssessmentElementRootView;
