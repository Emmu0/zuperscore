import React from "react";
// next Imports
import { useRouter } from "next/router";
// recoil
import { useSetRecoilState, useRecoilState } from "recoil";
// components
import Button from "@components/ui/Button";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

interface ICompletedRestriction {
  assessment_id: any;
  session_id: any;
  data: any;
}

const CompletedRestriction: React.FC<ICompletedRestriction> = ({
  assessment_id,
  session_id,
  data,
}) => {

  const router = useRouter();

  const recoilAssessmentDefaultSet = useSetRecoilState(assessmentRecoil.assessmentDefaultSelector);

  const redirect = (type: string) => {
    recoilAssessmentDefaultSet({ type: "reset", data: null });
    if (type === "test") router.push(`/assessment`);
    if (type === "result") router.push(`/user/assessment/${assessment_id}/sessions`);
  };

  return (
    <div className="flex flex-col gap-2 h-full w-full items-center justify-center">
      <div className="text-gray-400 text-xl">Your assessment is already completed.</div>
      <div className="flex items-center gap-2 mt-3">
        <Button size="xs" onClick={() => redirect("test")}>
          Go to Home
        </Button>

        <Button size="xs" onClick={() => redirect("result")}>
          Go to Results
        </Button>
      </div>
    </div>
  );
};

export default CompletedRestriction;
