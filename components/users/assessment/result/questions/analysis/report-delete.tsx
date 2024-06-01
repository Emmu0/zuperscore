import React from "react";
// components
import Button from "@components/buttons";
// api services
import { AssessmentAttempt, AssessmentSession } from "lib/services/user.assessment.service";

const ReportDelete = ({ attempt, assessmentAttemptsMutate }: any) => {
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const deleteReport = async () => {
    if (attempt?.analysis_data?.type) {
      setButtonLoader(true);
      const payload = {
        id: attempt?.id,
        analysis_data: {},
      };

      await AssessmentAttempt.update(payload)
        .then((response) => {
          setButtonLoader(false);
          if (assessmentAttemptsMutate)
            assessmentAttemptsMutate((data: any) => {
              return data;
            });
        })
        .catch((error) => {
          setButtonLoader(false);
        });

      let sessionPayload = {
        id: attempt.session,
        is_reviewed: false,
      };
      await AssessmentSession.update(sessionPayload)
        .then((response) => {
          setButtonLoader(false);
        })
        .catch((error) => {
          setButtonLoader(false);
        });
    }
  };

  return (
    <Button size="sm" variant="secondary" onClick={deleteReport} disabled={buttonLoader}>
      {buttonLoader ? "Processing..." : "Delete"}
    </Button>
  );
};

export default ReportDelete;
