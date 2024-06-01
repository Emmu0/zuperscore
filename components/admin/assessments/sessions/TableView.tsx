import React from "react";
// next Imports
import Link from "next/link";
import { useRouter } from "next/router";

// seo
import { mutate } from "swr";
// components
import Button from "@components/ui/Button";
// common
import { dateTimePreview } from "@constants/common";
import { assessmentWithSectionQuestionsValidator } from "@constants/assessment-validator";
// api services
import { AssessmentSession } from "@lib/services/user.assessment.service";
import DisableResumeTest from "@components/admin/users/assessment-enrollment/DisableResumeTest";

interface IAssessmentSessionView {
  sessions: any;
  cursor: any;
  user_id: any;
  auth_user: any;
  mutate_url: any;
}

const AssessmentSessionView: React.FC<IAssessmentSessionView> = ({
  sessions,
  cursor,
  user_id,
  auth_user,
  mutate_url,
}) => {
  const router = useRouter()
  const startIndex = parseInt(cursor?.split(":"[0])) * parseInt(cursor?.split(":")[1]);

  const [buttonLoader, setButtonLoader] = React.useState<any>(null);

  const generateAssessmentResult = async (session_id: any) => {
    setButtonLoader(session_id);

    let assessment_result = await assessmentWithSectionQuestionsValidator(session_id);
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
    formSubmit(assessment_result, session_id);
  };

  const formSubmit = async (assessment_result: any, session_id: any) => {
    let sessionPayload = {
      id: session_id,
      is_submitted: true,
      submitted_at: new Date(),
      state: "COMPLETED",
      generated_by: {
        user: {
          id: auth_user?.id,
          name: `${auth_user?.first_name} ${auth_user?.last_name}`,
          email: auth_user?.email,
        },
      },
      ...assessment_result,
    };
    AssessmentSession.update(sessionPayload)
      .then(async (response) => {
        await mutate(
          mutate_url,
          async (elements: any) => {
            let elementsData = { ...response };
            elementsData.results = elements?.results?.map((_item: any) =>
              _item?.id === session_id ? response : _item
            );
            return elementsData;
          },
          false
        );
        setButtonLoader(null);
      })
      .catch((error) => {
        setButtonLoader(null);
        console.log("error", error);
      });
  };

  return (
    <>
      <table className="w-full border border-collapse whitespace-nowrap">
        <thead className="border bg-gray-100 h-10 text-violet-100">
          <tr className="border text-left">
            <td className="border px-3 py-1 min-w-[80px] text-sm uppercase text-center">#</td>
            <td className="border px-3 py-1 min-w-[80px] text-sm uppercase text-center">Id</td>
            <td className="border px-3 py-1 min-w-[120px] text-sm uppercase">Alloted At</td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">Scheduled At</td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">Started At</td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">Completed At</td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">Status</td>
            <td className="border px-3 py-1 min-w-[80px] uppercase text-sm">Resume</td>
            <td className="border px-3 py-1 min-w-[120px] text-sm uppercase">Result</td>
            <td className="border px-3 py-1 min-w-[120px] text-sm uppercase">Process Result</td>
          </tr>
        </thead>

        <tbody>
          {sessions &&
            sessions.map((_session: any, sessionIndex: any) => {
              return (
                <tr key={_session.id} className="text-sm">
                  <td className="min-w-[80px] border text-center">{sessionIndex + 1}</td>
                  <td className="min-w-[80px] border text-center">{`${_session.id || "-"}`}</td>
                  <td className="min-w-[120px] border px-3 py-2">
                    {_session?.created_at ? dateTimePreview(_session?.created_at) : "-"}
                  </td>
                  <td className="min-w-[120px] border px-3 py-2">
                    {_session?.scheduled_at ? dateTimePreview(_session?.scheduled_at) : "-"}
                  </td>
                  <td className="min-w-[120px] border px-3 py-2">
                    {_session?.started_at ? dateTimePreview(_session?.started_at) : "-"}
                  </td>
                  <td className="min-w-[120px] border px-3 py-2">
                    {_session?.submitted_at ? dateTimePreview(_session?.submitted_at) : "-"}
                  </td>
                  <td className="min-w-[120px] border px-3 py-2">
                    <div className="text-xs border border-violet-100 px-1 py-0.5 rounded-sm font-medium inline-block">
                      {_session.state}
                    </div>
                  </td>
                  <td className="min-w-[80px] border px-3 py-2">
                    {_session.state === "STARTED" || _session.state === "IN_PROGRESS" ? (
                      <DisableResumeTest
                        session={_session}
                        mutation={mutate}
                        mutate_url={mutate_url}
                      >
                        <Button variant="secondary" type="button" size="xs">
                          {_session.is_resume_enabled === true ? `Disable` : `Enable`}
                        </Button>
                      </DisableResumeTest>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border px-3 py-2">
                    {/* {_session.is_started && _session.is_submitted ? ( */}
                    {_session.is_submitted ? (
                      <Link href={`/assessments/${_session?.assessment}/sessions/${_session?.id}?prevUrl=${router.asPath}`}>
                        <a>
                          <Button variant="secondary" type="button" size="xs">
                            View Results
                          </Button>
                        </a>
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="min-w-[120px] border px-3 py-2">
                    {/* {_session.is_started && !_session.is_submitted ? ( */}
                    {!_session.is_submitted ? (
                      <Button
                        type="button"
                        size="xs"
                        disabled={buttonLoader ? true : false}
                        onClick={() => generateAssessmentResult(_session.id)}
                      >
                        {buttonLoader && buttonLoader == _session.id ? "Processing..." : "Process"}
                      </Button>
                    ) : (
                      <>
                        {_session?.generated_by &&
                          `By ${
                            _session?.generated_by?.user?.name
                              ? _session?.generated_by?.user?.name
                              : _session?.generated_by?.user?.id || _session?.generated_by?.user_id
                          }`}
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AssessmentSessionView;
