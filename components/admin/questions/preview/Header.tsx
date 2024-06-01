import React from "react";

interface IProps {
  block_bridge?: any;
  block: any;
  handleCurrentBlock?: any;
  handleCurrentBlockSequence?: any;
  from?: string;
}

const BlockPreviewHeader: React.FC<IProps> = ({
  block_bridge,
  block,
  handleCurrentBlock,
  handleCurrentBlockSequence,
  from,
}) => {
  return (
    <div>
      <div className="flex items-center text-sm gap-4 p-3 border-b border-gray-300">
        <div className="border border-violet-100 text-violet-100 rounded-sm px-1">
          {block?.type}
        </div>

        {/* <div
          className="ml-auto cursor-pointer rounded-full px-2 py-[5] border border-violet-100 bg-violet-100 text-white select-none"
          onClick={() => handleCurrentBlock("preview", block)}
        >
          Preview
        </div> */}
        <div
          className="ml-auto cursor-pointer rounded-full px-2 py-[5] border border-violet-100 bg-violet-100 text-white select-none"
          onClick={() => handleCurrentBlock("delete", block)}
        >
          Delete
        </div>

        {from === "subjects" && (
          <div
            className="cursor-pointer rounded-full px-2 py-[5] border border-violet-100 bg-violet-100 text-white select-none"
            onClick={() => handleCurrentBlock("edit", block)}
          >
            Edit
          </div>
        )}

        {handleCurrentBlockSequence && block_bridge && (
          <div
            className="cursor-pointer rounded-full px-2 py-[5] border border-violet-100 bg-violet-100 text-white select-none"
            onClick={() => handleCurrentBlockSequence("sequence", block_bridge)}
          >
            Sequence - ({block_bridge?.sequence})
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockPreviewHeader;
