import React from "react";
// recoil
import { useRecoilState } from "recoil";
// components
import Button from "../helpers/button";
import Editor from "@components/lexical/Editor";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

interface ISectionDirections {}

const SectionDirections: React.FC<ISectionDirections> = () => {
  const [sections, setSections] = useRecoilState(assessmentRecoil.sectionsSelector);
  const [sectionIndex, setSectionIndex] = useRecoilState(assessmentRecoil.sectionIndexSelector);

  const [modal, setModal] = React.useState(true);

  return (
    <>
      <div>
        <div className="relative z-10">
          <div className="cursor-pointer text-sm mt-1" onClick={() => setModal(!modal)}>
            Directions
          </div>
          {modal && (
            <div className="absolute max-h-96">
              <div className="w-full block">
                <div className="h-4 w-4 border border-gray-300 bg-white rotate-45 transform origin-bottom-left relative top-1 left-2"></div>
              </div>
              <div className="border border-gray-300 shadow bg-white w-[700px] max-h-[500px] p-4 relative flex flex-col space-y-5">
                <div className="font-medium">
                  {sections?.[sectionIndex]?.data?.section?.name}: Directions
                </div>

                <div className="overflow-y-auto">
                  {sections?.[sectionIndex]?.data?.section?.data?.content &&
                  Object.keys(sections?.[sectionIndex]?.data?.section?.data?.content).length > 0 &&
                  Object.keys(sections?.[sectionIndex]?.data?.section?.data?.content).includes(
                    "root"
                  ) ? (
                    <Editor
                      data={
                        sections?.[sectionIndex]?.data?.section?.data?.content
                          ? sections?.[sectionIndex]?.data?.section?.data?.content
                          : null
                      }
                      readOnly={true}
                    />
                  ) : (
                    "No Directions"
                  )}
                </div>

                <div className="w-full flex items-center justify-end">
                  <Button variant="warning" onClick={() => setModal(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SectionDirections;
