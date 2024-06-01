import React from "react";
// components
import Editor from "@components/lexical/Editor";

interface IProps {
  block: any;
}

const BlockPreviewContent: React.FC<IProps> = ({ block }) => {
  return (
    <div>
      <div className="p-3 border-b border-gray-300">
        <div className="text-bold text-gray-500 pb-2">Question</div>
        <div>
          <Editor
            id={block?.id}
            data={
              block?.data?.content && block?.data?.content !== null ? block?.data?.content : null
            }
            onChange={(data: any) => {}}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default BlockPreviewContent;
