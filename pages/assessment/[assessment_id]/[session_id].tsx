import React, { useCallback } from "react";
// next imports
import { NextPage } from "next";
import { useRouter } from "next/router";
// recoil
import { useRecoilState } from "recoil";
// components
import AssessmentLayout from "@components/users/assessment/sat-screen";
import TestInitialLoader from "@components/users/assessment/sat-screen/global/errors-loaders/InitialLoader";
import TestRestriction from "@components/users/assessment/sat-screen/global/errors-loaders/Restriction";
import TestUserAccess from "@components/users/assessment/sat-screen/global/errors-loaders/UserAccess";
import NetworkConnection from "@components/users/assessment/sat-screen/global/NetworkConnection";
import FullScreenMode from "@components/users/assessment/sat-screen/global/FullScreenMode";
import RestrictRedirection from "@components/users/assessment/sat-screen/global/RestrictRedirection";
// api routes
import {
  USER_ASSESSMENT_SESSIONS_WITH_ID,
  USER_ASSESSMENT_ATTEMPTS_WITH_SESSION_ID_ENDPOINT,
} from "@constants/api-routes";
// api services
import { AssessmentSession, UserAssessmentRender } from "@lib/services/user.assessment.service";
import { APIFetcher } from "@lib/services";
// assessment validator
import { sectionValidator } from "@constants/assessments-user";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";
// hoc
import authWrapper from "@lib/hoc/authWrapper";
// context
import { globalContext } from "@contexts/GlobalContextProvider";
// Constants
import { version } from "@constants/common";

