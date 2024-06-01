import React from "react";
// components
import KatexRender from "@components/Katex";

interface IProps {
  block: any;
  handleCurrentBlock?: any;
  from?: string;
}

const BlockPreviewSPR: React.FC<IProps> = ({ block, handleCurrentBlock, from }) => {
  return (
    <div>
      <div
        className="p-3"
        onClick={() => {
          if (from === "subjects") handleCurrentBlock("edit", block);
        }}
      >
        <div className="space-y-2">
          <div className="pb-1 text-sm font-medium text-gray-500">Answer:</div>
          <input
            type="text"
            className="border border-border-light outline-none px-4 py-2 w-full"
            placeholder={`Enter your Answer`}
            value={block?.data?.answers ? block?.data?.answers : ""}
            onChange={(e: any) => {}}
            disabled={true}
          />
          <div className="pb-1 text-sm font-medium text-gray-500">Preview:</div>
          <div>
            {block?.data?.answers && block?.data?.answers.length > 0 && block?.data?.answers && (
              <KatexRender equation={block?.data?.answers} block={true} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockPreviewSPR;
