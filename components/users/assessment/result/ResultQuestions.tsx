import React from "react";
// next imports
import { useRouter } from "next/router";
// components
import Select from "@components/ui/Select";
import Button from "@components/buttons";
import Header from "./questions/Header";
import Content from "./questions/Content";
import Explanation from "./questions/Explanation";
import Analysis from "./questions/analysis/Preview";
import Passage from "./questions/Passage";
import BlockMCQ from "./questions/BlockMCQ";
import BlockSPR from "./questions/BlockSPR";
import BlockUpdateUserAnswer from "./questions/UpdateUserAnswer";

const ResultQuestions = ({
  assessment_id,
  session_id,
  section_id,
  sections,
  questions,
  attempts,
  assessmentAttemptsMutate,
  assessmentQuestionsDetailMutate,
  view = "student",
}: any) => {
  const router = useRouter();

  const filterOptions = [
    { key: "all", title: "All" },
    { key: "correct", title: "Correct" },
    { key: "in-correct", title: "Incorrect" },
    { key: "not-attempted", title: "Not Attempted" },
    { key: "bookmarked", title: "Bookmarked" },
  ];
  const [filter, setFilter] = React.useState("all");
  const validateQuestionStatus = (questions: any) => {
    let returnValues: any = [];

    let currentSectionAttempts = sections.find((_section: any) => _section?.id == section_id);
    currentSectionAttempts = currentSectionAttempts?.results?.attempts;

    if (filter === "correct") {
      returnValues = questions.filter((_question: any) => {
        let currentAttemptQuestion = currentSectionAttempts.find(
          (_qAttempt: any) => _qAttempt?.id == _question?.id
        );
        if (currentAttemptQuestion?.result?.is_correct) return _question;
      });
    } else if (filter === "in-correct") {
      returnValues = questions.filter((_question: any) => {
        let currentAttemptQuestion = currentSectionAttempts.find(
          (_qAttempt: any) => _qAttempt?.id == _question?.id
        );
        if (
          currentAttemptQuestion?.result?.is_user_answered &&
          !currentAttemptQuestion?.result?.is_correct
        )
          return _question;
      });
    } else if (filter === "not-attempted") {
      returnValues = questions.filter((_question: any) => {
        let currentAttemptQuestion = currentSectionAttempts.find(
          (_qAttempt: any) => _qAttempt?.id == _question?.id
        );
        if (!currentAttemptQuestion?.result?.is_user_answered) return _question;
      });
    } else if (filter === "bookmarked") {
      returnValues = questions.filter((_question: any) => {
        let currentAttemptQuestion = currentSectionAttempts.find(
          (_qAttempt: any) => _qAttempt?.id == _question?.id
        );
        if (currentAttemptQuestion?.result?.is_bookmark) return _question;
      });
    } else returnValues = questions;

    return returnValues;
  };

  const currentQuestionAttempt = (question_id: any) => {
    let currentSectionAttempts = sections.find((_section: any) => _section?.id == section_id);
    currentSectionAttempts = currentSectionAttempts?.results?.attempts;
    let currentAttemptQuestion = currentSectionAttempts.find(
      (_qAttempt: any) => _qAttempt?.id == question_id
    );
    return currentAttemptQuestion;
  };

  const currentAttempt = (question_id: any) => {
    let currentAttempt = null;
    if (attempts && attempts.length > 0) {
      currentAttempt = attempts.find((_attempt: any) => _attempt?.question === question_id);
    }
    return currentAttempt;
  };

  const handleAnalysisType = () => {
    let type = `reading_and_writing`;
    if (sections && sections.length > 0) {
      let currentSection = sections.find((_section: any) => _section?.id == section_id);
      type = currentSection?.group_by || type;
    }
    return type;
  };

  const handlePassageRender = (question: any) => {
    let passageRenderToggle = false;

    if (
      question?.passage?.passage?.root?.children &&
      question?.passage?.passage?.root?.children.length > 0 &&
      question?.passage?.passage?.root?.children[0]?.children &&
      question?.passage?.passage?.root?.children[0]?.children.length > 0
    )
      passageRenderToggle = true;
    else if (
      question?.passage?.passage?.root?.children &&
      question?.passage?.passage?.root?.children.length > 0 &&
      question?.passage?.passage_html && question?.passage?.passage_text 
    )
      passageRenderToggle = true;
    return passageRenderToggle;
  };

  return (
    <div className="space-y-2">
      <div className="text-lg font-medium">Question wise report</div>

      <div className="flex items-center gap-2">
        {sections &&
          sections.length > 0 &&
          sections.map((section: any, index: number) => (
            <Button
              size="sm"
              variant={section?.id == section_id ? "primary" : "secondary"}
              key={index}
              onClick={() => {
                if (section?.id != section_id) {
                  router.replace(
                    `${
                      view === "student" ? `/user/assessment/` : `/assessments/`
                    }${assessment_id}/sessions/${session_id}?section_id=${section?.id}`,
                    undefined,
                    { shallow: true }
                  );
                }
              }}
            >
              {section?.name}
            </Button>
          ))}
      </div>

      <div className="flex justify-end">
        <div>
          <div className="text-sm text-dark-100 mb-2">Filter By</div>
          <div className="w-[200px]">
            <Select
              placeHolder="Select section grouping"
              options={filterOptions}
              selectedOptions={filter ? [filter] : null}
              handleOption={(_value: any, data: any) => {
                setFilter(_value[0]);
              }}
              multiple={false}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-lg">
          Total Questions:{" "}
          {questions?.questions ? validateQuestionStatus(questions?.questions).length : "0"}
        </div>
        {questions ? (
          <>
            {questions?.questions.length > 0 ? (
              <>
                {validateQuestionStatus(questions?.questions) &&
                validateQuestionStatus(questions?.questions).length > 0 ? (
                  <>
                    {validateQuestionStatus(questions?.questions)?.map(
                      (block: any, index: number) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-[26px] h-[26px] font-medium flex justify-center items-center border border-violet-100 text-violet-100 rounded-sm px-1 mt-3">
                            {index + 1}
                          </div>
                          <div className="border border-gray-300 w-full">
                            <Header block={block} result={currentQuestionAttempt(block?.id)} />

                            {handlePassageRender(block) && <Passage block={block} />}

                            <Content block={block} />

                            {block?.type === "MCQ" && (
                              <BlockMCQ block={block} result={currentQuestionAttempt(block?.id)} />
                            )}

                            {block?.type === "SPR" && (
                              <BlockSPR block={block} result={currentQuestionAttempt(block?.id)} />
                            )}

                            <Analysis
                              block={block}
                              result={currentQuestionAttempt(block?.id)}
                              attempt={currentAttempt(block?.id)}
                              view={view}
                              analysis_type={handleAnalysisType()}
                              attempts={attempts}
                              assessmentQuestionsDetailMutate={assessmentQuestionsDetailMutate}
                              assessmentAttemptsMutate={assessmentAttemptsMutate}
                            />

                            <Explanation
                              block={block}
                              attempt={currentAttempt(block?.id)}
                              result={currentQuestionAttempt(block?.id)}
                            />

                            {view === "admin" &&
                              process.env.NEXT_PUBLIC_LOCAL_ENVIRONMENT === "local" && (
                                <BlockUpdateUserAnswer
                                  view={view}
                                  block={block}
                                  result={currentQuestionAttempt(block?.id)}
                                  session_id={session_id}
                                />
                              )}
                          </div>
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <div className="text-center text-sm text-muted mt-10 text-gray-500">
                    No questions available under the filter <strong>{filter}</strong>.
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-sm text-muted mt-10">No questions available.</div>
            )}
          </>
        ) : (
          <div className="text-center w-full text-muted text-sm py-5">loading...</div>
        )}
      </div>
    </div>
  );
};

export default ResultQuestions;
