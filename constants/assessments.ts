import { AssessmentData, Attempt, Question, Section } from "types/assessments";

const isExact = (userAnswer: string, answer: string): boolean => {
  let isExactAnswer: boolean = false;
  if (userAnswer.includes("-") || userAnswer.includes('/')) {
    if (userAnswer === answer) isExactAnswer = true;
  } else {
    if (parseFloat(userAnswer) == parseFloat(answer)) isExactAnswer = true;
  }
  return isExactAnswer;
};

const isRange = (userAnswer: string, min: string, max: string): boolean => {
  if (parseFloat(userAnswer) >= parseFloat(min) && parseFloat(userAnswer) <= parseFloat(max))
    return true;
  else return false;
};

const validateSPRBlock = (adminAnswer: string[], userAnswer: string): boolean => {
  let correctAnswer = false;

  adminAnswer.every((data: any): boolean => {
    if (data.type == "exact") correctAnswer = isExact(userAnswer, data.value);
    else if (data.type == "range") correctAnswer = isRange(userAnswer, data.min, data.max);
    if (correctAnswer == true) return false;
    return true;
  });

  return correctAnswer;
};

export const stringToJsonFormat = (adminAnswer: string | string[]): string[] => {
  adminAnswer = (adminAnswer as string).split(",").map((_ans: string) => _ans.trim());
  let answerJson: string[] = [];
  adminAnswer.map((_ans: any) => {
    let payload: any = null;
    if (_ans.includes(":::")) {
      _ans = _ans.split(":::").map((_ans: string) => _ans.trim());
      payload = {
        type: "included",
        min: _ans[0].trim(),
        max: _ans[1].trim(),
      };
    } else if (_ans.includes("::")) {
      _ans = _ans.split("::").map((_ans: string) => _ans.trim());
      payload = {
        type: "excluded",
        min: _ans[0].trim(),
        max: _ans[1].trim(),
      };
    } else if (_ans.includes(":")) {
      _ans = _ans.split(":").map((_ans: string) => _ans.trim());
      payload = {
        type: "range",
        min: _ans[0].trim(),
        max: _ans[1].trim(),
      };
    } else {
      payload = {
        type: "exact",
        value: _ans.trim(),
      };
    }
    answerJson.push(payload);
  });

  return answerJson;
};

export const handleSPRBlock = (adminAnswer: string | string[], userAnswer: string) => {
  let correctAnswer = false;
  adminAnswer = stringToJsonFormat(adminAnswer);
  correctAnswer = validateSPRBlock(adminAnswer, userAnswer);
  return correctAnswer;
};

export const handleMCQBlock = (adminAnswer: string[], userAnswer: string[]) => {
  let correctAnswer = false;
  if (adminAnswer.sort().toString().trim() === userAnswer.sort().toString().trim())
    correctAnswer = true;
  return correctAnswer;
};

export const assessmentQuestionValidator = (question: Question, questionAttempt: any) => {
  let currentQuestion = { ...question };
  let currentAttempt = questionAttempt != null ? questionAttempt[0] : null;

  let payload = {
    answers: question?.data?.answers || [],
    user_answers: currentAttempt?.data?.user_answer || [],
    is_visited: currentAttempt?.is_visited ? true : false,
    is_user_answered: false,
    is_correct: false,
    is_bookmark: currentAttempt?.is_bookmark || false,
    need_validation: currentAttempt?.need_validation || false,
    score: 0,
    admin_validation: {
      score: "",
    },
    attempt: currentAttempt,
    time_taken: {
      data: currentAttempt?.time_taken?.no_of_attempts || [],
      total_time: 0,
    },
  };

  if (payload.time_taken.data.length > 0) {
    let attemptTimer = 0;
    // console.log(`------------>`);
    payload.time_taken.data.map((data: any) => {
      const begin = data.start_time;
      const end = data.end_time;
      var d = new Date(begin);
      var c = new Date(end);
      var seconds = (c.getTime() - d.getTime()) / 1000;
      // console.log("seconds", seconds);
      attemptTimer += seconds;
    });
    // console.log(`------------>`);
    payload.time_taken.total_time = attemptTimer;
  }

  if (payload?.user_answers.length > 0) {
    payload["is_user_answered"] = true;
    if (question?.type === "MCQ") {
      payload["is_correct"] = handleMCQBlock(payload.answers, payload.user_answers);
    } else if (question?.type === "SPR") {
      payload["is_correct"] = handleSPRBlock(payload.answers[0], payload.user_answers[0].trim());
    }
  }

  currentQuestion["result"] = payload;
  return currentQuestion;
};

