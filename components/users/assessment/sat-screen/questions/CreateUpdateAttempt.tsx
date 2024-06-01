import React from "react";
// next imports
import { useRouter } from "next/router";
// uuid
import { v4 as uuidV4 } from "uuid";
// recoil
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
// components
import ElementRootView from "./ElementRoot";
// api services
import { AssessmentAttempt } from "lib/services/user.assessment.service";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";
// context
import { globalContext } from "@contexts/GlobalContextProvider";

const AssessmentCreateUpdateView = () => {
  const router = useRouter();

  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const questionIndex = useRecoilValue(assessmentRecoil.questionIndexSelector);
  const assessment = useRecoilValue(assessmentRecoil.assessmentSelector);
  const sections = useRecoilValue(assessmentRecoil.sectionsSelector);
  const sectionIndex = useRecoilValue(assessmentRecoil.sectionIndexSelector);
  const session = useRecoilValue(assessmentRecoil.sessionSelector);
  const questions = useRecoilValue(assessmentRecoil.questionsSelector);
  const attempts = useRecoilValue(assessmentRecoil.attemptSelector);
  const profile = useRecoilValue(assessmentRecoil.profileSelector);
  const recoilAttemptSet = useSetRecoilState(assessmentRecoil.attemptSelector);

  const [currentAttempt, recoilCurrentAttemptSet] = useRecoilState(
    assessmentRecoil.currentAttemptSelector
  );
  const [routeRestriction, recoilRouteRestriction] = useRecoilState(
    assessmentRecoil.routeRestrictionSelector
  );
  const [attemptLoader, recoilAttemptLoader] = useRecoilState(assessmentRecoil.attemptLoader);

  const createAttempt = async () => {
    recoilRouteRestriction(true);

    let currentQuestion = questions && questions[questionIndex];

    let isQuestionAttempted = await (session && attempts && !!attempts.length
      ? attempts.find((_attempt: any) => _attempt?.question == currentQuestion?.id)
      : null);

    if (!isQuestionAttempted) {
      recoilAttemptLoader(true);
      if (currentQuestion) {
        let currentEpochTime = Date.now();
        let payload: any = {
          user: profile?.id,
          section: Number(sections[sectionIndex]?.data?.section?.id),
          question: Number(currentQuestion?.id),
          type: currentQuestion?.type,
          is_bookmark: false,
          data: { user_answer: [] },
          extra: {},
          info: {
            is_marked_for_review: false,
            is_answered_and_marked_for_review: false,
          },
          time_taken: {
            no_of_attempts: [
              {
                uuid: uuidV4(),
                start_time: currentEpochTime,
                end_time: currentEpochTime,
                duration: Math.floor((currentEpochTime - currentEpochTime) / 1000),
              },
            ],
          },
          session: session && session?.id,
          assessment: assessment && assessment?.id,
          is_visited: true,
          masked_options: [],
          is_answered: false,
          analysis_data: {},
          annotated_html: null,
          annotated_data: [],
        };
        try {
          let attemptResponse: any = await AssessmentAttempt.create(payload);
          if (attemptResponse) {
            attemptResponse = { ...attemptResponse };
            attemptResponse = {
              ...attemptResponse,
              is_visited: true,
              annotated_html: null,
              annotated_data: [],
            };
            recoilAttemptSet({ type: "create", data: attemptResponse });
            recoilCurrentAttemptSet(attemptResponse);
          }
        } catch (error: any) {
          console.warn("error", error);
          handleAlert(
            "warning",
            "Network Error",
            "Something is wrong with you internet connectivity or your session data. Please contact your Zuperscore Admin immediately to resolve the issue. Continuing the same might lead to data discrepancy  and wrong result calculation."
          );
        }
      }
      recoilAttemptLoader(false);
    } else {
      let currentEpochTime = Date.now();
      let new_time_taken = {
        uuid: uuidV4(),
        start_time: currentEpochTime,
        end_time: currentEpochTime,
        duration: Math.floor((currentEpochTime - currentEpochTime) / 1000),
      };

      let currentUpdatedAttempt = { ...isQuestionAttempted };

      // annotation
      currentUpdatedAttempt = {
        ...currentUpdatedAttempt,
        annotated_html: currentUpdatedAttempt?.annotated_html
          ? currentUpdatedAttempt?.annotated_html
          : null,
        annotated_data: currentUpdatedAttempt?.annotated_data
          ? currentUpdatedAttempt?.annotated_data
          : [],
      };

      if (
        currentUpdatedAttempt?.data?.user_answer &&
        currentUpdatedAttempt?.data?.user_answer.length > 0
      ) {
        let answerClearToggle = true;
        if (currentUpdatedAttempt?.is_answered) answerClearToggle = false;
        if (answerClearToggle)
          currentUpdatedAttempt.data = { ...currentUpdatedAttempt.data, user_answer: [] };
      }

      updateAttempt(
        currentUpdatedAttempt?.data,
        {
          no_of_attempts: [...currentUpdatedAttempt?.time_taken?.no_of_attempts, new_time_taken],
        },
        currentUpdatedAttempt,
        currentUpdatedAttempt?.masked_options
      );
    }
  };

  const updateAttempt = async (
    attempt_data: any = null,
    epoch_time: any = null,
    is_attempt: any,
    masked_options: any = null
  ) => {
    if (is_attempt) {
      let payload: any = {
        id: is_attempt?.id,
        data: { ...is_attempt.data, ...attempt_data },
        time_taken: epoch_time,
        masked_options: masked_options && masked_options.length > 0 ? masked_options : [],
      };

      recoilCurrentAttemptSet({
        ...is_attempt,
        data: payload?.data,
        time_taken: payload?.time_taken,
        masked_options: masked_options && masked_options.length > 0 ? masked_options : [],
      });

      recoilAttemptSet({
        type: "update",
        data: {
          ...is_attempt,
          data: payload?.data,
          time_taken: payload?.time_taken,
          masked_options: masked_options && masked_options.length > 0 ? masked_options : [],
        },
      });

      // try {
      //   const attemptResponse: any = await AssessmentAttempt.update(payload);
      // } catch (error: any) {
      //   console.log(error);
      //   handleAlert(
      //     "warning",
      //     "Network Error",
      //     "Something is wrong with you internet connectivity or your session data. Please contact your Zuperscore Admin immediately to resolve the issue. Continuing the same might lead to data discrepancy  and wrong result calculation."
      //   );
      // }
    }
  };

  React.useEffect(() => {
    if (questionIndex >= 0) createAttempt();
  }, [questionIndex]);

  return (
    <>
      {currentAttempt ? (
        <ElementRootView attempt={currentAttempt} updateAttempt={updateAttempt} disabled={false} />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-400">
          Loading...
        </div>
      )}
    </>
  );
};

export default AssessmentCreateUpdateView;
