import React from "react";
// components
import Button from "@components/ui/Button";
// api services
import {
  AssessmentMigrateSessionsWithAssessmentId,
  // AssessmentPScaleMigrateAttemptsWithSessions,
  AssessmentMigrateAttemptBulkCreate,
  AssessmentMigrateAttemptBulkCreateAsync,
} from "@lib/services/assessment.migration.service";
import { AssessmentSession } from "@lib/services/user.assessment.service";
// common
import { assessmentWithSectionQuestionsValidator } from "@constants/assessment-validator";

const AssessmentMigration = ({ assessment_id, session = null }: any) => {
  const [buttonLoader, setButtonLoader] = React.useState(false);

  const fetchAssessmentSessions = (type: string = "default") => {
    setButtonLoader(true);
    if (session && session.length > 0) {
      if (type === "session") updateSessionsInDjangoServerAsync(session);
      else fetchAttemptsWithSessions(session, type);
    } else
      AssessmentMigrateSessionsWithAssessmentId(assessment_id)
        .then((response) => {
          let sessions = [];
          if (response && response.data.length > 0) {
            sessions = response.data
              .map((_session: any) => {
                if (_session?.pscale_data?.session_id)
                  return {
                    dj_session: _session?.id,
                    session: _session?.pscale_data?.session_id,
                    assessment: _session?.assessment,
                  };
              })
              .filter((_session: any) => (_session?.dj_session ? true : false));
          }
          if (sessions && sessions.length > 0) {
            if (type === "session") updateSessionsInDjangoServerAsync(sessions);
            else fetchAttemptsWithSessions(sessions, type);
          } else setButtonLoader(false);
        })
        .catch((error) => {
          // alert
          setButtonLoader(false);
          console.log("error", error);
        });
  };

  const fetchAttemptsWithSessions = (sessions: any, type: string) => {
    setButtonLoader(true);
    let payload = {
      sessions: sessions,
    };
    // AssessmentPScaleMigrateAttemptsWithSessions(payload)
    //   .then((response) => {
    //     if (
    //       response &&
    //       response?.data &&
    //       response?.data?.attempts &&
    //       response?.data?.attempts.length > 0
    //     ) {
    //       if (type === "default") updateAttemptsInDjangoServer(response?.data?.attempts, sessions);
    //       else updateAttemptsInDjangoServerAsync(response?.data?.attempts);
    //     }
    //     console.log("response", response);
    //   })
    //   .catch((error) => {
    //     // alert
    //     setButtonLoader(false);
    //     console.log("error", error);
    //   });
  };

  const updateAttemptsInDjangoServer = (attempts: any, sessions: any) => {
    setButtonLoader(true);
    let payload = {
      assessment_id: assessment_id,
      attempts: attempts,
    };
    AssessmentMigrateAttemptBulkCreate(payload)
      .then((response) => {
        sessions &&
          sessions.length > 0 &&
          sessions.map((_session: any) => {
            generateDeveloperResult(_session?.dj_session);
          });
      })
      .catch((error) => {
        // alert
        setButtonLoader(false);
        console.log("error", error);
      });
  };

  // generating results
  const generateDeveloperResult = async (sessionId: any) => {
    setButtonLoader(true);

    let assessment_result = await assessmentWithSectionQuestionsValidator(sessionId);
    assessment_result = JSON.parse(JSON.stringify(assessment_result));
    assessment_result = {
      ...assessment_result,
      section_analysis_data: assessment_result?.section_analysis_data.map((_result: any) => {
        delete _result?.attempts;
        delete _result?.question_ids;
        delete _result?.question_details;
        return _result;
      }),
    };
    formSubmit(assessment_result, sessionId);
  };

  const formSubmit = (assessment_result: any, sessionId: any) => {
    setButtonLoader(true);
    let sessionPayload = {
      id: sessionId,
      ...assessment_result,
    };

    AssessmentSession.update(sessionPayload)
      .then((response) => {
        setButtonLoader(false);
      })
      .catch((error) => {
        setButtonLoader(false);
        console.log("error", error);
      });
  };

  const updateAttemptsInDjangoServerAsync = (attempts: any) => {
    setButtonLoader(true);

    let payload = {
      assessment_id: assessment_id,
      attempts: attempts,
    };

    AssessmentMigrateAttemptBulkCreateAsync(payload)
      .then((response) => {
        setButtonLoader(false);
      })
      .catch((error) => {
        // alert
        setButtonLoader(false);
        console.log("error", error);
      });
  };

  const updateSessionsInDjangoServerAsync = (sessions: any) => {
    sessions &&
      sessions.length > 0 &&
      sessions.map((_session: any) => {
        generateDeveloperResult(_session?.dj_session);
      });
  };

  return (
    <div className="flex items-center gap-2">
      {/* <Button
        variant={"primary"}
        size="xs"
        className="whitespace-nowrap"
        onClick={() => fetchAssessmentSessions("default")}
        disabled={buttonLoader}
      >
        {buttonLoader ? "Migrating..." : "Migrate Results"}
      </Button> */}

      {/* <Button
        variant={"secondary"}
        size="xs"
        className="whitespace-nowrap"
        onClick={() => fetchAssessmentSessions("attempts")}
        disabled={buttonLoader}
      >
        {buttonLoader ? "Migrating Attempts..." : "Migrate Attempt Results"}
      </Button> */}

      {/* <Button
        variant={"secondary"}
        size="xs"
        className="whitespace-nowrap"
        onClick={() => fetchAssessmentSessions("session")}
        disabled={buttonLoader}
      >
        {buttonLoader ? "Migrating Session..." : "Migrate Session Results"}
      </Button> */}
    </div>
  );
};

export default AssessmentMigration;
