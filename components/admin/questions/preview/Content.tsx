import React from "react";
// components
import Editor from "@components/lexical/Editor";

interface IProps {
  block: any;
  handleCurrentBlock?: any;
  from?: string;
}

const BlockPreviewContent: React.FC<IProps> = ({ block, handleCurrentBlock, from }) => {
  return (
    <div>
      <div
        className="p-3 border-b border-gray-300"
        onClick={() => {
          if (from === "subjects") handleCurrentBlock("edit", block);
        }}
      >
        <div className="text-bold text-gray-500 pb-2">Question</div>
        <div>
          <Editor
            id={block?.id}
            data={
              block?.data?.content && block?.data?.content !== null ? block?.data?.content : null
            }
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default BlockPreviewContent;
