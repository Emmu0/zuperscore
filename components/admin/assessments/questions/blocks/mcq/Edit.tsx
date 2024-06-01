import React from "react";
// components
import { BlockMcqOptions } from "../index";
import Editor from "@components/lexical/Editor";

interface IProps {
  block: any;
  handleBlock: any;
  setBlock: any;
}

const BlockMcqEdit: React.FC<IProps> = ({ block, handleBlock, setBlock }) => {
  return (
    <div>
      <div className="p-2">
        <div className="pb-1 text-sm font-medium text-gray-500">Question</div>
        <Editor
          id={block?.id}
          data={block?.content && block?.content !== null ? block?.content : null}
          onChange={(data: any) => handleBlock("content", data)}
        />
      </div>
      <BlockMcqOptions block={block} handleBlock={handleBlock} setBlock={setBlock} />
    </div>
  );
};

export default BlockMcqEdit;
