// assessment validator
import { sectionValidator } from "@constants/assessments-user";
// api routes
import {
  USER_ASSESSMENT_SESSIONS_WITH_ID,
  USER_ASSESSMENT_ATTEMPTS_WITH_SESSION_ID_ENDPOINT,
  QUESTION_BY_IDS_ENDPOINT,
} from "@constants/api-routes";
// api services
import { APIFetcher, APIPostFetcherWithData } from "@lib/services";

const assessmentResults = (sessionResult: any) => {
  // answered = total_answered
  // answered = total_answered

  let payload: any = {
    total_questions: 0,

    total_correct: 0,
    total_incorrect: 0,
    total_answered: 0,
    total_unanswered: 0,
    total_visited: 0,
    total_unvisited: 0,

    total_correct_qids: [],
    total_incorrect_qids: [],
    total_answered_qids: [],
    total_unanswered_qids: [],
    total_visited_qids: [],
    total_unvisited_qids: [],
  };

  let sectionCorrectWrongUnAnsweredValidation: any = {};

  sessionResult.map((_section: any) => {
    payload = {
      ...payload,
      total_questions: payload?.total_questions + _section?.results?.total_no_of_questions,
      total_correct: payload?.total_correct + _section?.results?.correct_answers,
      total_incorrect: payload?.total_incorrect + _section?.results?.wrong_answers,
      total_answered: payload?.total_answered + _section?.results?.answered_answers,
      total_unanswered: payload?.total_unanswered + _section?.results?.unanswered_answers,
      total_visited: payload?.total_visited + _section?.results?.visited_answers,
      total_unvisited: payload?.total_unvisited + _section?.results?.unvisited_answers,
    };
    // correct
    sectionCorrectWrongUnAnsweredValidation[_section?.id] = {
      ...sectionCorrectWrongUnAnsweredValidation[_section?.id],
      correct: _section?.results?.attempts
        .filter((_attempt: any) => _attempt?.result?.is_correct)
        .map((_attempt: any) => _attempt?.id),
    };

    // wrong
    sectionCorrectWrongUnAnsweredValidation[_section?.id] = {
      ...sectionCorrectWrongUnAnsweredValidation[_section?.id],
      wrong: _section?.results?.attempts
        .filter(
          (_attempt: any) => _attempt?.result?.is_user_answered && !_attempt?.result?.is_correct
        )
        .map((_attempt: any) => _attempt?.id),
    };

    // answered
    sectionCorrectWrongUnAnsweredValidation[_section?.id] = {
      ...sectionCorrectWrongUnAnsweredValidation[_section?.id],
      answered: _section?.results?.attempts
        .filter(
          (_attempt: any) => _attempt?.result?.is_visited && _attempt?.result?.is_user_answered
        )
        .map((_attempt: any) => _attempt?.id),
    };

    // un_answered
    sectionCorrectWrongUnAnsweredValidation[_section?.id] = {
      ...sectionCorrectWrongUnAnsweredValidation[_section?.id],
      un_answered: _section?.results?.attempts
        .filter(
          (_attempt: any) => _attempt?.result?.is_visited && !_attempt?.result?.is_user_answered
        )
        .map((_attempt: any) => _attempt?.id),
    };

    // visited
    sectionCorrectWrongUnAnsweredValidation[_section?.id] = {
      ...sectionCorrectWrongUnAnsweredValidation[_section?.id],
      visited: _section?.results?.attempts
        .filter((_attempt: any) => _attempt?.result?.is_visited)
        .map((_attempt: any) => _attempt?.id),
    };

    // un_visited
    sectionCorrectWrongUnAnsweredValidation[_section?.id] = {
      ...sectionCorrectWrongUnAnsweredValidation[_section?.id],
      un_visited: _section?.results?.attempts
        .filter((_attempt: any) => !_attempt?.result?.is_visited)
        .map((_attempt: any) => _attempt?.id),
    };
  });

  [
    { key: "total_correct_qids", result_key: "correct" },
    { key: "total_incorrect_qids", result_key: "wrong" },
    { key: "total_answered_qids", result_key: "answered" },
    { key: "total_unanswered_qids", result_key: "un_answered" },
    { key: "total_visited_qids", result_key: "visited" },
    { key: "total_unvisited_qids", result_key: "un_visited" },
  ].map((_key: any) => {
    payload[_key?.key] = Object.keys(sectionCorrectWrongUnAnsweredValidation).map(
      (_sectionId: any) => {
        return {
          section_id: _sectionId,
          qid: sectionCorrectWrongUnAnsweredValidation[_sectionId][_key?.result_key],
        };
      }
    );
  });

  return payload;
};

export const assessmentWithSectionQuestionsValidator = async (session_id: any) => {
  let sessionPayload: any = [];

  let assessmentSession: any = null;
  let assessmentSectionWithQuestions: any = [];
  let assessmentAttempts: any = [];

  // getting the assessment session
  assessmentSession = await APIFetcher(USER_ASSESSMENT_SESSIONS_WITH_ID(session_id));

  // getting the assessment attempts
  assessmentAttempts = await APIFetcher(
    USER_ASSESSMENT_ATTEMPTS_WITH_SESSION_ID_ENDPOINT(session_id)
  );

  let allSections = assessmentSession?.user_assessment_session?.section_info_data;
  let allSectionsKeys = allSections ? Object.keys(allSections) : null;
  let allQuestions: any = [];

  if (allSectionsKeys && allSectionsKeys.length > 0) {
    allSectionsKeys.map((_sectionId: any) => {
      let currentSectionDetail =
        assessmentSession?.user_assessment_session?.section_info_data[_sectionId];
      let currentSectionQuestionIds =
        assessmentSession?.user_assessment_session?.section_question_data[_sectionId];

      allQuestions = [...allQuestions, ...currentSectionQuestionIds];

      sessionPayload = [
        ...sessionPayload,
        {
          id: parseInt(_sectionId),
          name: currentSectionDetail?.name,
          type: currentSectionDetail?.type,
          group_by: currentSectionDetail?.data?.group_by,
          question_ids: currentSectionQuestionIds,
          question_details: [],
          attempts: assessmentAttempts.filter((_attempt: any) =>
            currentSectionQuestionIds.includes(_attempt?.question)
          ),
        },
      ];
    });
  }

  if (allQuestions && allQuestions.length > 0) {
    // fetching all questions in section
    let questionPayload = {
      question_ids: allQuestions,
    };
    assessmentSectionWithQuestions = await APIPostFetcherWithData(
      QUESTION_BY_IDS_ENDPOINT,
      questionPayload
    );
    assessmentSectionWithQuestions = assessmentSectionWithQuestions?.questions;

    sessionPayload = sessionPayload.map((_session: any) => {
      return {
        ..._session,
        question_details: assessmentSectionWithQuestions.filter((_question: any) =>
          _session?.question_ids.includes(_question?.id)
        ),
      };
    });

    sessionPayload = sessionPayload.map((_session: any) => {
      return {
        ..._session,
        results: sectionValidator(_session?.id, _session?.question_details, _session?.attempts),
      };
    });
  }

  let assessmentTotalResult: any = assessmentResults(sessionPayload);
  let sessionResultPayload = { ...assessmentTotalResult, section_analysis_data: sessionPayload };

  return sessionResultPayload;
};
