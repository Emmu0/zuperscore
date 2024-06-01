import React from "react";
// next Imports
import Link from "next/link";
import { useRouter } from "next/router";

// components
import Button from "@components/ui/Button";
// common
import { dateTimePreview } from "@constants/common";

interface IAssessmentSessionView {
  sessions: any;
  cursor: any;
}

const AssessmentSessionView: React.FC<IAssessmentSessionView> = ({ sessions, cursor }) => {
  const startIndex = parseInt(cursor?.split(":"[0])) * parseInt(cursor?.split(":")[1]);
  const router = useRouter()
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
            <td className="border px-3 py-1 min-w-[120px] text-sm uppercase">Result</td>
          </tr>
        </thead>

        <tbody>
          {sessions &&
            sessions.results.map((_session: any, sessionIndex: any) => {
              return (
                <tr key={_session.id} className="text-sm">
                  <td className="border text-center">{startIndex + sessionIndex + 1}</td>
                  <td className="border text-center">{`${_session.id || "-"}`}</td>
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
                  <td className="border text-center px-3 p-2">
                    {_session.is_submitted ? (
                      <Link
                        href={`/user/assessment/${_session?.assessment_detail?.id}/sessions/${_session?.id}?prevUrl=${router.asPath}`}
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
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AssessmentSessionView;
