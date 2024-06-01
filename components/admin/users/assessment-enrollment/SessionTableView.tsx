import React from "react";
// next Imports
import Link from "next/link";
import { useRouter } from "next/router";

// components
import AssessmentEnrollmentEditSession from "@components/admin/users/assessment-enrollment/EditSession";
import AssessmentEnrollmentDeleteSession from "@components/admin/users/assessment-enrollment/DeleteSession";
import Button from "@components/buttons";
// common
import { dateTimePreview } from "@constants/common";
import DisableResumeTest from "./DisableResumeTest";

interface IAssessmentSessionTableView {
  user_id: string;
  userDetail: any;
  assessmentSession: any;
  assessments: any;
  mutationData?: any;
  mutation?: any;
}

const AssessmentSessionTableView: React.FC<IAssessmentSessionTableView> = ({
  user_id,
  userDetail,
  assessmentSession,
  assessments,
  mutationData,
  mutation,
}) => {
  const router = useRouter();
  const validateEditDeletePermissions = (_session: any) => {
    let permission = true;

    if (_session.is_started) permission = false;
    else {
      if (_session?.scheduled_at) {
        let currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes() + 5);
        let endDate = new Date(_session?.scheduled_at);
        if (endDate >= currentDate) permission = true;
        else permission = false;
      }
    }

    return permission;
  };
  return (
    <>
      <table className="w-full border border-collapse whitespace-nowrap">
        <thead className="border bg-gray-100 h-10 text-violet-100">
          <tr className="border text-left">
            <td className="border px-3 py-1 min-w-[70px] uppercase text-sm text-center">#</td>
            <td className="border px-3 py-1 min-w-[70px] uppercase text-sm text-center">Id</td>
            <td className="border px-3 py-1 min-w-[120px] uppercase text-sm">Alloted At</td>
            <td className="border px-3 py-1 min-w-[70px] uppercase text-sm">Scheduled At</td>
            <td className="border px-3 py-1 min-w-[70px] uppercase text-sm">Started At</td>
            <td className="border px-3 py-1 min-w-[70px] uppercase text-sm">Completed At</td>
            <td className="border px-3 py-1 min-w-[70px] uppercase text-sm">Status</td>
            <td className="border px-3 py-1 min-w-[70px] uppercase text-sm text-center">
              Preview Result
            </td>
            <td className="border px-3 py-1 min-w-[70px] uppercase text-sm">Resume</td>
            <td className="border px-3 py-1 min-w-[70px] uppercase text-sm text-center">Edit</td>
            <td className="border px-3 py-1 min-w-[70px] uppercase text-sm text-center">Delete</td>
          </tr>
        </thead>

        <tbody>
          {assessmentSession &&
            assessmentSession.sessions &&
            assessmentSession.sessions.map((_session: any, sessionIndex: any) => {
              return (
                <tr key={_session.id} className="text-sm">
                  <td className="min-w-[70px] border text-center px-3 py-2">{sessionIndex + 1}</td>
                  <td className="min-w-[70px] border text-center px-3 py-2">{`${
                    _session.id || "-"
                  }`}</td>

                  <td className="min-w-[70px] border px-3 py-2">
                    {_session?.created_at ? dateTimePreview(_session?.created_at) : "-"}
                  </td>
                  <td className="min-w-[70px] border px-3 py-2">
                    {_session?.scheduled_at ? dateTimePreview(_session?.scheduled_at) : "-"}
                  </td>
                  <td className="min-w-[70px] border px-3 py-2">
                    {_session?.started_at ? dateTimePreview(_session?.started_at) : "-"}
                  </td>
                  <td className="min-w-[70px] border px-3 py-2">
                    {_session?.submitted_at ? dateTimePreview(_session?.submitted_at) : "-"}
                  </td>
                  <td className="min-w-[70px] border px-3 py-2">
                    <div className="text-xs border border-violet-100 px-1 py-0.5 rounded-sm font-medium inline-block">
                      {_session.state}
                    </div>
                  </td>
                  <td className="min-w-[70px] border px-3 py-2 text-center">
                    {_session.is_started && _session.is_submitted ? (
                      <Link
                        href={`/assessments/${_session?.assessment}/sessions/${_session?.id}?prevUrl=${router.asPath}`}
                      >
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
                  <td className="min-w-[70px] border px-3 py-2 text-center">
                    {_session.state === "STARTED" || _session.state === "IN_PROGRESS" ? (
                      <DisableResumeTest
                        session={_session}
                        mutationData={mutationData}
                        mutation={mutation}
                      >
                        <Button variant="secondary" type="button" size="xs">
                          {_session.is_resume_enabled === true ? `Disable` : `Enable`}
                        </Button>
                      </DisableResumeTest>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="min-w-[70px] border px-3 py-2 text-center">
                    {validateEditDeletePermissions(_session) ? (
                      <AssessmentEnrollmentEditSession
                        session={_session}
                        mutationData={mutationData}
                        mutation={mutation}
                      >
                        <Button variant="secondary" type="button" size="xs">
                          Edit
                        </Button>
                      </AssessmentEnrollmentEditSession>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="min-w-[70px] border px-3 py-2 text-center">
                    {validateEditDeletePermissions(_session) ? (
                      <AssessmentEnrollmentDeleteSession
                        session={_session}
                        mutationData={mutationData}
                        mutation={mutation}
                      >
                        <Button variant="secondary" type="button" size="xs">
                          Delete
                        </Button>
                      </AssessmentEnrollmentDeleteSession>
                    ) : (
                      "-"
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

export default AssessmentSessionTableView;
