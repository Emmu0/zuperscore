import React from "react";
// components
import Editor from "@components/lexical/Editor";

interface IBlockPreviewPassage {
  block: any;
}

const BlockPreviewPassage: React.FC<IBlockPreviewPassage> = ({ block }) => {
  return (
    <div>
      <div className="p-3 border-b border-gray-300">
        <div className="text-bold text-gray-500 pb-2">Passage</div>
        <div>
          <Editor
            id={block?.id}
            data={
              block?.passage?.passage && block?.passage?.passage !== null
                ? block?.passage?.passage
                : null
            }
            onChange={(data: any) => {}}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default BlockPreviewPassage;
