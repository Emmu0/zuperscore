import React from "react";
// next imports
import { useRouter } from "next/router";
// recoil
import { useRecoilState, useSetRecoilState } from "recoil";
// components
import TopBarTitle from "./Title";
import TopBarDirections from "./Directions";
import TopBarTimer from "./Timer";
import TopBarDropdown from "./Dropdown";
import MathReference from "./Reference";
import Desmos from "./Desmos";
import TopBarHelp from "./Help";
import TopBarShortcuts from "./Shortcuts";
// api services
import { AssessmentAttempt, AssessmentSession } from "lib/services/user.assessment.service";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";
// context
import { globalContext } from "@contexts/GlobalContextProvider";
import Annotation from "./Annotation";

const TopNavigation = ({ renderQuestionDetails }: any) => {
  const router = useRouter();

  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const [assessment] = useRecoilState(assessmentRecoil.assessmentSelector);
  const [session] = useRecoilState(assessmentRecoil.sessionSelector);
  const [sections, recoilSections] = useRecoilState(assessmentRecoil.sectionsSelector);
  const [sectionIndex, recoilSectionIndex] = useRecoilState(assessmentRecoil.sectionIndexSelector);
  const [questions, recoilQuestions] = useRecoilState(assessmentRecoil.questionsSelector);
  const [currentAttempt, recoilCurrentAttemptSet] = useRecoilState(
    assessmentRecoil.currentAttemptSelector
  );
  const [routeRestriction, recoilRouteRestriction] = useRecoilState(
    assessmentRecoil.routeRestrictionSelector
  );

  const recoilAttemptSet = useSetRecoilState(assessmentRecoil.attemptSelector);
  const recoilAssessmentDefaultSet = useSetRecoilState(assessmentRecoil.assessmentDefaultSelector);
  const [questionIndex, recoilQuestionIndex] = useRecoilState(
    assessmentRecoil.questionIndexSelector
  );
  const [currentAssessmentMenu, setCurrentAssessmentMenu] = React.useState<any>(null);

  const handleCurrentAssessmentMenu = (key: any) => {
    currentAttempt && updateAttempt(JSON.parse(JSON.stringify(currentAttempt)));
    if (key === "exit") {
      router.push("/assessment");
    } else setCurrentAssessmentMenu(key);
  };

  const renderCurrentTimer = () => {
    let timer = 0;
    if (sections && sectionIndex >= 0) {
      timer = sections[sectionIndex]?.data?.section?.time_limit | 0;
      // timer = timer >= 0 ? timer * 60 : 0;
    }
    return timer;
  };

  const updateAttempt = async (_attempt: any) => {
    if (questions) {
      let attempt = { ..._attempt };

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

  const handleTimerEnd = () => {
    if (sectionIndex >= 0) {
      recoilRouteRestriction(false);
      if (sections && sectionIndex < sections.length - 1) {
        currentAttempt && updateAttempt(JSON.parse(JSON.stringify(currentAttempt)));
        // session complete
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
      } else {
        // assessment complete
        currentAttempt && updateAttempt(JSON.parse(JSON.stringify(currentAttempt)));
        recoilAssessmentDefaultSet({
          type: "update",
          data: {
            onlineCurrentView: "TEST-COMPLETED",
          },
        });
      }
    }
  };

  const handleTimerUpdateInSeconds = (value: any) => {
    if (value >= 0 && value % 5 === 0 && session && session?.id) {
      let sectionIndexKey: any = Object.keys(session?.section_info_data);
      let payload = {
        id: session?.id || null,
        section_info_data: {
          ...session?.section_info_data,
          [sectionIndexKey[sectionIndex]]: {
            ...session?.section_info_data[sectionIndexKey[sectionIndex]],
            timers: {
              ...session?.section_info_data[sectionIndexKey[sectionIndex]].timers,
              currentTime: value,
            },
          },
        },
      };
      if (payload) {
        AssessmentSession.update(payload)
          .then((response) => {})
          .catch((error) => {});
      }
    }
  };

  const handlePassageRenderToggleForAnnotation = (passage: any) => {
    let renderPassage = false;
    if (
      passage &&
      passage?.passage?.passage?.root?.children &&
      passage?.passage?.passage?.root?.children.length > 0 &&
      passage?.passage?.passage?.root?.children[0]?.children &&
      passage?.passage?.passage?.root?.children[0]?.children.length > 0
    ) {
      renderPassage = true;
    }

    return renderPassage;
  };

  return (
    <div className="container mx-auto flex h-full w-full gap-4 items-center justify-between">
      <div className="relative select-none w-full">
        <TopBarTitle />
        <TopBarDirections />
      </div>

      <div className="w-full flex justify-center">
        <TopBarTimer
          startTime={renderCurrentTimer()}
          handleSeconds={handleTimerUpdateInSeconds}
          handleTimerEnd={handleTimerEnd}
        />
      </div>

      <div className="w-full flex justify-end">
        {/* Annotation handler in the navigation */}
        {/* {handlePassageRenderToggleForAnnotation(
          sections[sectionIndex]?.data?.questions[questionIndex]
        ) && <Annotation />} */}

        {sections[sectionIndex]?.data?.section?.data?.group_by == "math" && (
          <>
            <div>
              <Desmos />
            </div>
            <div>
              <MathReference />
            </div>
          </>
        )}
        <TopBarDropdown handleCurrentAssessmentMenu={handleCurrentAssessmentMenu} />
      </div>

      {/* Assessment Help */}
      {/* {currentAssessmentMenu && currentAssessmentMenu === "help" && (
        <TopBarHelp
          currentAssessmentMenu={currentAssessmentMenu}
          handleCurrentAssessmentMenu={handleCurrentAssessmentMenu}
        />
      )} */}

      {/* Assessment Shortcuts */}
      {/* {currentAssessmentMenu && currentAssessmentMenu === "shortcuts" && (
        <TopBarShortcuts
          currentAssessmentMenu={currentAssessmentMenu}
          handleCurrentAssessmentMenu={handleCurrentAssessmentMenu}
        />
      )} */}

      {/* Assessment exit confirmation */}
      {/* {currentAssessmentMenu && currentAssessmentMenu === "exit" && (
        <TopBarShortcuts
          currentAssessmentMenu={currentAssessmentMenu}
          handleCurrentAssessmentMenu={handleCurrentAssessmentMenu}
        />
      )} */}
    </div>
  );
};

export default TopNavigation;
