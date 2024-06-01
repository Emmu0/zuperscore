import React from "react";
// icons
import { InformationCircleIcon, AdjustmentsIcon, CheckIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon } from "@ui/icons";
// components
import Dropdown from "@components/utilities/Dropdown";

interface ISectionDropdown {
  handleCurrentAssessmentMenu?: any;
}

const SectionDropdown: React.FC<ISectionDropdown> = ({ handleCurrentAssessmentMenu }) => {
  const assessmentOptions = [
    // {
    //   icon: <InformationCircleIcon height="14px" width="14px" fill="#8b8b8b" />,
    //   label: "Help",
    //   on_click: () => handleCurrentAssessmentMenu("help"),
    // },
    // {
    //   icon: <AdjustmentsIcon height="14px" width="14px" fill="#8b8b8b" />,
    //   label: "Shortcuts",
    //   on_click: () => handleCurrentAssessmentMenu("shortcuts"),
    // },
    {
      icon: <CheckIcon height="14px" width="14px" fill="#8b8b8b" />,
      label: "Exit",
      on_click: () => handleCurrentAssessmentMenu("exit"),
    },
  ];

  return (
    <>
      <Dropdown
        options={assessmentOptions}
        button={
          <div className="flex flex-col items-center gap-1 cursor-pointer">
            <DotsVerticalIcon height="16px" width="16px" fill="#8B8B8B" />
            <div className="text-sm font-medium text-gray-500">More</div>
          </div>
        }
      />
    </>
  );
};

export default SectionDropdown;
