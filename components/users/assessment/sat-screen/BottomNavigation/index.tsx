import React from "react";
// recoil
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
// components
import User from "./Profile";
import QuestionPreview from "./QuestionPreview";
import Navigation from "./Navigation";
// api services
import { AssessmentAttempt } from "lib/services/user.assessment.service";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";
// context
import { globalContext } from "@contexts/GlobalContextProvider";

const BottomBar = ({ renderQuestionDetails }: any) => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const [onlineCurrentView, recoilOnlineCurrentView] = useRecoilState(
    assessmentRecoil.onlineCurrentView
  );
  const [assessment, recoilAssessment] = useRecoilState(assessmentRecoil.assessmentSelector);
  const [sections, recoilSections] = useRecoilState(assessmentRecoil.sectionsSelector);
  const [sectionIndex, recoilSectionIndex] = useRecoilState(assessmentRecoil.sectionIndexSelector);
  const [questions, recoilQuestions] = useRecoilState(assessmentRecoil.questionsSelector);
  const [questionIndex, recoilQuestionIndex] = useRecoilState(
    assessmentRecoil.questionIndexSelector
  );
  const [session, recoilSession] = useRecoilState(assessmentRecoil.sessionSelector);

  const recoilAttemptSet = useSetRecoilState(assessmentRecoil.attemptSelector);
  const recoilAssessmentDefaultSet = useSetRecoilState(assessmentRecoil.assessmentDefaultSelector);

  const [currentAttempt, recoilCurrentAttemptSet] = useRecoilState(
    assessmentRecoil.currentAttemptSelector
  );
  const [routeRestriction, recoilRouteRestriction] = useRecoilState(
    assessmentRecoil.routeRestrictionSelector
  );
  const testCompleted = useRecoilValue(assessmentRecoil.testCompletedSelector);

  const updateAttempt = async (_attempt: any) => {
    if (questions) {
      let attempt = { ..._attempt };
      let currentEpochTime = Date.now();

      let no_of_attempts = attempt?.time_taken?.no_of_attempts;
      if (no_of_attempts?.length > 0) {
        no_of_attempts[no_of_attempts.length - 1].end_time = currentEpochTime;
        no_of_attempts[no_of_attempts.length - 1].duration = Math.floor(
          (currentEpochTime - no_of_attempts[no_of_attempts.length - 1].start_time) / 1000
        );
      }
      attempt.time_taken.no_of_attempts = no_of_attempts;

      if (attempt) {
        attempt = {
          ...attempt,
          is_answered: attempt?.data?.user_answer.length > 0 ? true : false,
        };
        attemptRequest(attempt);
      }
    }
  };

  const attemptRequest = async (attempt: any) => {
    if (attempt) {
      let currentTime = Date.now();
      let currentAttemptUpdate = { ...attempt };
      let existingEpochs = [...currentAttemptUpdate?.time_taken?.no_of_attempts];

      existingEpochs[existingEpochs.length - 1] = {
        ...existingEpochs[existingEpochs.length - 1],
        end_time: currentTime,
        duration: Math.floor(
          (currentTime - existingEpochs[existingEpochs.length - 1]?.start_time) / 1000
        ),
      };

      recoilAttemptSet({
        type: "update",
        data: { ...currentAttemptUpdate },
      });

      try {
        const attemptResponse: any = await AssessmentAttempt.update(currentAttemptUpdate);
      } catch (error: any) {
        console.log(error);
        handleAlert(
          "warning",
          "Network Error",
          "Something is wrong with you internet connectivity or your session data. Please contact your Zuperscore Admin immediately to resolve the issue. Continuing the same might lead to data discrepancy  and wrong result calculation."
        );
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (questions && questions.length > 0 && questionIndex && questionIndex > 0) {
      currentAttempt && updateAttempt(JSON.parse(JSON.stringify(currentAttempt)));
      if (onlineCurrentView && onlineCurrentView === "TEST") {
        recoilAssessmentDefaultSet({
          type: "update",
          data: {
            questionIndex: questionIndex <= 0 ? 0 : questionIndex - 1,
            currentAttempt: null,
            annotationToggle: false,
            annotationSelectedText: null,
          },
        });
      } else if (onlineCurrentView === "SECTION-REVIEW") {
        recoilAssessmentDefaultSet({
          type: "update",
          data: {
            onlineCurrentView: "TEST",
            questionIndex: questions.length - 1,
            currentAttempt: null,
            annotationToggle: false,
            annotationSelectedText: null,
          },
        });
      }
    }
  };

  const handleNextQuestion = () => {
    if (questions && questions.length > 0) {
      currentAttempt && updateAttempt(JSON.parse(JSON.stringify(currentAttempt)));
      if (questionIndex < questions.length - 1) {
        let nextQuestionIndex =
          questionIndex < questions.length - 1 ? questionIndex + 1 : questionIndex;
        recoilAssessmentDefaultSet({
          type: "update",
          data: {
            questionIndex: nextQuestionIndex,
            currentAttempt: null,
            annotationToggle: false,
            annotationSelectedText: null,
          },
        });
      }
    }
  };

  const handleCurrentQuestion = async (currentQuestionIndex: any) => {
    if (
      currentQuestionIndex != questionIndex &&
      (onlineCurrentView === "TEST" || onlineCurrentView === "SECTION-REVIEW")
    ) {
      currentAttempt && updateAttempt(JSON.parse(JSON.stringify(currentAttempt)));

      recoilAssessmentDefaultSet({
        type: "update",
        data: {
          questionIndex: currentQuestionIndex,
          currentAttempt: null,
          annotationToggle: false,
          annotationSelectedText: null,
          ...(onlineCurrentView === "SECTION-REVIEW" && { onlineCurrentView: "TEST" }),
        },
      });
    }
  };

  const handleSectionQuestionPreview: any = () => {
    if (questions && questions.length >= 0) {
      currentAttempt && updateAttempt(JSON.parse(JSON.stringify(currentAttempt)));

      recoilAssessmentDefaultSet({
        type: "update",
        data: {
          onlineCurrentView: "SECTION-REVIEW",
          questionIndex: questions.length - 1,
          currentAttempt: null,
          annotationToggle: false,
          annotationSelectedText: null,
        },
      });
    }
  };

  const handleNextSection = () => {
    // get the next section bases on the section type
    recoilRouteRestriction(false);
    if (sectionIndex >= 0) {
      if (sections && sectionIndex < sections.length - 1) {
        currentAttempt && updateAttempt(JSON.parse(JSON.stringify(currentAttempt)));
        recoilAssessmentDefaultSet({
          type: "update",
          data: {
            onlineCurrentView: "SECTION-CHANGE",
            sectionIndex: sectionIndex + 1,
            questionIndex: 0,
            questions: null,
            currentAttempt: null,
            annotationToggle: false,
            annotationSelectedText: null,
          },
        });
        renderQuestionDetails(session, assessment, "module-shift");
        // router.replace(
        //   `/assessment/${assessment?.id}/${session?.id}?section_id=${
        //     sections?.[sectionIndex + 1].id
        //   }`,
        //   undefined,
        //   { shallow: true }
        // );
      }
    }
  };

  const handleCloseAssessment = () => {
    recoilRouteRestriction(false);
    currentAttempt && updateAttempt(JSON.parse(JSON.stringify(currentAttempt)));
    recoilAssessmentDefaultSet({
      type: "update",
      data: {
        onlineCurrentView: "TEST-COMPLETED",
      },
    });
  };

  // React.useEffect(()=>{
  //   if(testCompleted==='TAB-INACTIVE-TEST-CLOSE')
  //   handleCloseAssessment()
  // },[testCompleted])

  return (
    <div className="container mx-auto flex h-full w-full gap-4 items-center justify-between">
      <div className="relative select-none w-full">
        <User />
      </div>
      <div className="w-full flex justify-center">
        <QuestionPreview
          handleCurrentQuestion={handleCurrentQuestion}
          handleSectionQuestionPreview={handleSectionQuestionPreview}
        />
      </div>
      <div className="w-full flex justify-end">
        <Navigation
          handlePreviousQuestion={handlePreviousQuestion}
          handleSectionQuestionPreview={handleSectionQuestionPreview}
          handleNextQuestion={handleNextQuestion}
          handleNextSection={handleNextSection}
          handleCloseAssessment={handleCloseAssessment}
        />
      </div>
    </div>
  );
};

export default BottomBar;
