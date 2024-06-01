import React from "react";
// components
import KatexRender from "@components/Katex";

interface IProps {
  block: any;
  result: any;
}

const BlockPreviewSPR: React.FC<IProps> = ({ block, result }) => {
  return (
    <>
      <div className="p-3 flex gap-4">
        <div className="space-y-2 w-full">
          <div className="pb-1 text-sm font-medium text-gray-500">User Answer:</div>
          <div>
            {result?.result?.user_answers && result?.result?.user_answers.length > 0 ? (
              <KatexRender equation={result?.result?.user_answers} block={true} />
            ) : (
              <div className="text-sm text-gray-400 text-center">No user answer to preview</div>
            )}
          </div>
        </div>
        <div className="space-y-2 w-full">
          <div className="pb-1 text-sm font-medium text-gray-500">Correct Answer:</div>
          <div>
            {block?.data?.answers && block?.data?.answers.length > 0 ? (
              <KatexRender equation={block?.data?.answers} block={true} />
            ) : (
              <div className="text-sm text-gray-400 text-center">No answer to preview</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlockPreviewSPR;
