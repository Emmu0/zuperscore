import React from "react";
// icons
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon } from "@ui/icons";
// next imports
import Link from "next/link";
// components
import Button from "@components/buttons";
import Dropdown from "@components/utilities/Dropdown";

interface ISectionCard {
  assessment_id: any;
  section: any;
  handleCurrentSection: any;
}

const SectionCard: React.FC<ISectionCard> = ({
  assessment_id,
  section,
  handleCurrentSection,
}: any) => {
  const sectionOptions = [
    {
      icon: <PencilIcon height="14px" width="14px" fill="#8b8b8b" />,
      label: "Edit",
      on_click: () => handleCurrentSection("create-edit", section),
    },
    {
      icon: <TrashIcon height="14px" width="14px" fill="#8b8b8b" />,
      label: "Delete",
      on_click: () => handleCurrentSection("delete", section),
    },
  ];

  return (
    <div className="h-full w-full p-3 border rounded flex gap-3 items-center bg-white">
      <>
        <Link href={`/assessments/${assessment_id}/${section?.id}`}>
          <a className="h-full w-full flex gap-3">
            <div className="w-full">
              <div className="line-clamp-1 font-medium">{section?.name}</div>
              {section?.description && typeof section?.description === "string" && (
                <div className="text-sm text-dark-100 line-clamp-1">{section?.description}</div>
              )}
            </div>
          </a>
        </Link>
      </>
      <div className="whitespace-nowrap">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleCurrentSection("dynamic-section", section)}
        >
          Advance switch
        </Button>
      </div>
      <div className="whitespace-nowrap">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleCurrentSection("bulk-question-create", section)}
        >
          Generate Questions
        </Button>
      </div>
      <div>
        <Dropdown
          options={sectionOptions}
          button={<DotsVerticalIcon height="14px" width="14px" fill="#8B8B8B" />}
        />
      </div>
    </div>
  );
};

export default SectionCard;
