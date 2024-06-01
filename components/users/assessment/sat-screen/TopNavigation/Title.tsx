import React from "react";
// recoil
import { useRecoilState } from "recoil";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

interface ISectionDirections {}

const SectionDirections: React.FC<ISectionDirections> = () => {
  const [assessment, setAssessment] = useRecoilState(assessmentRecoil.assessmentSelector);
  const [sections, setSections] = useRecoilState(assessmentRecoil.sectionsSelector);
  const [sectionIndex, setSectionIndex] = useRecoilState(assessmentRecoil.sectionIndexSelector);

  return (
    <>
      <div className="font-medium text-sm line-clamp-2">
        {assessment?.name} : {sections?.[sectionIndex]?.data?.section?.name}
      </div>
    </>
  );
};

export default SectionDirections;
