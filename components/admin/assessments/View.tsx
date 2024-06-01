import React from "react";
// icons
import { PencilIcon, ArchiveIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon } from "@ui/icons";
// next imports
import Link from "next/link";
// components
import Dropdown from "@components/utilities/Dropdown";
import Button from "@components/ui/Button";
import AssessmentMigration from "./AssessmentMigration";
import AssessmentResultBulkDownload from "./AssessmentResultBulkDownload";

interface IAssessmentCard {
  assessment: any;
  handleCurrentAssessment: any;
  role: any;
}

const AssessmentCard: React.FC<IAssessmentCard> = ({
  assessment,
  handleCurrentAssessment,
  role,
}) => {
  const assessmentOptions = [
    {
      icon: <PencilIcon height="14px" width="14px" fill="#8b8b8b" />,
      label: "Edit",
      on_click: () => handleCurrentAssessment("create-edit", assessment),
    },
    {
      icon: <ArchiveIcon height="14px" width="14px" fill="#8b8b8b" />,
      label: `${assessment.state === "ACTIVE" ? "Archive" : "Unarchive"}`,
      on_click: () => handleCurrentAssessment("archive", assessment),
    },
  ];

  return (
    <div className="h-full w-full p-3 border rounded flex gap-3 items-center bg-white">
      <>
        <Link href={`/assessments/${assessment.id}`}>
          <a className="h-full w-full flex gap-3">
            <div className="w-full">
              <div className="flex gap-2 items-center">
                <div className="line-clamp-1">{assessment?.name}</div>
                {assessment?.kind != "ONLINE" && (
                  <div className="border border-violet-100 text-violet-100 text-xs font-medium px-1 py-0.5 rounded-sm">
                    {assessment?.kind}
                  </div>
                )}
                <div className={`border text-xs font-medium px-1 py-0.5 rounded-sm 
                  ${assessment?.state === 'ACTIVE' ? 'border-green-600 text-green-600' : 'border-yellow-600 text-yellow-600'}`}>
                  {assessment?.state}
                </div>
              </div>
              {assessment?.description && (
                <div className="text-sm text-dark-100 line-clamp-1">{assessment?.description}</div>
              )}
            </div>
          </a>
        </Link>
      </>
      {role === "admin" && (
        <>
          <div>
            <AssessmentResultBulkDownload assessment={assessment} />
          </div>
          <div>
            <AssessmentMigration assessment_id={assessment?.id} />
          </div>
        </>
      )}
      <div>
        <Link href={`/assessments/${assessment?.id}/sessions`}>
          <a>
            <Button variant={"primary"} size="xs" className="whitespace-nowrap">
              All Sessions
            </Button>
          </a>
        </Link>
      </div>
      <div>
        <Dropdown
          options={assessmentOptions}
          button={<DotsVerticalIcon height="14px" width="14px" fill="#8B8B8B" />}
        />
      </div>
    </div>
  );
};

export default AssessmentCard;
