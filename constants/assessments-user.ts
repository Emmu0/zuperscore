import { assessmentQuestionValidator } from "./assessments";

// single section validation for assessment users
const sectionSectionValidator = (sectionQuestions: any, sessionAttempts: any) => {
  let currentSectionQuestions: any = [];
  let currentSectionQuestionsResult = null;

  let payload: any = {
    total_no_of_questions: sectionQuestions?.length,
    correct_answers: 0,
    wrong_answers: 0,
    answered_answers: 0,
    unanswered_answers: 0,
    visited_answers: 0,
    unvisited_answers: 0,
    over_all_percentage: 0,
    time_taken: {
      total_time: 0,
    },
    attempts: [],
  };

  sectionQuestions.map((_question: any) => {
    let currentQuestionData: any = assessmentQuestionValidator(
      _question,
      sessionAttempts.filter((_attempt: any) => _attempt?.question == _question?.id)
    );

    const questionPayload = {
      id: _question?.id,
      attempt_id: currentQuestionData?.result?.attempt?.id,
      result: {
        answers: currentQuestionData?.result?.answers,
        user_answers: currentQuestionData?.result?.user_answers,
        is_visited: currentQuestionData?.result?.is_visited,
        is_user_answered: currentQuestionData?.result?.is_user_answered,
        is_correct: currentQuestionData?.result?.is_correct,
        is_bookmark: currentQuestionData?.result?.is_bookmark,
        need_validation: currentQuestionData?.result?.need_validation,
        score: currentQuestionData?.result?.score,
        time_taken: currentQuestionData?.result?.time_taken,
      },
    };
    currentSectionQuestions.push(questionPayload);

    payload.time_taken.total_time += currentQuestionData?.result?.time_taken.total_time;

    if (currentQuestionData?.result?.is_user_answered && currentQuestionData?.result?.is_correct)
      payload.correct_answers += 1;
    if (currentQuestionData?.result?.is_user_answered && !currentQuestionData?.result?.is_correct)
      payload.wrong_answers += 1;

    if (currentQuestionData?.result?.is_visited && currentQuestionData?.result?.is_user_answered)
      payload.answered_answers += 1;
    if (currentQuestionData?.result?.is_visited && !currentQuestionData?.result?.is_user_answered)
      payload.unanswered_answers += 1;

    if (currentQuestionData?.result?.is_visited) payload.visited_answers += 1;
    if (!currentQuestionData?.result?.is_visited) payload.unvisited_answers += 1;
  });

  payload.over_all_percentage = (
    (100 * payload.correct_answers) /
    payload.total_no_of_questions
  ).toFixed(2);
  payload.attempts = currentSectionQuestions;

  currentSectionQuestionsResult = payload;
  return currentSectionQuestionsResult;
};

export const sectionValidator = (section_id: any, sectionQuestions: any, attempts: any) => {
  let currentSectionData: any = sectionSectionValidator(
    sectionQuestions,
    attempts.filter((_attempt: any) => _attempt?.section == section_id)
  );

  return currentSectionData;
};