const AssessmentPlayer: NextPage = () => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const router = useRouter();
  const { assessment_id, session_id, section_id } = router.query as {
    assessment_id: any;
    session_id: any;
    section_id?: any;
  };

  const handleAlert = useCallback(
    (type: string, title: string, content: string) => {
      globalDispatch({
        type: "ADD_TOAST_ALERT",
        payload: { title: title, content: content, type: type, interval: 4 },
      });
    },
    [globalDispatch]
  );

  const validateSectionTimer = useCallback((_sectionId: any, time: any, session: any) => {
    let timerInSeconds = time * 60;
    if (session?.extra && session?.extra?.countdown) {
      if (
        session?.extra?.countdown[_sectionId] &&
        session?.extra?.countdown[_sectionId]?.timer &&
        session?.extra?.countdown[_sectionId]?.timer > 0
      ) {
        timerInSeconds = session?.extra?.countdown[_sectionId]?.timer;
      }
    }
    return timerInSeconds;
  }, []);

  const [testAccess, setTestAccess] = React.useState<any>({ status: "initial_load", data: null });

  // Maintain assessment session
  const [profile, recoilProfile] = useRecoilState(assessmentRecoil.profileSelector);
  const [assessment, recoilAssessment] = useRecoilState(assessmentRecoil.assessmentSelector);
  const [sections, recoilSections] = useRecoilState(assessmentRecoil.sectionsSelector);
  const [sectionIndex, recoilSectionIndex] = useRecoilState(assessmentRecoil.sectionIndexSelector);
  const [session, recoilSession] = useRecoilState(assessmentRecoil.sessionSelector);
  const [assessmentDefault, recoilAssessmentDefault] = useRecoilState(
    assessmentRecoil.assessmentDefaultSelector
  );

  // getting the user assessment session details
  const [assessmentSessionDetail, setAssessmentSessionDetail] = React.useState<any>(null);
  React.useEffect(() => {
    const fetchAssessmentSessionDetail = async () => {
      console.log("---");
      try {
        console.log("-> ** -> INIT ASSESSMENT DETAIL.");
        const response = await APIFetcher(USER_ASSESSMENT_SESSIONS_WITH_ID(session_id));
        setAssessmentSessionDetail(response);
        console.log("-> ** -> INIT ASSESSMENT DETAIL SUCCESS.");
      } catch (error: any) {
        console.log("error", error);
        console.log("-> ** -> INIT ASSESSMENT DETAIL FAILED.");
      }
    };

    if (assessment_id && session_id && !assessment && !session) fetchAssessmentSessionDetail();
  }, [assessment_id, session_id, assessment, session]);

  // Getting the current user
  React.useEffect(() => {
    const fetchUserProfileDetails = async () => {
      console.log("---");
      try {
        console.log("-> ** -> INIT USER PROFILE DETAIL.");
        let userToken: any = getAuthenticationToken();
        userToken = userToken ? JSON.parse(userToken) : null;
        if (userToken && userToken?.user) recoilProfile(userToken?.user);
        console.log("-> ** -> INIT USER PROFILE DETAIL SUCCESS.");
      } catch (error: any) {
        console.log("error", error);
        console.log("-> ** -> INIT USER PROFILE DETAIL FAILED.");
      }
    };

    if (assessmentSessionDetail) fetchUserProfileDetails();

    return () => {
      recoilAssessmentDefault({ type: "reset", data: null });
    };
  }, [recoilProfile, recoilAssessmentDefault, assessmentSessionDetail]);

  // fetching and updating the assessment sections and questions
  const fetchAssessmentSectionsAndQuestions = useCallback(
    async (
      currentSession: any,
      currentAssessment: any,
      loadType: "initial-assessment" | "retake-assessment" | "module-shift" = "module-shift"
    ) => {
      console.log("---");
      console.log("-> ** -> SESSION INITIATION STARTED.");
      // updating the current state and started date in assessment
      let initSessionToggle = false;

      if (loadType != "module-shift") {
        let currentDate = new Date();
        let dataPayload = { type: "web", time_stamp: currentDate, version: version };
        let initPayload: any = {
          id: currentSession?.id,
          is_resume_enabled: false,
          data: {
            ...currentSession?.data,
            test_taken_from: currentSession?.data?.test_taken_from
              ? [...currentSession?.data?.test_taken_from, dataPayload]
              : [dataPayload],
          },
        };

        if (loadType === "initial-assessment") {
          console.log("-> ** -> INITIATING THE SESSION FOR THE FIRST TIME.");
          initPayload = {
            ...initPayload,
            is_started: true,
            started_at: currentDate,
            state: "IN_PROGRESS",
          };
        } else if (loadType === "retake-assessment")
          console.log("-> ** -> INITIATING THE SESSION FOR RETAKE.");
        else console.log("-> ** -> INITIATING THE SESSION FOR MODULE SHIFT.");

        try {
          let sessionResponse = await AssessmentSession.update(initPayload);
          currentSession = {
            ...currentSession,
            is_started: sessionResponse?.is_started,
            started_at: sessionResponse?.started_at,
            state: sessionResponse?.state,
            is_resume_enabled: sessionResponse?.is_resume_enabled,
            data: sessionResponse?.data,
          };
          initSessionToggle = true;
        } catch (error: any) {
          console.log("error", error);
          initSessionToggle = false;
        }
      } else {
        initSessionToggle = true;
      }

      if (initSessionToggle) {
        console.log("-> ** -> SESSION INIT UPDATE SUCCESS.");

        let recoilUpdatePayload: any = {
          assessment: currentAssessment,
          sections: [],
          sectionIndex: null,
          questions: [],
          questionIndex: null,
          session: currentSession,
          attempts: [],
          routeRestriction: true,
          loaders: {},
          annotationToggle: false,
          annotationSelectedText: null,
        };

        // handle assessment sections
        let sectionIds: any = currentSession && currentSession?.section_info_data;
        sectionIds = sectionIds ? sectionIds : null;
        sectionIds = sectionIds != null ? Object.keys(currentSession?.section_info_data) : null;

        // handle assessments sections data
        let assessmentSections: any = [];
        if (sectionIds != null) {
          sectionIds.map((sectionId: any) => {
            assessmentSections = [
              ...assessmentSections,
              {
                id: parseInt(sectionId),
                data: {
                  section: {
                    ...currentSession?.section_info_data[sectionId],
                    id: parseInt(sectionId),
                    time_limit: validateSectionTimer(
                      sectionId,
                      currentSession?.section_info_data[sectionId]?.timers &&
                        currentSession?.section_info_data[sectionId]?.timers?.currentTime > 0
                        ? currentSession?.section_info_data[sectionId]?.timers?.currentTime / 60
                        : currentSession?.section_info_data[sectionId]?.time_limit > 0
                        ? currentSession?.section_info_data[sectionId]?.time_limit
                        : null,
                      currentSession
                    ),
                  },
                  questions: [],
                },
              },
            ];
          });
        }

        if (assessmentSections && assessmentSections.length > 0) {
          recoilUpdatePayload = { ...recoilUpdatePayload, sections: assessmentSections };

          // fetching all the existing attempts under this session
          let sessionAttemptsToggle = false;
          let sessionAttempts = [];
          console.log("---");
          try {
            console.log("-> ** -> INIT SESSION ATTEMPTS FETCHING.");
            sessionAttempts = await APIFetcher(
              USER_ASSESSMENT_ATTEMPTS_WITH_SESSION_ID_ENDPOINT(currentSession?.id)
            );
            sessionAttemptsToggle = true;
          } catch (error: any) {
            console.log("error", error);
            sessionAttemptsToggle = false;
          }

          if (sessionAttemptsToggle) {
            console.log("-> ** -> SESSION ATTEMPTS ARE AVAILABLE.");
            if (sessionAttempts && sessionAttempts.length > 0) {
              sessionAttempts
                .sort(function (a: any, b: any) {
                  return a?.id - b?.id;
                })
                .reverse();
              recoilUpdatePayload = { ...recoilUpdatePayload, attempts: sessionAttempts };
            }

            let currentSectionIndex: number = 0;
            let currentSectionId: number | null = null;

            let currentSection: any | null = null;
            let previousSection: any | null = null;

            let currentQuestionIndex = 0;
            let currentQuestionId: any = null;

            if (loadType === "initial-assessment") {
              console.log("-> ** -> initial-assessment");
              currentSectionId = recoilUpdatePayload?.sections[0]?.id || null;
              currentSection = recoilUpdatePayload?.sections[0]?.data?.section || null;
            } else if (loadType === "retake-assessment") {
              console.log("-> ** -> retake-assessment");
              currentSectionIndex =
                recoilUpdatePayload?.attempts && recoilUpdatePayload?.attempts.length > 0
                  ? recoilUpdatePayload?.sections.findIndex(
                      (_: any) => _.id == recoilUpdatePayload?.attempts[0]?.section
                    )
                  : 0;
              currentSectionId =
                recoilUpdatePayload?.attempts && recoilUpdatePayload?.attempts.length > 0
                  ? recoilUpdatePayload?.attempts[0]?.section ||
                    recoilUpdatePayload?.sections[0]?.id
                  : recoilUpdatePayload?.sections[0]?.id;

              currentSection =
                recoilUpdatePayload?.attempts && recoilUpdatePayload?.attempts.length > 0
                  ? recoilUpdatePayload?.sections.find((_: any) => _.id == currentSectionId)?.data
                      ?.section
                  : recoilUpdatePayload?.sections[0]?.data?.section;
              if (currentSectionIndex > 0 && currentSection?.type === "ADAPTIVE")
                previousSection =
                  recoilUpdatePayload?.sections[currentSectionIndex - 1]?.data || null;
              currentQuestionId = recoilUpdatePayload?.attempts[0]?.question || null;
            } else if (loadType === "module-shift") {
              console.log("-> ** -> module-shift");
              if (sectionIndex < recoilUpdatePayload?.sections.length) {
                console.log("coming here");
                currentSectionIndex = sectionIndex + 1;
                currentSectionId = recoilUpdatePayload?.sections[currentSectionIndex]?.id;

                currentSection = recoilUpdatePayload?.sections[currentSectionIndex]?.data?.section;
                if (currentSection?.type === "ADAPTIVE")
                  previousSection =
                    recoilUpdatePayload?.sections[currentSectionIndex - 1]?.data || null;
              }
            }

            // fetching current section questions starts
            let currentQuestionsFetchToggle: any = null;
            let currentQuestionsFetchResponse: any = null;
            let currentQuestionsFetchPayload: any = {
              uas_id: currentSession?.id,
              section_id: currentSectionId,
            };

            if (
              currentSectionIndex > 0 &&
              previousSection != null &&
              recoilUpdatePayload?.attempts.length > 0
            ) {
              console.log("---");
              console.log("-> ** -> CURRENT SECTION IS ADAPTIVE AND ATTEMPTS ARE AVAILABLE.");

              let previousSectionQuestionsToggle = false;
              let previousSectionQuestions: any[] = [];

              // validating previous section questions are available or not
              if (previousSection?.questions.length > 0) {
                console.log("-> ** -> PREVIOUS SECTION QUESTIONS ARE AVAILABLE.");
                previousSectionQuestions = [...previousSection?.questions];
                previousSectionQuestionsToggle = true;
              } else {
                console.log("-> ** -> PREVIOUS SECTION QUESTIONS ARE NOT AVAILABLE.");
                let previousSectionQuestionsResponse = null;

                try {
                  previousSectionQuestionsResponse = await UserAssessmentRender.create({
                    uas_id: currentSession?.id,
                    section_id: previousSection?.section?.id,
                  });
                  console.log("-> ** -> PREVIOUS SESSION QUESTIONS FETCHING SUCCESS.");
                  previousSectionQuestionsToggle = true;
                  previousSectionQuestions = [...previousSectionQuestionsResponse?.questions];
                  recoilUpdatePayload.sections[currentSectionIndex - 1] = {
                    ...recoilUpdatePayload.sections[currentSectionIndex - 1],
                    data: {
                      ...recoilUpdatePayload.sections[currentSectionIndex - 1]?.data,
                      questions: [...previousSectionQuestionsResponse?.questions],
                    },
                  };
                  recoilUpdatePayload = {
                    ...recoilUpdatePayload,
                    questions: [...previousSectionQuestionsResponse?.questions],
                  };
                } catch (error) {
                  previousSectionQuestionsToggle = false;
                  console.log("-> ** -> PREVIOUS SESSION QUESTIONS FETCHING FAILED.");
                  setTestAccess((prevData: any) => {
                    return { ...prevData, status: "resume_session_is_disabled" };
                  });
                  handleAlert(
                    "warning",
                    "Network Error",
                    "Something is wrong with you internet connectivity or your session previous section questions fetch data. Please contact your Zuperscore Admin immediately to resolve the issue. Continuing the same might lead to data discrepancy and wrong result calculation."
                  );
                }

                if (previousSectionQuestionsToggle && previousSectionQuestions.length > 0) {
                  console.log("-> ** -> PREVIOUS SESSION QUESTIONS RESULTS CHECK IN SESSION.");
                  if (
                    currentSession?.section_marks_data &&
                    !currentSession?.section_marks_data[previousSection?.section?.id]
                  ) {
                    console.log("-> ** -> PREVIOUS SECTION SCORE IS NOT AVAILABLE IN SESSION.");

                    let currentSectionResult = sectionValidator(
                      previousSection?.section?.id,
                      previousSectionQuestions,
                      recoilUpdatePayload?.attempts
                    );
                    currentSectionResult = currentSectionResult?.correct_answers || 1;

                    let sessionUpdatePayloadResponse: any = null;
                    let sessionUpdatePayload = {
                      id: currentSession?.id,
                      section_marks_data: {
                        ...currentSession.section_marks_data,
                        [previousSection?.section?.id]: currentSectionResult,
                      },
                    };
                    try {
                      console.log("-> ** -> UPDATING THE SESSION WITH PREVIOUS SECTION SCORE.");
                      sessionUpdatePayloadResponse = await AssessmentSession.update(
                        sessionUpdatePayload
                      );
                      currentQuestionsFetchPayload = {
                        ...currentQuestionsFetchPayload,
                        previous_section_id: previousSection?.section?.id,
                      };
                      recoilUpdatePayload = {
                        ...recoilUpdatePayload,
                        session: sessionUpdatePayloadResponse,
                      };
                      console.log(
                        "-> ** -> UPDATING THE SESSION WITH PREVIOUS SECTION SCORE SUCCESS."
                      );
                    } catch (error) {
                      console.log(
                        "-> ** -> UPDATING THE SESSION WITH PREVIOUS SECTION SCORE FAILED."
                      );
                    }
                  } else {
                    console.log("-> ** -> PREVIOUS SECTION SCORE IS ALREADY AVAILABLE IN SESSION.");
                    currentQuestionsFetchPayload = {
                      ...currentQuestionsFetchPayload,
                      previous_section_id: previousSection?.section?.id,
                    };
                  }
                }
              }
            }

            try {
              console.log("---");
              console.log("-> ** -> CURRENT SESSION QUESTIONS FETCHING.");
              currentQuestionsFetchResponse = await UserAssessmentRender.create(
                currentQuestionsFetchPayload
              );
              currentQuestionsFetchToggle = true;
            } catch (error: any) {
              currentQuestionsFetchToggle = false;
            }

            if (currentQuestionsFetchToggle) {
              console.log("-> ** -> CURRENT SESSION QUESTIONS SUCCESS.");
              recoilUpdatePayload.sections[currentSectionIndex] = {
                ...recoilUpdatePayload.sections[currentSectionIndex],
                data: {
                  ...recoilUpdatePayload.sections[currentSectionIndex]?.data,
                  questions: [...currentQuestionsFetchResponse?.questions],
                },
              };
              recoilUpdatePayload = {
                ...recoilUpdatePayload,
                questions: [...currentQuestionsFetchResponse?.questions],
              };

              if (currentQuestionId != null && recoilUpdatePayload.questions.length > 0) {
                currentQuestionIndex = recoilUpdatePayload.questions.findIndex(
                  (_: any) => _.id == currentQuestionId
                );
              }

              recoilUpdatePayload = {
                ...recoilUpdatePayload,
                sectionIndex: currentSectionIndex,
                questionIndex: currentQuestionIndex,
                onlineCurrentView:
                  loadType == "initial-assessment"
                    ? "GENERAL-INSTRUCTIONS"
                    : (loadType == "retake-assessment" || loadType == "module-shift") &&
                      currentSectionIndex > 0 &&
                      recoilUpdatePayload.sections[currentSectionIndex - 1] &&
                      recoilUpdatePayload.sections[currentSectionIndex - 1]?.data?.section?.timers
                        ?.break_time &&
                      recoilUpdatePayload.sections[currentSectionIndex - 1]?.data?.section?.timers
                        ?.break_time > 0
                    ? "SECTION-BREAK"
                    : "TEST",
              };

              recoilAssessmentDefault({
                type: "update",
                data: { ...recoilUpdatePayload },
              });
              setTestAccess((prevData: any) => {
                return { ...prevData, status: "access_test_screen" };
              });
            } else {
              console.log("-> ** -> CURRENT SESSION QUESTIONS FAILED.");
              setTestAccess((prevData: any) => {
                return { ...prevData, status: "resume_session_is_disabled" };
              });
              handleAlert(
                "warning",
                "Network Error",
                "Something is wrong with you internet connectivity or your current session questions fetch data. Please contact your Zuperscore Admin immediately to resolve the issue. Continuing the same might lead to data discrepancy and wrong result calculation."
              );
            }
          } else {
            console.log("-> ** -> SESSION ATTEMPTS ARE NOT AVAILABLE.");
            setTestAccess((prevData: any) => {
              return { ...prevData, status: "resume_session_is_disabled" };
            });
            handleAlert(
              "warning",
              "Network Error",
              "Something is wrong with you internet connectivity or your session attempts fetch data. Please contact your Zuperscore Admin immediately to resolve the issue. Continuing the same might lead to data discrepancy and wrong result calculation."
            );
          }
        } else {
          console.log("-> ** -> NO ASSESSMENT SECTIONS ARE AVAILABLE.");
          setTestAccess((prevData: any) => {
            return { ...prevData, status: "resume_session_is_disabled" };
          });
        }
      } else {
        console.log("-> ** -> SESSION INIT UPDATE FAILED.");
        setTestAccess((prevData: any) => {
          return { ...prevData, status: "resume_session_is_disabled" };
        });
        handleAlert(
          "warning",
          "Network Error",
          "Something is wrong with you internet connectivity or your session update data. Please contact your Zuperscore Admin immediately to resolve the issue. Continuing the same might lead to data discrepancy and wrong result calculation."
        );
      }
    },
    [validateSectionTimer, recoilAssessmentDefault, sectionIndex, handleAlert]
  );

  React.useEffect(() => {
    const validateUserTestAccess = async () => {
      if (session_id && assessment_id && profile?.id && assessmentSessionDetail) {
        let userAssessment = null;
        let userAssessmentSession = null;

        userAssessment = assessmentSessionDetail?.user_assessment_session?.assessment_detail;
        userAssessmentSession = assessmentSessionDetail?.user_assessment_session
          ? assessmentSessionDetail?.user_assessment_session
          : null;

        // checking if session is available or not
        if (userAssessment && userAssessment?.id && userAssessmentSession) {
          console.log("-> ** -> ASSESSMENT && SESSION IS AVAILABLE.");
          // checking if assessment_id and the session assessment_id are matching
          if (assessment_id == userAssessment?.id) {
            console.log("-> ** -> SESSION IS ASSIGNED TO THIS ASSESSMENT.");
            // checking if session is allocated to this profile
            if (profile?.id == userAssessmentSession?.user) {
              console.log("-> ** -> SESSION IS ASSIGNED TO THIS USER.");
              // checking if session is resume enabled or not
              if (
                userAssessmentSession?.is_resume_enabled ||
                (!userAssessmentSession?.is_resume_enabled &&
                  userAssessmentSession?.state === "UNTOUCHED") 
              ) {
                // check if user can access the test
                if (userAssessmentSession?.state === "UNTOUCHED") {
                  console.log("-> ** -> SESSION IS UNTOUCHED.");

                  // check session is scheduled one or not scheduled one
                  let scheduledAt = userAssessmentSession?.scheduled_at
                    ? userAssessmentSession?.scheduled_at
                    : null;
                  let sessionIsValid = false;

                  if (scheduledAt != null) {
                    console.log("-> ** -> SESSION IS SCHEDULED.");

                    let date = new Date();
                    let scheduledTime = new Date(scheduledAt);

                    let minusTime = date;
                    minusTime = new Date(minusTime.getTime() - 5 * 60000);

                    let plusTime = date;
                    plusTime = new Date(plusTime.getTime() + 5 * 60000);

                    if (scheduledTime >= minusTime && scheduledTime <= plusTime)
                      sessionIsValid = true;
                  } else {
                    console.log("-> ** -> SESSION IS NOT SCHEDULED.");
                    sessionIsValid = true;
                  }

                  if (sessionIsValid) {
                    console.log(
                      "-> ** -> TAKING ASSESSMENT FOR THE FIRST TIME AND IT IS UNTOUCHED. -->"
                    );
                    fetchAssessmentSectionsAndQuestions(
                      userAssessmentSession,
                      userAssessment,
                      "initial-assessment"
                    );
                  } else {
                    if (userAssessmentSession?.state === "UNTOUCHED") {
                      console.log("-> ** -> SESSION ACCESSING TIME CROSSED THE SCHEDULED TIME.");
                      setTestAccess((prevData: any) => {
                        return { ...prevData, status: "scheduled_time_crossed" };
                      });
                    } else {
                      console.log("-> ** -> ACCESSING SESSION IS DENIED.");
                      setTestAccess((prevData: any) => {
                        return { ...prevData, status: "permission_denied" };
                      });
                    }
                  }
                } else if (
                  userAssessmentSession?.state === "STARTED" ||
                  userAssessmentSession?.state === "IN_PROGRESS"
                ) {
                  console.log(
                    "-> ** -> SESSION WAS ALREADY STARTED OR IN_PROGRESS AND CONTINUING FROM LAST ATTEMPT."
                  );
                  fetchAssessmentSectionsAndQuestions(
                    userAssessmentSession,
                    userAssessment,
                    "retake-assessment"
                  );
                } else {
                  console.log("-> ** -> SESSION WAS ALREADY TAKEN AND COMPLETED.");
                  setTestAccess((prevData: any) => {
                    return { ...prevData, status: "assessment_already_taken" };
                  });
                }
              } else {
                console.log("-> ** -> RESUMING THE SESSION IS DISABLED.");
                setTestAccess((prevData: any) => {
                  return { ...prevData, status: "resume_session_is_disabled" };
                });
              }
            } else {
              console.log("-> ** -> SESSION IS NOT ALLOCATED TO THIS USER.");
              setTestAccess((prevData: any) => {
                return { ...prevData, status: "session_not_allocated_to_user" };
              });
            }
          } else {
            console.log("-> ** -> SESSION IS NOT ALLOCATED TO ASSESSMENT.");
            setTestAccess((prevData: any) => {
              return { ...prevData, status: "session_not_allocated_to_assessment" };
            });
          }
        } else {
          console.log("-> ** -> ASSESSMENT && SESSION IS NOT VALID OR NOT AVAILABLE.");
          setTestAccess((prevData: any) => {
            return { ...prevData, status: "session_id_not_valid" };
          });
        }
      }
    };

    if (
      profile &&
      assessmentSessionDetail &&
      assessment_id &&
      session_id &&
      !assessment &&
      !session
    ) {
      console.log("---");
      console.log("-> ** -> INITIATING VALIDATION USER ASSESSMENT AND PROFILE.");
      validateUserTestAccess();
    }
  }, [
    profile,
    assessment_id,
    session_id,
    assessment,
    session,
    assessmentSessionDetail,
    fetchAssessmentSectionsAndQuestions,
  ]);

  return (
    <>
      <div className="relative w-full h-screen min-w-[900px] min-h-[400px]">
        <FullScreenMode />
        {testAccess?.status === "initial_load" ? (
          <TestInitialLoader />
        ) : testAccess?.status === "session_id_not_valid" ? (
          <TestUserAccess
            status="You are not authorized to perform this operation. Please contact your administrator."
            assessment_id={assessment_id}
            session_id={session_id}
          />
        ) : testAccess?.status === "session_not_allocated_to_user" ? (
          <TestUserAccess
            status="You are not authorized to perform this operation. Please contact your administrator."
            assessment_id={assessment_id}
            session_id={session_id}
          />
        ) : testAccess?.status === "session_not_allocated_to_assessment" ? (
          <TestUserAccess
            status="You are not authorized to perform this operation. Please contact your administrator."
            assessment_id={assessment_id}
            session_id={session_id}
          />
        ) : testAccess?.status === "scheduled_time_crossed" ? (
          <TestUserAccess
            status="Testing window is closed. Please contact the manager in your whatsapp group."
            assessment_id={assessment_id}
            session_id={session_id}
          />
        ) : testAccess?.status === "resume_session_is_disabled" ? (
          <TestUserAccess
            status="Testing window is closed. Please contact the manager in your whatsapp group."
            assessment_id={assessment_id}
            session_id={session_id}
          />
        ) : testAccess?.status === "permission_denied" ? (
          <TestUserAccess
            status="You are not authorized to perform this operation. Please contact your administrator."
            assessment_id={assessment_id}
            session_id={session_id}
          />
        ) : testAccess?.status === "assessment_already_taken" ? (
          <TestRestriction
            assessment_id={assessment_id}
            session_id={session_id}
            data={testAccess?.data}
          />
        ) : (
          <>
            {profile && assessment && sections && session && (
              <AssessmentLayout renderQuestionDetails={fetchAssessmentSectionsAndQuestions} />
            )}
          </>
        )}
      </div>
      <RestrictRedirection
        assessment_id={assessment_id}
        session_id={session_id}
        section_id={section_id}
      />
      <NetworkConnection />
    </>
  );
};

export default authWrapper(AssessmentPlayer, {
  authRequired: true,
  role: ["manager", "tutor", "user"],
});
