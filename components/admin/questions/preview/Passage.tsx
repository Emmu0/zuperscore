import React from "react";
// components
import Editor from "@components/lexical/Editor";

interface IBlockPreviewPassage {
  block: any;
  handleCurrentBlock?: any;
  from?: string;
}

const BlockPreviewPassage: React.FC<IBlockPreviewPassage> = ({
  block,
  handleCurrentBlock,
  from,
}) => {
  return (
    <div>
      <div
        className="p-3 border-b border-gray-300"
        onClick={() => {
          if (from === "subjects") handleCurrentBlock("edit", block);
        }}
      >
        <div className="text-bold text-gray-500 pb-2">Passage</div>
        <div>
          <Editor
            id={block?.id}
            data={
              block?.passage?.passage && block?.passage?.passage !== null
                ? block?.passage?.passage
                : null
            }
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default BlockPreviewPassage;
