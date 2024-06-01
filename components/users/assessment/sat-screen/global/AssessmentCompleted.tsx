import React from "react";
// next imports
import Image from "next/image";
import { useRouter } from "next/router";
// recoil
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
// components
import Button from "../helpers/button";
// common
import { assessmentWithSectionQuestionsValidator } from "@constants/assessment-validator";
// api services
import { AssessmentSession } from "@lib/services/user.assessment.service";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

const AssessmentCompleted: React.FC = () => {
  const router = useRouter();

  const [assessment, recoilAssessment] = useRecoilState(assessmentRecoil.assessmentSelector);
  const [session, recoilSession] = useRecoilState(assessmentRecoil.sessionSelector);
  const recoilAssessmentDefaultSet = useSetRecoilState(assessmentRecoil.assessmentDefaultSelector);
  const [routeRestriction, recoilRouteRestriction] = useRecoilState(
    assessmentRecoil.routeRestrictionSelector
  );
  const testCompleted = useRecoilValue(assessmentRecoil.testCompletedSelector);
  const [buttonLoader, setButtonLoader] = React.useState(false);
  // let session_id = 61660;

  const handleAssessmentResults = async () => {
    recoilRouteRestriction(false);
    setButtonLoader(true);

    let assessment_result = await assessmentWithSectionQuestionsValidator(session?.id);
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
    formSubmit(assessment_result);
  };

  const formSubmit = (assessment_result: any) => {
    let sessionPayload = {
      id: session?.id,
      is_submitted: true,
      submitted_at: new Date(),
      state: "COMPLETED",
      ...assessment_result,
    };

    AssessmentSession.update(sessionPayload)
      .then((response) => {
        setButtonLoader(false);
        recoilRouteRestriction(false);
        router.replace(`/user/assessment/${assessment?.id}/sessions/${session?.id}`);
      })
      .catch((error) => {
        setButtonLoader(false);
        console.log("error", error);
      });
  };

  return (
    <div className="md:px-0 container mx-auto w-full py-20 px-5">
      <div className="mx-auto w-[460px] space-y-6 flex flex-col justify-center">
        {/* {testCompleted ==='TAB-INACTIVE-TEST-CLOSE' && <div className="text-3xl font-medium text-center">Malicious activities detected.</div>} */}
        <div className="text-3xl font-medium text-center">Digital practice is over: Stand By!</div>

        <div className="flex flex-col justify-center items-center gap-4 border border-gray-200 px-6 py-10 rounded shadow-lg">
          <Image src="/images/uploadIcon.svg" width={60} height={60} alt="assessment Loader" />
          <div className="">Do not refresh the page or close the window.</div>
          <Button onClick={handleAssessmentResults} disabled={buttonLoader}>
            {buttonLoader ? "Processing..." : "Go to results"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCompleted;

/**
 *
 * 1 - v/a - c- 2, 
 * 2 - v/a - c- 5, 
 * 3 - v/a - c- 10, 
 * 4 - v/a - c- 20, 
 * 5 - v/a - c- 30, 
 * 6 - v/a - w- 30, 
 * 7 - v/a - w- 40, 
 * 8 - v/a - w- 60, 
 * 9 - v/a - w - 70,
 * 10 - v/a - w - 100, 
 * 11 - v/na - w - 1,
 * 12 - v/na - w - 2,
 * 13 - v/na - w - 3,
 * 14 - nv - 0,
 * 15 - nv - 0,
 * 16 - nv - 0,
 * 17 - nv - 0,
 * 18 - nv - 0,
 * 19 - nv - 0,
 * 20 - nv - 0,
 * 
 * 
 * 0_30 - 16 - 5(c)
 * 30_60 - 2 - 0(c)
 * 60_100000 - 2 - 0(c)
 * 
 * 
 * 0_30 - 16 - 11(w)
 * 30_60 - 2 - 2(w)
 * 60_100000 - 2 - 2(w)
 * 
 * 
 */
