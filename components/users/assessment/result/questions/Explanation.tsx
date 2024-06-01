import React from "react";
// components
import Editor from "@components/lexical/Editor";
// icons
import { DropdownIcon } from "@ui/icons";

interface IProps {
  block: any;
  attempt?: any;
  result?: any;
}

const BlockPreviewExplanation: React.FC<IProps> = ({ block, attempt, result }) => {
  const [previewEnable, setPreviewEnable] = React.useState(false);

  const handlePassageRender = (question: any) => {
    let passageRenderToggle = false;
    if (
      question?.explanation?.explanation?.root?.children &&
      question?.explanation?.explanation?.root?.children.length > 0 &&
      question?.explanation?.explanation?.root?.children[0]?.children &&
      question?.explanation?.explanation?.root?.children[0]?.children.length > 0
    )
      passageRenderToggle = true;
    return passageRenderToggle;
  };
  return (
    <div className="p-3 border-t border-gray-300">
      <div
        className="text-bold text-gray-500 select-none cursor-pointer flex items-center gap-2 group"
        onClick={() => setPreviewEnable(!previewEnable)}
      >
        <div
          className={`${
            previewEnable ? `rotate-180` : ``
          } border border-gray-200 group-hover:bg-gray-200 rounded-sm h-[26px] min-w-[26px] flex justify-center items-center`}
        >
          <DropdownIcon className="" />
        </div>
        <div>Explanation</div>
      </div>

      {previewEnable && (
        <>
          {attempt?.analysis_data?.type ||
          (!attempt && !attempt?.id) ||
          result.result.is_correct ? (
            <div className="pt-2">
              {handlePassageRender(block) ? (
                <Editor
                  id={`${block?.id}-explanation`}
                  data={
                    block?.explanation?.explanation && block?.explanation?.explanation !== null
                      ? block?.explanation?.explanation
                      : null
                  }
                  onChange={(data: any) => {}}
                  readOnly={true}
                />
              ) : (
                <div className="text-sm text-gray-400 text-center py-3">
                  No explanation available.
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-gray-400 text-center py-3">
              Explanations are available only post the the analysis is done
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlockPreviewExplanation;