const assessmentSectionValidator = (section: Section, sessionAttempts: Attempt[] | null) => {
  let currentSection = { ...section };
  // let currentSection: any = {};
  currentSection.questions = [];

  let payload = {
    total_no_of_questions: section?.questions?.length,
    correct_answers: 0,
    wrong_answers: 0,
    omitted_answers: 0,
    score: 0,
    over_all_percentage: 0,
    time_taken: {
      total_time: 0,
    },
  };

  section?.questions.map((_question: Question) => {
    let currentQuestionData = assessmentQuestionValidator(
      _question,
      (sessionAttempts != null &&
        sessionAttempts.filter((_attempt: Attempt) => _attempt?.question == _question?.id)) ||
        null
    );
    currentSection.questions.push(currentQuestionData);
    payload.time_taken.total_time += currentQuestionData?.result?.time_taken.total_time;

    if (currentQuestionData?.result?.is_correct) payload.correct_answers += 1;
    else if (
      currentQuestionData?.result?.is_user_answered &&
      !currentQuestionData?.result?.is_correct
    )
      payload.wrong_answers += 1;
  });

  payload.omitted_answers =
    payload.total_no_of_questions - (payload.correct_answers + payload.wrong_answers);

  currentSection.questions.map((_question: Question) => {
    if (
      _question?.result?.is_correct ||
      (_question?.result?.is_user_answered && !_question?.result?.is_correct)
    ) {
      payload.score += _question.result.score;
    }
  });

  payload.over_all_percentage = (100 * payload.correct_answers) / payload.total_no_of_questions;

  currentSection["result"] = payload;
  return currentSection;
};

export const assessmentValidator = (assessment: AssessmentData, assessmentSessions: any) => {
  let currentAssessment: AssessmentData = JSON.parse(JSON.stringify(assessment));
  // let currentAssessment: any = {};
  currentAssessment.assessment_detail.sections = [];

  let payload = {
    total_no_of_questions: 0,
    correct_answers: 0,
    wrong_answers: 0,
    omitted_answers: 0,
    score: 0,
    over_all_percentage: 0,
    time_taken: {
      total_time: 0,
    },
  };

  let sessions = assessmentSessions ? assessmentSessions : null;

  if (sessions) {
    if (
      assessment &&
      assessment?.assessment_detail &&
      assessment?.assessment_detail?.sections.length > 0
    ) {
      assessment?.assessment_detail?.sections.map((_section: Section) => {
        let currentSectionData = assessmentSectionValidator(
          _section,
          (sessions &&
            sessions?.filter((_attempt: Attempt) => _attempt?.section == _section?.id)) ||
            null
        );
        currentAssessment.assessment_detail.sections.push(currentSectionData);
        payload.score += currentSectionData.result.score;
        payload.total_no_of_questions += currentSectionData?.result?.total_no_of_questions;
        payload.correct_answers += currentSectionData?.result?.correct_answers;
        payload.wrong_answers += currentSectionData?.result?.wrong_answers;
        payload.omitted_answers += currentSectionData?.result?.omitted_answers;
        payload.time_taken.total_time += currentSectionData?.result?.time_taken.total_time;
      });

      payload.over_all_percentage = (100 * payload.correct_answers) / payload.total_no_of_questions;
    }
  }

  currentAssessment["result"] = payload;
  delete assessmentSessions[0].attempts;
  currentAssessment["session"] = assessmentSessions;

  return currentAssessment;
};

export const newResultPayload = (results: any) => {
  let payload: any = {};
  if (results) {
    payload = {
      total_questions: results?.result?.total_no_of_questions,
      total_correct: results?.result?.correct_answers,
      total_incorrect: results?.result?.wrong_answers,
      total_unanswered: results?.result?.omitted_answers,
      total_attempted: 0,
      total_unattempted: 0,
      total_correct_qids: [],
      total_incorrect_qids: [],
      total_unanswered_qids: [],
      section_analysis_data: {
        section_analysis: [],
      },
    };

    if (results && results?.assessment_detail && results?.assessment_detail?.sections)
      results?.assessment_detail?.sections?.map((_section: any) => {

        // adding section level results
        let sectionPayload: any = {
          id: _section.id,
          name: _section.name,
          type: _section.type,
          group_by: _section?.data?.group_by,
          result: _section.result,
        };
        payload.section_analysis_data.section_analysis.push(sectionPayload);

        if (_section && _section?.questions)
          _section?.questions.map((_question: any) => {
            if (_question?.result?.is_visited) payload.total_attempted++;
            else payload.total_unattempted++;

            if (_question?.result.is_correct) {
              let currentIndex = payload?.total_correct_qids.findIndex(
                (x: any) => x.section_id == _section.id
              );
              if (currentIndex == -1) {
                let questionPayload: any = {
                  section_id: _section.id,
                  q_id: [],
                };
                questionPayload?.q_id.push(_question.id);
                payload?.total_correct_qids.push(questionPayload);
              } else {
                payload?.total_correct_qids[currentIndex].q_id.push(_question.id);
              }
            } else if (_question?.result?.is_user_answered && !_question?.result?.is_correct) {
              let currentIndex = payload?.total_incorrect_qids.findIndex(
                (x: any) => x.section_id == _section.id
              );

              if (currentIndex == -1) {
                let questionPayload: any = {
                  section_id: _section.id,
                  q_id: [],
                };
                questionPayload.q_id.push(_question.id);
                payload?.total_incorrect_qids.push(questionPayload);
              } else {
                payload?.total_incorrect_qids[currentIndex].q_id.push(_question.id);
              }
            } else {
              let currentIndex = payload?.total_unanswered_qids.findIndex(
                (x: any) => x.section_id == _section.id
              );

              if (currentIndex == -1) {
                let questionPayload: any = {
                  section_id: _section.id,
                  q_id: [],
                };
                questionPayload.q_id.push(_question.id);
                payload?.total_unanswered_qids.push(questionPayload);
              } else {
                payload?.total_unanswered_qids[currentIndex].q_id.push(_question.id);
              }
            }
          });
      });
  }
  return payload;
};
